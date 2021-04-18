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

const defineBehaviors = (nodes) => `agents: array 0..${nodes.length - 1} of {empty, behavior};`;

const defineSum = (nodes) => `agents_behavior: array 0..${nodes.length - 1} of real;`;

const initAgents = (nodes) =>
  nodes.map((node) => `init(${_.snakeCase(node.name)}) := ${node.behavior ? "behavior" : "empty"};`).join("\n  ");

const initSum = () => "-- TODO: initSum";

const nextBehaviors = () => "-- TODO: nextBehaviors";

const nextSum = () => "-- TODO: nextSum";

const setLTLSpecs = () => "-- TODO: setLTLSpecs";

const smvOutput = (network, threshold) => {
  const { nodes, links } = network;

  const numAgents = nodes.length;

  return `MODULE main
DEFINE
  ${setNumAgents(nodes)}
  ${setThreshold(threshold)}
  ${setRelationships(numAgents, links)}
VAR
  ${defineBehaviors(nodes)}
  ${defineSum(nodes)}
ASSIGN
  ${initAgents(nodes)}
  ${initSum()}
  ${nextBehaviors()}
  ${nextSum()}
${setLTLSpecs()}`;
};

module.exports = smvOutput;
