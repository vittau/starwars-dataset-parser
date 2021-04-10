const parser = (network, threshold) => {
  const { nodes, links } = network;

  let output = `MODULE main
DEFINE
num_agents := ${nodes.length};
majority := ${threshold};`;

  return output;
};

module.exports = parser;
