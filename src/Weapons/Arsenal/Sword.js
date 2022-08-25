const Weapon = require('../Weapon');
const getWeapon = require('../../helpers/getWeapon');

module.exports = class extends Weapon {
  constructor(weapon) {
    super((weapon = getWeapon('sword')));
  }
};
