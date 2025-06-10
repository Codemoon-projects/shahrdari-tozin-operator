import * as buttonRules from "./buttons.js";
import * as linkRules from "./links.js";
import * as componentRules from "./components.js";

// اصلاح شده: Export به صورت Named Exports
const NoraJsxStandard = {
  rules: {
    "button-rules": buttonRules,
    "link-rules": linkRules,
    "component-rules": componentRules,
  },
};

export default NoraJsxStandard;
