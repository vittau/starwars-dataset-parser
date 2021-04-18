const defineBehaviors = (numAgents) => `agents: array 0..${numAgents - 1} of {empty, behavior};`;

const defineSum = (numAgents) => `agents_behavior: array 0..${numAgents - 1} of real;`;

module.exports = { defineBehaviors, defineSum };
