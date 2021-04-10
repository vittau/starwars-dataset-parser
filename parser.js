const _ = require("lodash");

const setNumAgents = (nodes) => `num_agents := ${nodes.length};`;

const setThreshold = (threshold) => `threshold := ${threshold}`;

const getAgents = (nodes) => nodes.map(({ name }) => _.kebabCase(name));

const setRelationships = (agents) => "-- TODO: setRelationships";

const defineBehaviors = (agents) => `agents: array 0..${agents.length - 1} of {empty, alpha};`;

const defineSum = (agents) => `agents_alpha: array 0..${agents.length - 1} of real;`;

const initAgents = (agents) => agents.map((agent) => `init(${agent}) := empty;`).join("\n  ");

const initSum = () => "-- TODO: initSum";

const nextBehaviors = () => "-- TODO: nextBehaviors";

const nextSum = () => "-- TODO: nextSum";

const setLTLSpecs = () => "-- TODO: setLTLSpecs";

const parser = (network, threshold) => {
  const { nodes, links } = network;

  const agents = getAgents(nodes);

  return `MODULE main
DEFINE
  ${setNumAgents(nodes)}
  ${setThreshold(threshold)}
  ${setRelationships(agents)}
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

module.exports = parser;
