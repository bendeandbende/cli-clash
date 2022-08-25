# CLI CLASH coding challange

Application created in node.js according to the given description.

The application runs in node.
To start the game:

1. Go to "index.js' file
2. Create your heroes
3. Equip their weapons
4. Put them in to the arena to fight for their lives!
5. hit 'node index.js' in the terminal

A preset example is waiting for you already.
Be careful, if a hero can't use the equipped weapon, they're going to be in big trouble.

All heroes have their own abilities that - if they are lucky - will activate in the beginning of the round and will be active till the next round,

To match the example in the task, heroes were created in different modules (rathen than using just the Hero class and adding an parameter for the hero type like 'warrior'). However it'd have been more simple/easier by only creating a Hero and a Weapon class, this makes the project more varsitile in case we have to add new methods to the child classes later (but considering the possibility of the 'data.JSON' file being updated with new heroes/weapons - if it's stays as is - we have to manually create the new hero/weapon classes).
