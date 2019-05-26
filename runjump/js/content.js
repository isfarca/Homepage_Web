// List of actors.
let actorCharacters =
{
    "@" : Player, // Player.
    "o" : Coin, // Coin.
    "=" : Lava, // Left / Right going lava.
    "|" : Lava, // Up / Down going lava.
    "v" : Lava // Falling lava.
};

// Player constructor.
function Player(position)
{
    // Default values.
    this.position = position.plus(new Vector(0, -0.5));
    this.size = new Vector(0.5, 1);
    this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";

// Lava constructor.
function Lava(position, character)
{
    // Default values.
    this.position = position;
    this.size = new Vector(1, 1);

    // Change speed by lava type.
    if (character === "=") // Left / Right going lava.
    {
        this.speed = new Vector(2, 0);
    }
    else if (character === '|') // Up / Down going lava.
    {
        this.speed = new Vector(0, 2);
    }
    else if (character === 'v') // Falling lava.
    {
        this.speed = new Vector(0, 3);
        this.repeatPosition = position;
    }
}
Lava.prototype.type = "lava";

// Coin constructor.
function Coin(position)
{
    // Default values.
    this.basePosition = this.position = position;
    this.size = new Vector(0.6, 0.6);
    this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";