const _ = require("lodash");
const { initAgents, initSum, nextBehaviors, nextSum } = require("./smv/assign");
const { setNumAgents, setThreshold, setRelationships } = require("./smv/define");
const { defineBehaviors, defineSum } = require("./smv/var");

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
  ${defineBehaviors(numAgents)}
  ${defineSum(numAgents)}
ASSIGN
  ${initAgents(nodes)}
  ${initSum(numAgents)}
  ${nextBehaviors(numAgents)}
  ${nextSum(numAgents)}
${setLTLSpecs()}`;
};

module.exports = smvOutput;
