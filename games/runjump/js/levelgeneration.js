// Check is level finished and return boolean.
Level.prototype.isFinished = function()
{
    return this.status != null && this.finishDelay < 0;
};

// Level constructor.
function Level(plan)
{
    // Change default values.
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];

    // Create level.
    for (let y = 0; y < this.height; y++)
    {
        let line = plan[y],  gridLine = [];

        for (let x = 0; x < this.width; x++)
        {
            let character = line[x], fieldType = null;
            let Actor = actorCharacters[character];

            if (Actor)
            {
                this.actors.push(new Actor(new Vector(x, y), character));
            }
            else if (character === "x")
            {
                fieldType = "wall";
            }
            else if (character === "!")
            {
                fieldType = "lava";
            }
            else if (character === "|")
            {
                fieldType = "lava";
            }
            else if (character === "=")
            {
                fieldType = "lava";
            }
            else if (character === "v")
            {
                fieldType = "lava";
            }
            gridLine.push(fieldType)
        }
        this.grid.push(gridLine);
    }

    // Create player.
    this.player = this.actors.filter(function(actor)
    {
        return actor.type === "player";
    })[0];

    // Set default status.
    this.status = this.finishDelay = null;
}

// Set level element to html document.
function element(name, className)
{
    // Create html element.
    let element = document.createElement(name);

    // Have this element a class name?
    if (className) // Yes.
    {
        // Change class name.
        element.className = className;
    }

    // Return current element.
    return element;
}