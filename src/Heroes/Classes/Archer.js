const Hero = require('../Hero');
const getHero = require('../../helpers/getHero');

module.exports = class extends Hero {
  constructor(firstName, hero) {
    super((hero = getHero('archer')));
    this.firstName = firstName;
  }
};
