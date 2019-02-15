import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.compact.css";

export function configure(config: FrameworkConfiguration) {
  config
    .globalResources(PLATFORM.moduleName("./elements/dx/dx"));
}