const map = require("lodash/fp/map");
const filter = require("lodash/fp/filter");
const flow = require("lodash/fp/flow");
const snakeCase = require("lodash/fp/snakeCase");

const behaviorNodes = (nodes) =>
  nodes
    .map((node) => `  ${snakeCase(node.name)} [label="${node.name}",${node.behavior ? "color=red" : "color=grey"}]`)
    .join("\n");

module.exports = { behaviorNodes };
