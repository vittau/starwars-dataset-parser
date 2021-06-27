const _ = require("lodash");
const { initAgents, initSum, nextBehaviors, nextSum } = require("./smv/assign");
const { setThreshold, setRelationships } = require("./smv/define");
const { defineBehaviors, defineSum } = require("./smv/var");

const setLTLSpecs = (ltlspec) => `LTLSPEC ${ltlspec};`;

const smvOutput = (network, threshold_num, threshold_den, isSymmetric, ltlspec) => {
  const { nodes, links } = network;

  const numAgents = nodes.length;

  // Initialize the matrix
  const linksMatrix = _.chunk(
    _.range(numAgents * numAgents).map((i) => 0),
    numAgents
  );

  // Fill the matrix with the weights
  links.forEach(({ source, target, value }) => {
    if (linksMatrix.length > source) {
      if (linksMatrix[source].length > target) {
        linksMatrix[source][target] = value;
        if (isSymmetric) {
          linksMatrix[target][source] = value;
        }
      }
    }
  });

  return `MODULE main
DEFINE
  ${setThreshold(threshold_num, threshold_den)}
  ${setRelationships(linksMatrix)}
VAR
  ${defineBehaviors(numAgents)}
  ${defineSum(numAgents, linksMatrix)}
ASSIGN
  ${initAgents(nodes)}
  ${initSum(numAgents)}
  ${nextBehaviors(numAgents)}
  ${nextSum(numAgents)}
${ltlspec ? setLTLSpecs(ltlspec) : ""}`;
};

module.exports = smvOutput;
