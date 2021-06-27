const _ = require("lodash");

const setThreshold = (threshold_num, threshold_den) =>
  `threshold_num := ${threshold_num};\n  threshold_den := ${threshold_den};`;

const setRelationships = (linksMatrix) => {
  // Build the string
  let result = "relationships := [\n    ";
  result += linksMatrix.map((row) => `[${row.toString()}]`).join(",\n    ") + "];";

  return result;
};

module.exports = { setThreshold, setRelationships };
