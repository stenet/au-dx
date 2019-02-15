import { autoinject } from "aurelia-framework";

@autoinject
export class Repeat {
  constructor() {}

  textBoxOptions: DevExpress.ui.dxTextBoxOptions = {
    bindingOptions: {
      value: "item.name"
    }
  };
  resetButtonOptions: DevExpress.ui.dxButtonOptions = {
    text: "reset",
    onClick: (e) => {
      e.model.bindingContext.item.name = "reset";
    }
  };

  data = [{
    name: "P1"
  }, {
    name: "P2"
  }, {
    name: "P3"
  }];
}