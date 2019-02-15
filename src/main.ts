/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
import {Aurelia} from "aurelia-framework"
import environment from "./environment";
import {PLATFORM} from "aurelia-pal";

import "normalizecss/normalize.css";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName("dx/index"));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}
