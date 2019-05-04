// Default game settings.
gamelength = 30;
timerID = null;

// Default values.
let playing = false;
let numberHoles = 6 * 10;
let currentPosition = -1;

// Clear holes.
function clearHoles()
{
    // Set unchecked value to all radio buttons.
    for (let i = 0; i < document.playPanel.elements.length; i++)
    {
        document.playPanel.elements[i].checked = false;
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
    document.controlPanel.timeleft.value = rememberTime;

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

    // Get all total hits.
    let totalHits = document.controlPanel.timeleft.value;

    // Change default values for player.
    playing = false;
    document.controlPanel.timeleft.value = 0;

    // Clear holes and output game over in the field.
    clearHoles();
    display("Game Over");

    // Show message with total hits information.
    alert("Game Over.\nYour score is: " + totalHits);
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
    clearHoles();
    document.controlPanel.score.value = 0;
    display("Playing");

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
        let randomPositionNumber = random();

        // Radio button id equal not the current radio button id.
        if (randomPositionNumber !== currentPosition) // Yes.
        {
            // Checked status.
            document.playPanel.elements[randomPositionNumber].checked = true;

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
        // Clear holes and Output the task.
        clearHoles();
        display("Push Start to Play");

        // Exit this function.
        return;
    }

    // Hit wrong button?
    if (currentPosition !== id) // Yes.
    {
        // Decrement score.
        document.controlPanel.score.value += -1;

        // Unchecked clicked radio button.
        document.playPanel.elements[id].checked = false;
    }
    else // No.
    {
        // Increment score.
        document.controlPanel.score.value += 1;

        // Refresh the radio button.
        launch();

        // Unchecked clicked radio button.
        document.playPanel.elements[id].checked = false;
    }
}

// Get random radio button id.
function random()
{
    return (Math.floor(Math.random() * 100 % numberHoles));
}