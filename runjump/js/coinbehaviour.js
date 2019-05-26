// Wobble default values.
let wobbleSpeed = 8, wobbleDistance = 0.07;

// Act, the coin to do this.
Coin.prototype.act = function(step)
{
    // Increment coin wobble steps.
    this.wobble += step * wobbleSpeed;

    // Change minimal coin position by wobbling.
    let wobblePosition = Math.sin(this.wobble) * wobbleDistance;
    this.position = this.basePosition.plus(new Vector(0, wobblePosition));
};