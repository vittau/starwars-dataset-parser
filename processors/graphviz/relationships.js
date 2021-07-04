const snakeCase = require("lodash/fp/snakeCase");

const relationships = (nodes, links, isSymmetric) => {
  const lines = links.map((source, srcIdx) =>
    source
      .map(
        (value, tgtIdx) =>
          `    ${snakeCase(nodes[srcIdx].name)} ${isSymmetric ? "--" : "->"} ${snakeCase(
            nodes[tgtIdx].name
          )} [label=${value}]`
      )
      .filter((line) => !line.includes("[label=0]"))
      .join("\n")
  );

  return `node [style=filled,color=grey];
${lines.filter((line) => line).join("\n")}`;
};

module.exports = { relationships };
