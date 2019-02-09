// Instances.
let playerInstance;
let enemyInstance;

// Player types.
let warrior = new Player("Warrior", 200, 0, 200, 100, 50);
let rogue = new Player("Rogue", 100, 0, 100, 150, 200);
let mage = new Player("Mage", 50, 0, 50, 200, 50);
let hunter = new Player("Hunter", 200, 0, 50, 200, 100);
let turtle = new Player("Turtle", 200, 0, 200, 50, 50);
let muggel = new Player("Muggel", 100, 0, 100, 200, 150);

// Enemy types.
let goblin = new Enemy("Goblin", 100, 0, 50, 100, 100);
let troll = new Enemy("Troll", 200, 0, 150, 50, 150);
let pirate = new Enemy("Pirate", 150, 0, 150, 150, 100);
let bisa = new Enemy("Bisa", 200, 0, 200, 100, 100);

// Class 'GameManager'.
let GameManager =
{
    // Start game.
    SetGameStart: function(playerType)
    {
        this.ResetPlayer(playerType);
        this.SetPreFight();
    },

    // Set default values to player.
    ResetPlayer: function(playerType)
    {
        // Set default values by class type.
        switch (playerType)
        {
            case "Warrior":
                playerInstance = warrior;
                break;
            case "Rogue":
                playerInstance = rogue;
                break;
            case "Mage":
                playerInstance = mage;
                break;
            case "Hunter":
                playerInstance = hunter;
                break;
            case "Turtle":
                playerInstance = turtle;
                break;
            case "Muggel":
                playerInstance = muggel;
                break;
        }

        // Set player image and output here values.
        document.querySelector(".interface").innerHTML =
            `<img src="images/avatar_player/${playerType.toLowerCase()}.png" alt="${playerInstance.playerType}" class="avatarImages">` +
            `<div>` +
            `<h3>${playerType}</h3>` +
            `<p class="playerHealth">Leben: ${playerInstance.health}</p>` +
            `<p>Mana: ${playerInstance.mana}</p>` +
            `<p>Stärke: ${playerInstance.strength}</p>` +
            `<p>Agilität: ${playerInstance.agility}</p>` +
            `<p>Geschwindigkeit: ${playerInstance.speed}</p>` +
            `</div>`;
    },

    // Search for enemy screen.
    SetPreFight: function()
    {
        // Output.
        document.querySelector(".header").innerHTML = '<p>Aufgabe: Finde einen Gegner!</p>';
        document.querySelector(".actions").innerHTML =
            '<a href="#" class="preFightButton" onclick="GameManager.SetFight()">' +
            'Suche einen Gegner!' +
            '</a>';
        document.querySelector(".arena").style.visibility = "visible";
    },

    // Attack screen.
    SetFight: function()
    {
        // Get random enemy.
        let chooseRandomEnemy = Math.floor(Math.random() * 4);
        
        // Set current enemy.
        switch (chooseRandomEnemy)
        {
            case 0:
                enemyInstance = goblin;
                break;
            case 1:
                enemyInstance = troll;
                break;
            case 2:
                enemyInstance = pirate;
                break;
            case 3:
                enemyInstance = bisa;
                break;
        }

        // Output.
        document.querySelector(".header").innerHTML = '<p>Aufgabe: Besiege deinen Gegner!</p>';
        document.querySelector(".actions").innerHTML =
            '<a href="#" class="preFightButton" onclick="MoveManager.CalculateAttack()">' +
            'Angriff!' +
            '</a>';
        document.querySelector(".enemy").innerHTML =
            `<img src="images/avatar_enemies/${enemyInstance.enemyType.toLowerCase()}.png" alt="${enemyInstance.enemyType}" class="avatarImages">` +
            `<div>` +
            `<h3>${enemyInstance.enemyType}</h3>` +
            `<p class="enemyHealth">Leben: ${enemyInstance.health}</p>` +
            `<p>Mana: ${enemyInstance.mana}</p>` +
            `<p>Stärke: ${enemyInstance.strength}</p>` +
            `<p>Agilität: ${enemyInstance.agility}</p>` +
            `<p>Geschwindigkeit: ${enemyInstance.speed}</p>` +
            `</div>`;
    }
};