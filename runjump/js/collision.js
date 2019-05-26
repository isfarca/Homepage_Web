// Handling player touched elements.
Level.prototype.playerTouched = function(type, actor)
{
    // Player touched lava and have no status actually?
    if (type === "lava" && this.status == null) // Yes.
    {
        // Change status to lost and delay game end.
        this.status = "lost";
        this.finishDelay = 1;
    }
    else if (type === "coin") // No.
    {
        // Check, have you more coins and return boolean.
        this.actors = this.actors.filter(function(other)
        {
            return other !== actor;
        });

        // Have you coins in level?
        if (!this.actors.some(function(actor) {return actor.type === "coin";})) // No.
        {
            // Change status to win and delay game end.
            this.status = "won";
            this.finishDelay = 1;
        }
    }
};