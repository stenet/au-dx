import { autoinject, noView, bindable, OverrideContext, processContent, Scope, TemplatingEngine, BindingEngine, Expression, Disposable, View } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator"
import { DxTemplateInfo } from "./dx-template-info";
import { DxWidgetService } from "dx/services/dx-widget-service";

@autoinject
@noView()
@processContent(false)
export class Dx {
  private _scope: Scope;
  private _templateInfo: DxTemplateInfo;
  private _owningView: any; //TODO replace any
  private _widgetElement: Element;
  private _detachedDisposables: Disposable[] = [];
  private _valueChangeByCodeCount = 0;
  private _createdViews: View[] = [];

  constructor(
    private element: Element,
    private templatingEngine: TemplatingEngine,
    private bindingEngine: BindingEngine,
    private dxWidgetService: DxWidgetService,
    private eventAggregator: EventAggregator
  ) {}

  @bindable name: string;
  @bindable options: Options;
  @bindable validator: any;

  instance: any;
  validatorInstance: any;

  created(owningView: any) {
    this._owningView = owningView;
  }
  activate(args) {
    this.validateActivateArguments(args);
  }
  bind(bindingContext: any, overrideContext: OverrideContext) {
    this._scope = {
      bindingContext,
      overrideContext
    };

    this.prepareTemplates();
  }
  attached() {
    this.renderInline();
    this.renderDxWidget();
  }
  detached() {
    this.disposeInstances();

    this._detachedDisposables.forEach(d => d.dispose());
    this._detachedDisposables = [];

    this.detachAndUnbindCreatedViews();
  }
  unbind() {
    this._scope = null;
    this._templateInfo = null;
  }

  setOptions(options: any) {
    let hasValueProperty = false;

    for (let key of Object.getOwnPropertyNames(options)) {
      if ((key === "items" || key === "dataSource") && options[key] == void (0)) {
        options[key] = [];
      }

      if (key != "isValid") {
        const currentValue = this.instance.option(key);
        if (currentValue === options[key]) {
          delete options[key];
          continue;
        }
      }
    }

    if (Object.getOwnPropertyNames(options).length === 0) {
      return;
    }

    try {
      if (hasValueProperty) {
        this._valueChangeByCodeCount++;
      }

      this.instance.option(options);
    } finally {
      if (hasValueProperty) {
        this._valueChangeByCodeCount--;
      }
    }
  }
  resetValidation() {
    if (this.instance.option("isValid") !== false) {
      return;
    }

    this.setOptions({
      isValid: true
    });
  }

  private validateActivateArguments(args) {
    /* when used with au-compose */
    if (!args.name) {
      return;
    }
    if (!args.options) {
      return;
    }

    this.name = args.name;
    this.options = args.options;
    this.validator = args.validator;
  }
  private prepareTemplates() {
    this._templateInfo = new DxTemplateInfo(
      this.templatingEngine,
      this._owningView,
      this._scope,
      this.element
    );

    this._templateInfo.extractTemplates();
  }
  private renderInline() {
    const children = Array.from(this.element.children);

    for (let child of children) {
      const view = this.templatingEngine.enhance({
        element: child,
        resources: this._owningView.resources,
        bindingContext: this._scope.bindingContext,
        overrideContext: this._scope.overrideContext
      });

      this._createdViews.push(view);
    }
  }

  private renderDxWidget() {
    const initializeOptions = this.createInitializeOptions();
    
    this._widgetElement = document.createElement("div");
    this.moveChildrenToWidgetElement();

    this.element.appendChild(this._widgetElement);

    if (!this.dxWidgetService.exists(this.name)) {
      throw new Error(`Widget ${this.name} does not exist in dx-modules.ts`);
    }
    
    this.publishAttachingEvent(initializeOptions);

    this.instance = this.dxWidgetService.createInstance(
      this.name,
      this._widgetElement,
      initializeOptions
    );

    this.addValidatorsToWidget();
    this.registerBindings();
    this.registerOptionChanged();

    this.publishAttachedEvent(initializeOptions);
  }
  private createInitializeOptions() {
    const initializeOptions: InitializeOptions = Object.assign({}, this.options || {});

    initializeOptions.modelByElement = () => this._scope;
    initializeOptions.integrationOptions = {
      templates: this._templateInfo.templateDic
    }

    if (this.options.bindingOptions) {
      for (let property in this.options.bindingOptions) {
        const binding = this.options.bindingOptions[property];
        
        const value = this.bindingEngine
          .parseExpression(binding)
          .evaluate(this._scope);

        initializeOptions[property] = value;
      }
    }

    return initializeOptions;
  }
  private moveChildrenToWidgetElement() {
    while (this.element.children.length > 0) {
      this._widgetElement.appendChild(this.element.children.item(0));
    }
  }
  private addValidatorsToWidget() {
    if (this.validator) {
      this.validatorInstance = this.dxWidgetService.createInstance(
        "dxValidator", 
        this._widgetElement, 
        this.validator);
    } else if (this.options["validators"]) {
      this.validatorInstance = this.dxWidgetService.createInstance(
        "dxValidator", 
        this._widgetElement, {
          validationRules: this.options["validators"]
      });
    }
  }
  private registerBindings() {
    if (!this.options.bindingOptions) {
      return;
    }

    for (let property in this.options.bindingOptions) {
      const binding = this.options.bindingOptions[property];
      
      this.observe(
        binding,
        (newValue: any) => {
          const options = {};
          if (newValue === this.instance.option(property)) {
            return;
          }

          options[property] = newValue;
          options["isValid"] = true;

          this.setOptions(options);
        }
      );
    }
  }
  private observe(expression: string, callback: {(newValue: any, oldValue: any): void}): void {
    const disposable = this.bindingEngine.expressionObserver(
      this.getBindingContext(expression),
      expression
    ).subscribe(callback);

    this._detachedDisposables.push(disposable);
  }
  private getBindingContext(expression: string) {
    let obj: any = this.bindingEngine.parseExpression(expression);
    
    while (obj.object) {
      obj = obj.object;
    }

    if (obj.name in this._scope.bindingContext) {
      return this._scope.bindingContext;
    } else {
      let ov = this._scope.overrideContext;

      while (ov) {
        if (obj.name in ov.bindingContext) {
          return ov.bindingContext;
        }

        ov = ov.parentOverrideContext;
      }
    }

    return this._scope.bindingContext || this._scope.overrideContext;
  }
  private registerOptionChanged() {
    this.instance.on("optionChanged", (e) => {
      this.handleOptionChanged(e);
    });
  }
  private handleOptionChanged(e) {
    if (e.name === "value" && !this.isChangeToPublish(e)) {
      return;
    }

    if (this.options.bindingOptions) {
      const binding = this.options.bindingOptions[e.name];
      if (binding) {
        const expression = this.bindingEngine
          .parseExpression(binding);

        const currValue = expression
          .evaluate(this._scope);

        if (currValue === e.value) {
          return;
        }

        expression.assign(this._scope, e.value, null);
      }
    }

    if (e.name === "value" && this.options.onValueChangedByUser && this._valueChangeByCodeCount === 0) {
      this.options.onValueChangedByUser({
        sender: this,
        model: this._scope,
        value: e.value
      })
    }
  }
  private isChangeToPublish(e): boolean {
    /* Hack because of special handling in dxSelectBox/dxLookup */
    const isSelect = this.name === "dxSelectBox"
      || this.name == "dxLookup";

    if (!isSelect) {
      return true;
    }

    if (e.value != void (0) || e.previousValue != void (0)) {
      return true;
    }

    return false;
  }
  private disposeInstances() {
    const removeElements: Element[] = [];

    if (this.instance) {
      const instanceElement = this.instance.element();
      this.instance.dispose();
      this.instance = null;

      removeElements.push(instanceElement);
    }

    if (this.validatorInstance) {
      this.validatorInstance.dispose();
      this.validatorInstance = null;
    }

    removeElements.forEach(e => this.element.removeChild(e));
  }
  private detachAndUnbindCreatedViews() {
    this._createdViews.forEach(c => {
      c.detached();
      c.unbind();
    });

    this._createdViews = [];
  }

  private publishAttachingEvent(initializeOptions) {
    this.eventAggregator.publish("dx:attaching", {
      widget: this,
      owningView: this._owningView,
      name: this.name,
      options: initializeOptions
    });
  }
  private publishAttachedEvent(initializeOptions) {
    this.eventAggregator.publish("dx-widget:attached", {
      widget: this,
      owningView: this._owningView,
      name: this.name,
      options: initializeOptions,
      element: this._widgetElement,
      instance: this.instance
    });
  }
}

type InitializeOptions = {
  modelByElement?: (element: Element) => Scope;
  integrationOptions?: {
    templates: {
      [key: string]: {
        render: (renderData: any) => Element
      }
    }
  }
}
type Options = {
  onValueChangedByUser?: (args: IOnValueChangedByUserArguments) => void;
  bindingOptions: {
    [key: string]: string
  }
}
interface IOnValueChangedByUserArguments {
  sender: Dx;
  model: Scope;
  value: any;
}
export interface IDx<T> {
  setOptions: (options: any) => void;
  instance: T;
}