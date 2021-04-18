const _ = require("lodash");
const { initAgents, initSum, nextBehaviors, nextSum } = require("./smv/assign");
const { setThreshold, setRelationships } = require("./smv/define");
const { defineBehaviors, defineSum } = require("./smv/var");

const setLTLSpecs = (ltlspec) => `LTLSPEC ${ltlspec};`;

const smvOutput = (network, threshold, ltlspec) => {
  const { nodes, links } = network;

  const numAgents = nodes.length;

  return `MODULE main
DEFINE
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
${ltlspec ? setLTLSpecs(ltlspec) : ""}`;
};

module.exports = smvOutput;
