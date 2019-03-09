// Instantiate.
let keyLogger = new KeyLogger();

// 'KeyLogger' class.
function KeyLogger()
{
	// Keys only for this game.
	this.KeyStatus =
	{
		Up : false,
		Down : false,
		Left : false,
		Right : false,
		Fire : false
	};

	// Key down.
	this.keyDownListener = function(event)
	{
		// Set event handler for keys.
		let key = event.code ? event.code : event.which;

		// Get the pressed down key.
		switch (key)
		{
			// Up.
			case "KeyW":
			case "ArrowUp":
				keyLogger.KeyStatus.Up = true;
				break;

			// Down.
			case "KeyS":
			case "ArrowDown":
				keyLogger.KeyStatus.Down = true;
				break;

			// Left.
			case "KeyA":
			case "ArrowLeft":
				keyLogger.KeyStatus.Left = true;
				break;

			// Right.
			case "KeyD":
			case "ArrowRight":
				keyLogger.KeyStatus.Right = true;
				break;

			// Fire.
			case "Space":
				keyLogger.KeyStatus.Fire = true;
				break;
		}
	};

	// Key up.
	this.keyUpListener = function(event)
    {
		// Set event handler for keys.
        let key = event.code ? event.code : event.which;

		// Get the pressed up key.
        switch (key)
        {
            // Up.
            case "KeyW":
            case "ArrowUp":
                keyLogger.KeyStatus.Up = false;
                break;

            // Down.
            case "KeyS":
            case "ArrowDown":
                keyLogger.KeyStatus.Down = false;
                break;

            // Left.
            case "KeyA":
            case "ArrowLeft":
                keyLogger.KeyStatus.Left = false;
                break;

            // Right.
            case "KeyD":
            case "ArrowRight":
                keyLogger.KeyStatus.Right = false;
                break;

            // Fire.
            case "Space":
                keyLogger.KeyStatus.Fire = false;
                break;
        }
	};
}