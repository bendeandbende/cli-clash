const data = require('../data');

module.exports = getWeapon = (weaponName) =>
  data.weapons.find((weapon) => weapon.name === weaponName);
