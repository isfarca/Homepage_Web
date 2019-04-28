// Check obstacle.
Level.prototype.obstacleAt = function(position, size)
{
    // Extrema on x axis.
    let xStart = Math.floor(position.x);
    let xEnd = Math.ceil(position.x + size.x);

    // Extrema on y axis.
    let yStart = Math.floor(position.y);
    let yEnd = Math.ceil(position.y + size.y);

    // Wall.
    if (xStart < 0 || xEnd > this.width || yStart < 0)
    {
        return "wall";
    }

    // Lava.
    if (yEnd > this.height)
    {
        return "lava";
    }

    // Return field types on level grid.
    for (let y = yStart; y < yEnd; y++)
    {
        for (let x = xStart; x < xEnd; x++)
        {
            let fieldType = this.grid[y][x];

            if (fieldType)
            {
                return fieldType;
            }
        }
    }
};

// Check actor.
Level.prototype.actorAt = function(actor)
{
    // Return below level.
    for (let i = 0; i < this.actors.length; i++)
    {
        let other = this.actors[i];

        if (other !== actor && actor.position.x + actor.size.x > other.position.x &&
            actor.position.x < other.position.x + other.size.x && actor.position.y + actor.size.y > other.position.y &&
            actor.position.y < other.position.y + other.size.y)
        {
            return other;
        }
    }
};

let maxStep = 0.05;

Level.prototype.animate = function(step, keys)
{
    // Have you a status?
    if (this.status != null) // Yes.
    {
        // Decrement delay by game end.
        this.finishDelay -= step;
    }

    // Won / Lost animation.
    while (step > 0)
    {
        let thisStep = Math.min(step, maxStep);

        this.actors.forEach(function(actor){actor.act(thisStep, this, keys);}, this);

        step -= thisStep;
    }
};