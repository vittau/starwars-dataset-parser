const _ = require("lodash");

const getAgents = (nodes) => nodes.map(({ name }) => _.snakeCase(name));

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

const defineBehaviors = (agents) => `agents: array 0..${agents.length - 1} of {empty, alpha};`;

const defineSum = (agents) => `agents_alpha: array 0..${agents.length - 1} of real;`;

const initAgents = (agents) => agents.map((agent) => `init(${agent}) := empty;`).join("\n  ");

const initSum = () => "-- TODO: initSum";

const nextBehaviors = () => "-- TODO: nextBehaviors";

const nextSum = () => "-- TODO: nextSum";

const setLTLSpecs = () => "-- TODO: setLTLSpecs";

const smvOutput = (network, threshold) => {
  const { nodes, links } = network;

  const agents = getAgents(nodes);
  const numAgents = agents.length;

  return `MODULE main
DEFINE
  ${setNumAgents(nodes)}
  ${setThreshold(threshold)}
  ${setRelationships(numAgents, links)}
VAR
  ${defineBehaviors(agents)}
  ${defineSum(agents)}
ASSIGN
  ${initAgents(agents)}
  ${initSum()}
  ${nextBehaviors()}
  ${nextSum()}
${setLTLSpecs()}`;
};

module.exports = smvOutput;
