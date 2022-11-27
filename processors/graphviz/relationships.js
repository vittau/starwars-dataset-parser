const snakeCase = require("lodash/fp/snakeCase");

const relationships = (nodes, links, isSymmetric) => {
  const lines = links.map((source, srcIdx) =>
    source
      .map(
        (value, tgtIdx) =>
          `  ${snakeCase(nodes[srcIdx].name)} ${isSymmetric ? "--" : "->"} ${snakeCase(
            nodes[tgtIdx].name
          )} [weight=${value}]`
      )
      .filter((line) => !line.includes("[weight=0]"))
      .join("\n")
  );

  return lines.filter((line) => line).join("\n");
};

module.exports = { relationships };
