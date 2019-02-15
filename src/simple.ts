import { autoinject } from "aurelia-framework";

@autoinject
export class Simple {
  constructor() {}

  defaultResetButtonOptions: DevExpress.ui.dxButtonOptions = {
    text: "reset value",
  };

  textBoxValue = "value of the textBox"
  textBoxOptions: DevExpress.ui.dxTextBoxOptions = {
    placeholder: "TextBox",
    width: "100%",
    bindingOptions: {
      value: "textBoxValue"
    }
  };
  textBoxResetButtonOptions = this.createResetButtonOptions(() => this.textBoxValue = "reset");

  dateBoxValue = new Date();
  dateBoxOptions: DevExpress.ui.dxDateBoxOptions = {
    placeholder: "DateBox",
    width: "100%",
    bindingOptions: {
      value: "dateBoxValue"
    }
  };
  dateBoxResetButtonOptions = this.createResetButtonOptions(() => this.dateBoxValue = new Date());

  numberBoxValue = 150;
  numberBoxOptions: DevExpress.ui.dxNumberBoxOptions = {
    placeholder: "NumberBox",
    width: "100%",
    bindingOptions: {
      value: "numberBoxValue"
    }
  };
  numberBoxResetButtonOptions = this.createResetButtonOptions(() => this.numberBoxValue = 100);

  private createResetButtonOptions(callback: {(): void}) {
    return Object.assign(<DevExpress.ui.dxButtonOptions>{
      onClick: () => callback()
    }, this.defaultResetButtonOptions);
  }
}