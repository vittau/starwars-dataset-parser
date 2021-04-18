const _ = require("lodash");

const setNumAgents = (nodes) => `num_agents := ${nodes.length};`;

const setThreshold = (threshold) => `threshold := ${threshold}`;

const setRelationships = (numAgents, links) => {
  // Initialize the matrix
  const output = _.chunk(
    _.range(numAgents * numAgents).map((i) => 0),
    numAgents
  );

  // Fill the matrix with the weights
  links.forEach(({ source, target, value }) => {
    output[source][target] = value;
    output[target][source] = value;
  });

  // Build the string
  let result = "relationships := [\n    ";
  result += output.map((row) => `[${row.toString()}]`).join(",\n    ") + "]";

  return result;
};

module.exports = { setNumAgents, setThreshold, setRelationships };
