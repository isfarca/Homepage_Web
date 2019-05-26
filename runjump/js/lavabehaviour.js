// Act, the lava to do this.
Lava.prototype.act = function(step, level)
{
    // Change the new position of lava.
    let newPosition = this.position.plus(this.speed.times(step));

    // Have a obstacle on this new position.
    if (!level.obstacleAt(newPosition, this.size)) // No.
    {
        // Change position.
        this.position = newPosition;
    }
    else if (this.repeatPosition) // Yes.
    {
        // Repeat passing.
        this.position = this.repeatPosition;
    }
    else // Otherwise.
    {
        // Turning back.
        this.speed = this.speed.times(-1);
    }
};