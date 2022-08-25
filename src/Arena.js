const config = require('./config');
const camelCaseToReadable = require('./helpers/camelCaseToReadable');

module.exports = {
  abilityChance: config.ABILITY_ACTIVATION_CHANCE,

  state: {
    announcer: '',
    round: 1,
  },

  init(fighter1, fighter2) {
    this.clearAnnouncer();
    fighter1.buffReverse();
    fighter2.buffReverse();
    this.state.round++;
  },

  announce() {
    console.log(this.state.announcer);
  },

  addToAnnouncer(text) {
    this.state.announcer += text + '\n';
  },

  clearAnnouncer() {
    this.state.announcer = '';
  },

  tournament(fighter1, fighter2) {
    this.addToAnnouncer(
      `-*-*-*- ${fighter1.firstName}, the mighty ${camelCaseToReadable(
        fighter1.name
      )} holding the legendary ${camelCaseToReadable(
        fighter1.weapon
      )} is about to face ${fighter2.firstName}, the ${camelCaseToReadable(
        fighter2.name
      )} who's known to how to hold the lethal ${camelCaseToReadable(
        fighter2.weapon
      )} -*-*-*-\n`
    );

    this.fight(fighter1, fighter2);
  },

  buffByChance(fighter) {
    if (Math.random() < this.abilityChance) {
      const { name: abilityName, stat, boost } = fighter.ability;

      fighter.buff();

      this.addToAnnouncer(
        `${fighter.firstName} activated the ability ${camelCaseToReadable(
          abilityName
        )}. It gave ${fighter.firstName} +${boost} ${stat}, now it's ${
          fighter[stat]
        }.`
      );
    }
  },

  attackingPhase(attacker, defender) {
    const initDefenderHp = defender.hp;
    this.buffByChance(attacker);

    // A Math.min(attacker.attack(defender), defender.hp) could be added here, so when they hit 19 to the defender that has 5 hp it won't go negative. I like seeing how badly they finished the opponent, so leaving it like this.
    const initialDmg = attacker.attack(defender);

    this.addToAnnouncer(`${defender.firstName} has ${initDefenderHp} HP.`);

    // checking if the dmg is a range and if it got the maximum value
    if (
      typeof attacker.dmg !== 'number' &&
      +attacker.dmg.split('-')[1] === initialDmg
    ) {
      this.addToAnnouncer(`CRITICAL HIT!`);
    }

    if (!initialDmg) {
      // if they miss (due to either evasion or hitrate) the attack method returns undefined. Also if they have no weapon (and no dmg buff) the dmg is zero
      this.addToAnnouncer(`${attacker.firstName} missed!`);
    } else if (initDefenderHp - initialDmg < defender.hp) {
      // the initial damage got reduced
      this.addToAnnouncer(
        `${attacker.firstName} was about to hit ${initialDmg}. Due to ${
          defender.firstName
        }'s thick armour, the damage was only ${initDefenderHp - defender.hp}.`
      );
    } else {
      // the initial damage didn't get reduced
      this.addToAnnouncer(
        `${attacker.firstName} hit ${defender.firstName} with ${initialDmg}. Due to ${defender.firstName}'s weak armour, the damage didn't get reduced.`
      );
    }

    this.addToAnnouncer(
      `Now ${defender.firstName} has ${defender.hp} HP, losing ${
        initDefenderHp - defender.hp
      } HP! \n`
    );
  },

  fight(fighter1, fighter2) {
    const [firstToAttack, secondToAttack] = [fighter1, fighter2].sort(() =>
      Math.random() < 0.5 ? -1 : 1
    ); // achiving randomly who attacks first

    if (!fighter1.weapon || !fighter2.weapon) {
      this.addToAnnouncer(
        `------- Round ${this.state.round} is about to... \n WAIT! Someone's left their weapon home! True champions won't fight without weapons, match's over. \n`
      );
      this.announce();
      return;
    }

    this.addToAnnouncer(
      `------- Round ${this.state.round} is about to begin ------- \n`
    );
    this.addToAnnouncer(`${firstToAttack.firstName} is attacking first.`);

    this.attackingPhase(firstToAttack, secondToAttack);

    if (secondToAttack.hp <= 0) {
      this.declareWinner(firstToAttack, secondToAttack);
      return;
    }

    this.addToAnnouncer(`${secondToAttack.firstName} is attacking now.`);
    this.attackingPhase(secondToAttack, firstToAttack);

    if (firstToAttack.hp <= 0) {
      this.declareWinner(secondToAttack, firstToAttack);
      return;
    }

    if (this.state.round === 50) {
      // Needed in case two non-mages and non-archers (who have dmg buffs) are fightning with unusable weapons.
      // Set to 50 in case a rouge is fighting with a dagger (due to super low damage it can take a while against an other rouge or someone without a useable weapon)

      this.addToAnnouncer(
        `DING-DONG, the battle is over! ${firstToAttack.firstName} and ${secondToAttack.firstName} has fought enough, they have proven themselves as true champions. They are both winners! (Or losers?)`
      );
      this.announce();
      return;
    }

    this.announce();

    this.init(fighter1, fighter2);

    setTimeout(() => {
      this.fight(fighter1, fighter2);
    }, 1000);
  },

  declareWinner(winner, loser) {
    this.addToAnnouncer(
      `${winner.firstName} defeated ${loser.firstName}! What a glorius victory! *Final Fantasy VI victory soundtrack playing in the background*`
    );
    this.announce();
  },
};
