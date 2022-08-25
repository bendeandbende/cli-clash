module.exports = class {
  constructor(weapon) {
    (this.name = weapon.name),
      (this.dmg = weapon.dmg),
      (this.usedBy = weapon.avaible),
      (this.hitRate = weapon.hitRate);
  }
};
