const _ = require("lodash");

const initAgents = (nodes) =>
  nodes.map((node) => `init(${_.snakeCase(node.name)}) := ${node.behavior ? "behavior" : "empty"};`).join("\n  ");

const innerSumLine = (curAgentIndex, agentIndexes, hasNext) => {
  const line = agentIndexes.map(
    (agentIndexInternal) =>
      `(${hasNext ? "next(" : ""}agents[${agentIndexInternal}]${
        hasNext ? ")" : ""
      } = behavior ? relationships[${curAgentIndex}][${agentIndexInternal}] : 0.0)`
  );

  return line.join(" + ");
};

const sumLine = (numAgents, type) => {
  const agentIndexes = _.range(0, numAgents);

  const sums = agentIndexes.map((agentIndex) => {
    const line = innerSumLine(agentIndex, agentIndexes, type === "next");
    return `${type}(agents_alpha[${agentIndex}]) := ${line};`;
  });

  return sums.join("\n  ");
};

const initSum = (numAgents) => sumLine(numAgents, "init");
const nextSum = (numAgents) => sumLine(numAgents, "next");

const innerNextBehaviorsLine = (curAgentIndex, agentIndexes) => {
  const line = agentIndexes.map((agentIndexInternal) => `relationships[${curAgentIndex}][${agentIndexInternal}]`);
  return line.join(" + ");
};

const nextBehaviors = (numAgents) => {
  const agentIndexes = _.range(0, numAgents);

  const sums = agentIndexes.map((agentIndex) => {
    const line = innerNextBehaviorsLine(agentIndex, agentIndexes);
    return `next(agents[${agentIndex}]) := agents_behavior[${agentIndex}] > (${line}) * threshold ? behavior : agents[${agentIndex}];`;
  });

  return sums.join("\n  ");
};

module.exports = { initAgents, initSum, nextBehaviors, nextSum };
