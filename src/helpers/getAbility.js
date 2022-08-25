const data = require('../data');

module.exports = getAbility = (abilityName) =>
  data.abilities.find((ability) => ability.name === abilityName);
