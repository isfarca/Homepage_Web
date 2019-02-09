let keyLogger = new KeyLogger();

function KeyLogger()
{
	this.KeyStatus =
	{
		Up : false,
		Down : false,
		Left : false,
		Right : false,
		Fire : false
	};

	this.keyDownListener = function(event)
	{
		let key = event.code ? event.code : event.which;

		switch(key)
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

	this.keyUpListener = function(event)
    {
        let key = event.code ? event.code : event.which;

        switch(key)
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