// rules/no-nested-components.js
const meta = {
  type: "problem",
  docs: {
    description:
      "Prevent React components from being defined inside other components",
    recommended: true,
    category: "Best Practices",
  },
  schema: [],
};

const create = (context) => {
  // Track if we're inside a component function
  let componentDepth = 0;

  return {
    // Enter a function that might be a component
    "FunctionDeclaration, FunctionExpression, ArrowFunctionExpression":
      function (node) {
        // Check if this function returns JSX or might be a component
        const isComponent =
          // Arrow function with JSX body
          (node.type === "ArrowFunctionExpression" &&
            node.body.type === "JSXElement") ||
          // Function name starts with uppercase (component convention)
          (node.id &&
            node.id.name &&
            node.id.name[0] === node.id.name[0].toUpperCase());

        if (isComponent) {
          componentDepth++;
        }
      },

    // Exit a function
    "FunctionDeclaration, FunctionExpression, ArrowFunctionExpression:exit":
      function (node) {
        // Check if this function returns JSX or might be a component
        const isComponent =
          // Arrow function with JSX body
          (node.type === "ArrowFunctionExpression" &&
            node.body.type === "JSXElement") ||
          // Function name starts with uppercase (component convention)
          (node.id &&
            node.id.name &&
            node.id.name[0] === node.id.name[0].toUpperCase());

        if (isComponent) {
          componentDepth--;
        }
      },

    // Check variable declarations that create components
    VariableDeclaration(node) {
      // Only check if we're inside a component
      if (componentDepth > 0) {
        node.declarations.forEach((decl) => {
          // Check for arrow functions that return JSX
          if (
            decl.init &&
            decl.init.type === "ArrowFunctionExpression" &&
            decl.init.body.type === "JSXElement"
          ) {
            context.report({
              node,
              message:
                "Do not define components inside other components. Move this component to the top level.",
            });
          }

          // Check for function expressions that might return JSX
          if (
            decl.init &&
            (decl.init.type === "FunctionExpression" ||
              decl.init.type === "ArrowFunctionExpression")
          ) {
            // Check if the variable name starts with uppercase (component convention)
            if (
              decl.id.name &&
              decl.id.name[0] === decl.id.name[0].toUpperCase()
            ) {
              context.report({
                node,
                message:
                  "Do not define components inside other components. Move this component to the top level.",
              });
            }

            // Also check for functions that return JSX even if lowercase (like your second example)
            if (decl.init.body.type === "BlockStatement") {
              const returnStatements = decl.init.body.body.filter(
                (stmt) => stmt.type === "ReturnStatement"
              );
              const returnsJSX = returnStatements.some(
                (stmt) => stmt.argument && stmt.argument.type === "JSXElement"
              );

              if (returnsJSX) {
                context.report({
                  node,
                  message:
                    "Do not define functions that return JSX inside components. Move this to the top level.",
                });
              }
            }
          }
        });
      }
    },
  };
};

export { create, meta };
