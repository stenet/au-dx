import { Scope, createOverrideContext } from "aurelia-binding";
import { TemplatingEngine } from "aurelia-framework";

export class DxTemplateInfo {
  constructor(
    private templatingEngine: TemplatingEngine,
    private owningView: any,
    private scope: Scope,
    private element: Element
  ) {}

  templateDic: ITemplateDic = {};

  extractTemplates(): void {
    const children = Array.from(this.element.children)
      .filter(child => child.tagName == "DX-TEMPLATE");

    for (let child of children) {
      this.addTemplate(child);

      this.element.removeChild(child);
    }
  }

  private addTemplate(element: Element): void {    
    const name = element.getAttribute("name");
    if (!name) {
      return;
    }

    const render = this.createRender(element);
    this.templateDic[name] = {
      render
    };
  }
  private createRender(element: Element): Render {
    return (renderData) => {
      return this.render(
        element,
        renderData.container,
        renderData.model,
        name
      );
    }
  }
  private render(element: Element, container: Element, model?: any, templateKey?: string): Element {
    let newElement = <Element>element.cloneNode(true);

    container.appendChild(newElement);

    let itemBindingContext: any;
    let itemOverrideContext: any;

    if (model) {
      itemBindingContext = {
        data: model
      };

      itemOverrideContext = createOverrideContext(
        this.scope.bindingContext,
        this.scope.overrideContext);
    } else {
      itemBindingContext = this.scope.bindingContext;
      itemOverrideContext = this.scope.overrideContext;
    }

    const view = this.templatingEngine.enhance({
      element: newElement,
      bindingContext: itemBindingContext,
      overrideContext: itemOverrideContext,
      resources: this.owningView.resources
    });

    const dxEventOn: any = DevExpress.events.on;
    dxEventOn(<any>newElement, "dxremove", () => {
      view.unbind();
      view.detached();
    });

    return newElement;
  }
}

type Render = (renderData: any) => Element;
interface ITemplateDic {
  [key: string]: {
    render: Render
  }
};