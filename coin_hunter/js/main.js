// Play animation.
function runAnimation(frameFunction)
{
    // Declare no last time.
    let lastTime = null;

    // Passing animation frame.
    function frame(time)
    {
        // Animation no stopped.
        let stop = false;

        // Is last time defined?
        if (lastTime != null) // Yes.
        {
            // Decrease time step.
            let timeStep = Math.min(time - lastTime, 100) / 1000;

            // Is frame count finished?
            stop = frameFunction(timeStep) === false;
        }

        // Set last time.
        lastTime = time;

        // Animation stopped?
        if (!stop) // No.
        {
            // Continue animation from actually point.
            requestAnimationFrame(frame);
        }
    }

    // Pass animation.
    requestAnimationFrame(frame);
}

// Define controls.
let controls = trackKeys(controlCodes);

// Play level.
function runLevel(level, Display, andThen)
{
    // Refresh display.
    let display = new Display(document.body, level);

    // Play animation.
    runAnimation(function(step)
    {
        level.animate(step, controls);
        display.drawFrame(step);

        if (level.isFinished())
        {
            display.clear();

            if (andThen)
            {
                andThen(level.status);
            }

            return false;
        }
    });
}

// Play game.
function runGame(plans, Display)
{
    // Status handling.
    function startLevel(n)
    {
        runLevel(new Level(plans[n]), Display, function(status)
        {
            if (status === "lost")
            {
                startLevel(n);
            }
            else if (n < plans.length - 1)
            {
                startLevel(n + 1);
            }
            else
            {
                alert("You win!");
            }
        });
    }

    startLevel(0);
}
runGame(LEVELS, DOMDisplay);