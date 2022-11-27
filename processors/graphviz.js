const _ = require("lodash");
const { behaviorNodes } = require("./graphviz/behavior");
const { relationships } = require("./graphviz/relationships");

const graphvizOutput = (network, isSymmetric) => {
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
      }
    }
  });

  return `strict ${isSymmetric ? "graph" : "digraph"} {
  // Nodes
${behaviorNodes(nodes)}
  // Relationships
${relationships(nodes, linksMatrix, isSymmetric)}
}`;
};

module.exports = graphvizOutput;
