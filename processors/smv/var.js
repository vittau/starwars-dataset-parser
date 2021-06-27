const _ = require("lodash");
const defineBehaviors = (numAgents) => `agents: array 0..${numAgents - 1} of {empty, behavior};`;

const defineSum = (numAgents, linksMatrix) => {
  const sumWeights = linksMatrix.map(_.sum);
  const maxNeighborsInfluence = _.max(sumWeights);
  return `agents_behavior: array 0..${numAgents - 1} of 0..${maxNeighborsInfluence};`;
};

module.exports = { defineBehaviors, defineSum };
