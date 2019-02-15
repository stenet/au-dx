import { autoinject } from "aurelia-framework";
import { IDx } from "dx/elements/dx/dx";

@autoinject
export class Popup {
  constructor() {}

  isPopupVisible: boolean = false;

  openPopupButtonOptions: DevExpress.ui.dxButtonOptions = {
    text: "open popup",
    onClick: () => {
      this.popup.instance.show();
    }
  };
  closePopupButtonOptions: DevExpress.ui.dxButtonOptions = {
    text: "close popup",
    onClick: () => {
      this.popup.instance.hide();
    }
  }
  toggleVisibilityCheckBoxOptions: DevExpress.ui.dxCheckBoxOptions = {
    text: "toggle visibility",
    bindingOptions: {
      value: "isPopupVisible"
    }
  };

  popup: IDx<DevExpress.ui.dxPopup>;
  popupOptions: DevExpress.ui.dxPopupOptions = {
    title: "Popup",
    contentTemplate: "contentTemplate",
    bindingOptions: {
      visible: "isPopupVisible"
    }
  }
}