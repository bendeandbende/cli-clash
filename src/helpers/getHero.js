const data = require('../data');

module.exports = getHero = (heroName) =>
  data.heroes.find((hero) => hero.name === heroName);
