import { autoinject, TaskQueue } from "aurelia-framework";
import { IDx } from "dx/elements/dx/dx";

@autoinject
export class Validator {
  constructor(
    private taskQueue: TaskQueue
  ) {}

  textBox: IDx<DevExpress.ui.dxTextBox>;
  textBoxOptions: DevExpress.ui.dxTextBoxOptions = {
    width: "100%",
    onInitialized: (e) => {}
  };
  validatorOptions: DevExpress.ui.dxValidatorOptions = {
    validationRules: [{
      type: "stringLength",
      min: 4,
      max: 10,
      message: "Text must have min 4, max 10 symbols"
    }]
  };

  attached() {
    //Needs taskQueue because child elements will be attached after
    //and dx-widget-instance will be created in attached of element
    this.taskQueue.queueMicroTask(() => {
      this.textBox.validate();
    })
  }
}