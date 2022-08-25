const getAbility = require('../helpers/getAbility');
const randomNumberInRange = require('../helpers/randomNumberInRange');

module.exports = class {
  constructor(hero, dmg = 0, buffed = false) {
    (this.name = hero.name),
      (this.hp = hero.hp),
      (this.ability = getAbility(hero.ability)),
      (this.armour = hero.armour),
      (this.evasion = hero.evasion),
      (this.dmg = dmg),
      (this.buffed = buffed),
      (this.maxHp = hero.hp),
      (this.weapon = '');
  }

  equipWeapon(weapon) {
    if (!weapon) return;

    this.weapon = weapon.name;
    this.hitRate = weapon.hitRate; // in case the boost gives the hero dmg, they'll need this prop.
    if (!weapon.usedBy.includes(this.name)) return;
    this.dmg = weapon.dmg;
  }

  attack(enemy) {
    const initialDmg =
      typeof this.dmg === 'number' ? this.dmg : randomNumberInRange(this.dmg); // 1:if it's zero 2:in the rare case when the base damage is zero but gets buffed by e.g Fire Storm
    const chanceToEvade = Math.min(enemy.evasion, 100) / 100;
    const chanceToMiss = (100 - Math.min(parseFloat(this.hitRate), 100)) / 100;

    if (Math.random() <= chanceToEvade || Math.random() <= chanceToMiss) return;

    enemy.hp -= Math.max(initialDmg - Math.floor(enemy.armour / 3), 0); // armour can't heal (in case initialDmg is 0...)

    return initialDmg; // to be able to show it in the arena (part of the requirements)
  }

  buff() {
    // creating the ifs for 'dmg' and 'hp' here in the parent and not in Mage, Priest and Archer, in case the abilites change or new heroes get added to the game and they also use one of these stat in their abilities (a Paladin for example that can also heal themselves etc..). Or if items get introduced to the game
    if (this.ability.stat === 'dmg') {
      // if a useable weapon's equipped
      if (this.dmg) {
        const [minDmg, maxDmg] = this.dmg.split('-');

        this[this.ability.stat] = `${+minDmg + this.ability.boost}-${
          +maxDmg + this.ability.boost
        }`;
      }

      // if a non-usable weapon's equipped
      if (!this.dmg) {
        this[this.ability.stat] += this.ability.boost;
      }
    } else if (this.ability.stat === 'hp') {
      this[this.ability.stat] = Math.min(
        this[this.ability.stat] + this.ability.boost,
        this.maxHp
      );
    } else {
      this[this.ability.stat] += this.ability.boost;
    }

    this.buffed = true;
  }

  buffReverse() {
    if (!this.buffed || this.ability.stat === 'hp') return; // 1: if not buffed, no need to reverse 2: healing won't "reverse"

    if (this.ability.stat === 'dmg') {
      if (this.dmg !== this.ability.boost) {
        const [minDmg, maxDmg] = this.dmg.split('-');

        this[this.ability.stat] = `${+minDmg - this.ability.boost}-${
          +maxDmg - this.ability.boost
        }`;
      }

      if (this.dmg === this.ability.boost) {
        this.dmg = 0;
      }
    } else {
      this[this.ability.stat] -= this.ability.boost;
    }

    this.buffed = false;
  }
};
