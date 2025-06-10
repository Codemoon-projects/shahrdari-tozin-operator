// rules/button-has-onclick.js
const meta = {
  type: "problem",
  docs: {
    description: "Ensure buttons without onClick have disabled=true",
    recommended: true,
  },
  schema: [],
};

const create = (context) => {
  return {
    JSXOpeningElement: (node) => {
      if (node.name.name !== "button") {
        return;
      }

      const hasOnClick = node.attributes.some(
        (attr) => attr.name?.name === "onClick"
      );

      // If the button has onClick, no further checks needed
      if (hasOnClick) {
        return;
      }

      // Button doesn't have onClick, so it must have disabled=true
      const disabledAttr = node.attributes.find(
        (attr) => attr.name?.name === "disabled"
      );

      // Check if disabled attribute exists and is set to true
      const hasDisabledTrue =
        disabledAttr &&
        // Check for disabled={true}
        (disabledAttr.value?.expression?.value === true ||
          // Check for disabled="true"
          disabledAttr.value?.value === "true" ||
          // Check for disabled (shorthand for disabled={true})
          disabledAttr.value === null);

      if (!hasDisabledTrue) {
        context.report({
          node,
          message: "Buttons without onClick must have disabled={true}",
        });
      }
    },
  };
};

export { create, meta };
