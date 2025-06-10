// rules/valid-nextjs-links.js
import fs from "fs";
import path from "path";
import { globSync } from "glob";

const meta = {
  type: "problem",
  docs: {
    description:
      "Ensure all Link and anchor tags have valid hrefs and external links open in new tabs",
    recommended: true,
  },
  schema: [],
};

// Function to get all valid routes in a Next.js project
function getNextJsRoutes(context) {
  const appRoot = process.cwd();
  let routes = new Set();

  // Check if using Pages Router
  if (fs.existsSync(path.join(appRoot, "pages"))) {
    const pageFiles = globSync("pages/**/*.{js,jsx,ts,tsx}", {
      cwd: appRoot,
      ignore: [
        "pages/**/_*.{js,jsx,ts,tsx}",
        "pages/**/*.{test,spec}.{js,jsx,ts,tsx}",
        "pages/api/**/*",
      ],
    });

    pageFiles.forEach((file) => {
      // Convert file path to route
      let route = file
        .replace(/^pages/, "")
        .replace(/\.(js|jsx|ts|tsx)$/, "")
        .replace(/\/index$/, "/");

      // Handle dynamic routes
      route = route.replace(/\[([^\]]+)\]/g, ":$1");

      if (route === "") route = "/";
      routes.add(route);
    });
  }

  // Check if using App Router
  if (fs.existsSync(path.join(appRoot, "app"))) {
    const pageFiles = globSync("app/**/page.{js,jsx,ts,tsx}", {
      cwd: appRoot,
      ignore: ["app/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    });

    pageFiles.forEach((file) => {
      // Convert file path to route
      let route = file
        .replace(/^app/, "")
        .replace(/\/page\.(js|jsx|ts|tsx)$/, "");

      // Handle dynamic routes
      route = route.replace(/\[([^\]]+)\]/g, ":$1");

      if (route === "") route = "/";
      routes.add(route);
    });
  }

  return routes;
}

// Function to check if an href is an external link
function isExternalLink(href) {
  return href && (href.startsWith("http://") || href.startsWith("https://"));
}

// Function to validate if an href is valid
function isValidHref(href, routes) {
  // Skip validation for external links, mailto, tel, etc.
  if (
    !href ||
    isExternalLink(href) ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return true;
  }

  // Handle query params and hash
  const hrefPath = href.split("?")[0].split("#")[0];

  // Check if the path exists in our routes
  // For dynamic routes, we need to check the pattern
  return Array.from(routes).some((route) => {
    // Convert route pattern to regex
    const routeRegex = new RegExp(`^${route.replace(/:[^/]+/g, "[^/]+")}$`);
    return routeRegex.test(hrefPath);
  });
}

const create = (context) => {
  // Get all valid routes when the rule is initialized
  const routes = getNextJsRoutes(context);

  return {
    JSXOpeningElement: (node) => {
      // Check for anchor tags
      if (node.name.name === "a" || node.name.name === "Link") {
        const hrefAttr = node.attributes.find(
          (attr) => attr.name?.name === "href"
        );

        if (!hrefAttr) {
          context.report({
            node,
            message: "Anchor tags must have an href attribute",
          });
          return;
        }

        // Get the href value
        let hrefValue;
        if (hrefAttr.value.type === "Literal") {
          hrefValue = hrefAttr.value.value;
        } else if (
          hrefAttr.value.type === "JSXExpressionContainer" &&
          hrefAttr.value.expression.type === "Literal"
        ) {
          hrefValue = hrefAttr.value.expression.value;
        }

        if (hrefValue === "") {
          context.report({
            node,
            message: "Href must have valid value",
          });
          return;
        }
        // Skip validation if href is dynamic (not a string literal)
        if (typeof hrefValue === "string") {
          // Check if href is valid
          if (!isValidHref(hrefValue, routes)) {
            context.report({
              node,
              message: `Invalid href "${hrefValue}". This route does not exist in your Next.js project.`,
            });
          }

          // Check if external link has target="_blank"
          if (isExternalLink(hrefValue)) {
            const targetAttr = node.attributes.find(
              (attr) => attr.name?.name === "target"
            );

            const hasTargetBlank =
              targetAttr &&
              ((targetAttr.value.type === "Literal" &&
                targetAttr.value.value === "_blank") ||
                (targetAttr.value.type === "JSXExpressionContainer" &&
                  targetAttr.value.expression.type === "Literal" &&
                  targetAttr.value.expression.value === "_blank"));

            if (!hasTargetBlank) {
              context.report({
                node,
                message: `External link "${hrefValue}" must have target="_blank" for accessibility.`,
              });
            }

            // Check for rel="noopener noreferrer" for security
            const relAttr = node.attributes.find(
              (attr) => attr.name?.name === "rel"
            );

            const hasRelNoopener =
              relAttr &&
              ((relAttr.value.type === "Literal" &&
                (relAttr.value.value === "noopener noreferrer" ||
                  relAttr.value.value === "noreferrer noopener" ||
                  relAttr.value.value === "noopener" ||
                  relAttr.value.value === "noreferrer")) ||
                (relAttr.value.type === "JSXExpressionContainer" &&
                  relAttr.value.expression.type === "Literal" &&
                  (relAttr.value.expression.value === "noopener noreferrer" ||
                    relAttr.value.expression.value === "noreferrer noopener" ||
                    relAttr.value.expression.value === "noopener" ||
                    relAttr.value.expression.value === "noreferrer")));

            if (!hasRelNoopener) {
              context.report({
                node,
                message: `External link with target="_blank" should also have rel="noopener noreferrer" for security.`,
              });
            }
          }
        }
      }
    },
  };
};

export { create, meta };
