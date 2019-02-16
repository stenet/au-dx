import { autoinject } from "aurelia-framework";

import * as Widgets from "../dx-modules";

@autoinject
export class DxWidgetService {
  constructor() {}

  createInstance<T = DevExpress.DOMComponent>(widget: string, element: Element, options: any): T {
    if (!element) {
      throw new Error("No element specified");
    }
  
    return new Widgets.default[widget](element, options);
  }
  exists(widget: string): boolean {
    return !!Widgets.default[widget];
  }
  getInstance<T = DevExpress.DOMComponent>(widget: string, element: Element): T {
    if (element == null) {
      return null;
    }
  
    return Widgets.default[widget].getInstance(element);
  }
  getDefinition(widget: string): any {
    return Widgets.default[widget];
  }
}