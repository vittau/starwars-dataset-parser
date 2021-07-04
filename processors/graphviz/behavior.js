const map = require("lodash/fp/map");
const filter = require("lodash/fp/filter");
const flow = require("lodash/fp/flow");
const snakeCase = require("lodash/fp/snakeCase");

const behaviorNodes = (nodes) => {
  const nodesStr = flow(
    filter((node) => node.behavior),
    map((node) => `${snakeCase(node.name)};`)
  )(nodes);

  return `node [style=filled,color=red];
    ${nodesStr.join("")}`;
};

module.exports = { behaviorNodes };
