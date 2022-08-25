const Arena = require('./src/Arena');

/// HEROES
const Archer = require('./src/Heroes/Classes/Archer');
const Mage = require('./src/Heroes/Classes/Mage');
const Priest = require('./src/Heroes/Classes/Priest');
const Rouge = require('./src/Heroes/Classes/Rouge');
const Warrior = require('./src/Heroes/Classes/Warrior');

/// WEAPONS
const Bow = require('./src/Weapons/Arsenal/Bow');
const Dagger = require('./src/Weapons/Arsenal/Dagger');
const BattleAxe = require('./src/Weapons/Arsenal/BattleAxe');
const Sword = require('./src/Weapons/Arsenal/Sword');
const Wand = require('./src/Weapons/Arsenal/Wand');
const WarHammer = require('./src/Weapons/Arsenal/WarHammer');

/////////////////////////// CHOOSE YOUR HEROES AND THEIR WEAPONS THEN START THE TOURNAMENT /////////////////////////////////////
const bela = new Warrior('Béla');
bela.equipWeapon(new BattleAxe());

const pista = new Priest('Pista');
pista.equipWeapon(new WarHammer());

Arena.tournament(pista, bela);
