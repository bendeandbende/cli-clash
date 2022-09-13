# CLI CLASH coding challange

Application created in node.js according to a given description. The description itself is not that relevant, what you need to know is: heroes (e.g warrior, priest) can be created, heroes can equip weapons, and they can fight in the arena. Enjoy watching their battle in the console.

The application runs in node.
To start the game:

1. Go to "index.js' file
2. Create your heroes
3. Equip their weapons
4. Put them in the arena to fight for their lives!
5. Hit 'node index.js' in the terminal

A preset example is waiting for you already.
Be careful, if a hero can't use the equipped weapon, they're going to be in a big trouble.

All heroes have their own abilities that - if they are lucky - will activate in the beginning of the round and will be active till the next round,

To match the example that was showed in the - right now not relevant - description, heroes were created in different modules (rather than using just the Hero class and adding a parameter for the hero type like 'warrior'). However it'd have been more simple/easier by only creating a Hero and a Weapon class, this makes the project more varsitile in case we have to add new methods to the child classes later (but considering the possibility of the 'data.JSON' file being updated with new heroes/weapons - if it's stays as is - we have to manually create the new hero/weapon classes).
