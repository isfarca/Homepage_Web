// Default game settings.
gamelength = 30;
timerID = null;

// Default values.
let playing = false;
let totalHits = 0;
let numberHoles = 6 * 10;
let currentPosition = -1;

// Clear holes.
function changeButtons(isDisabled)
{
    // Get images.
    let buttons = document.getElementsByClassName("image");

    // Change values for image buttons.
    for (let i = 0; i < buttons.length; i++)
    {
        // Prevent refresh page.
        buttons[i].addEventListener
        (
            "click",
            function(event)
            {
                event.preventDefault()
            }
        );

        // Default values.
        buttons[i].disabled = isDisabled;
        buttons[i].style.opacity = "0.1";
    }
}

// Stop timer.
function stopTimer()
{
    // Are you playing?
    if (playing) // Yes.
    {
        // Clear timer.
        clearTimeout(timerID);
    }
}

// Output timer for player.
function showTimer(rememberTime)
{
    // Write timer to field.
    document.controlPanel.timeLeft.value = rememberTime;

    // Are you playing?
    if (playing) // Yes.
    {
        // No time passed?
        if (rememberTime === 0) // Yes.
        {
            // Stop game.
            stopGame();
        }
        else // No.
        {
            // Decrement time, so that it passes.
            let tempTime = rememberTime - 1;

            // Call the timer function every second.
            setTimeout
            (
                showTimer,1000, tempTime
            );
        }
    }
}

// Stop game.
function stopGame()
{
    // Stop timer.
    stopTimer();

    // Change default values for player.
    playing = false;
    document.controlPanel.timeLeft.value = 0;

    // Clear buttons and output game over in the field.
    changeButtons(true);
    display("Zeit ist abgelaufen!");

    // Show message with total hits information.
    alert("Zeit ist abgelaufen!\nDeine Punktzahl beträgt: " + totalHits + ".\n\n" + randomFact());
}

// Start game.
function play()
{
    // First of all, to stop timer, when is it running.
    stopTimer();

    // Are you playing?
    if (playing)
    {
        // Stop game and exit this function (toggle effect).
        stopGame();

        return;
    }

    // Change player status.
    playing = true;

    // Write default values for starting game.
    changeButtons(false);
    totalHits = 0;
    document.controlPanel.score.value = 0;
    display("Zeit läuft!");

    // Start the game and timer.
    launch();
    showTimer(gamelength);
}

// Output text to field.
function display(message)
{
    document.controlPanel.state.value = message;
}

// Game running.
function launch()
{
    // Change launch status.
    let launched = false;

    // By not launching.
    while (!launched)
    {
        // Get random radio button
        let randomPositionNumber = randomId();

        // Radio button id equal not the current radio button id.
        if (randomPositionNumber !== currentPosition) // Yes.
        {
            // Visible status.
            document.getElementsByClassName("image")[randomPositionNumber].style.opacity = "1.0";

            // Write new current radio button id.
            currentPosition = randomPositionNumber;

            // Is launched status.
            launched = true;
        }
    }
}

// Hit radio button evaluation
function hitHead(id)
{
    // Are you not playing?
    if (!playing) // Yes.
    {
        // Clear buttons and Output the task.
        changeButtons(true);
        display("Drücke Start um zu spielen!");

        // Exit this function.
        return;
    }

    // Hit wrong button?
    if (currentPosition !== id) // Yes.
    {
        // Decrement score.
        totalHits--;
        document.controlPanel.score.value = totalHits;

        // Invisible clicked radio button.
        document.getElementsByClassName("image")[id].style.opacity = "0.1";
    }
    else // No.
    {
        // Increment score.
        totalHits++;
        document.controlPanel.score.value = totalHits;

        // Refresh the radio button.
        launch();

        // Invisible clicked radio button.
        document.getElementsByClassName("image")[id].style.opacity = "0.1";
    }
}

// Get random radio button id.
function randomId()
{
    return (Math.floor(Math.random() * 100 % numberHoles));
}

// Get a random fact about me.
function randomFact()
{
    return facts[Math.floor(Math.random() * facts.length)];
}