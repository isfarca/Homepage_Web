// Player velocity on x axis.
let playerSpeedX = 10;

// Player movement on x axis.
Player.prototype.moveX = function(step, level, keys)
{
    // Default speed, when the player have not pressed defined keys.
    this.speed.x = 0;

    // Left key pressed?
    if (keys["left"]) // Yes.
    {
        // Player go back.
        this.speed.x -= playerSpeedX;
    }

    // Right key pressed?
    if (keys["right"]) // Yes.
    {
        // Player go forward.
        this.speed.x += playerSpeedX;
    }

    // Positions.
    let motion = new Vector(this.speed.x * step, 0);
    let newPosition = this.position.plus(motion);
    let obstacle = level.obstacleAt(newPosition, this.size);

    // Player collision with other actors handling.
    if (obstacle)
    {
        level.playerTouched(obstacle);
    }
    else
    {
        this.position = newPosition;
    }
};

// Default gravity value.
let gravity = 30;

// Player can be pressed jump button.
let mayBePressed = true;

// Default jump values.
let isJumping = false;
let currentJumpSpeed = 0;
let maxJumpSpeed = 20;

// Player movement on y axis.
Player.prototype.moveY = function(step, level, keys)
{
    // Default speed, when the player have not pressed defined keys.
    this.speed.y += step * gravity;

    // Positions.
    let motion = new Vector(0, this.speed.y * step);
    let newPosition = this.position.plus(motion);
    let obstacle = level.obstacleAt(newPosition, this.size);

    // Player on a ground?
    if (obstacle) // Yes.
    {
        // Call collision function.
        level.playerTouched(obstacle);

        // Up key not pressed?
        if (!keys["up"])
        {
            mayBePressed = true;
        }

        // Up key pressed and not jumping?
        if (keys["up"] && !isJumping && mayBePressed) // Yes.
        {
            // Increase the jump speed.
            currentJumpSpeed += 2;

            // Decrease the height of player.
            this.size = new Vector(this.size.x, this.size.y - 0.05);

            // Max jump speed exceeded?
            if (currentJumpSpeed >= maxJumpSpeed) // Yes.
            {
                // Not may be pressed.
                mayBePressed = false;

                // Player is forced to jump.
                isJumping = true;
            }
        }
        // Are you jumping?
        else if (isJumping || !keys["up"] && currentJumpSpeed > 0) // Yes.
        {
            // To jump.
            this.speed.y = -currentJumpSpeed;

            // Set default values for defined variables.
            currentJumpSpeed = 0;
            isJumping = false;

            // Set position higher for collision with ground.
            this.position = new Vector(this.position.x, this.position.y - 1);

            // Set default size of player.
            this.size = new Vector(this.size.x, 1);
        }
        else // Otherwise.
        {
            // No up speed.
            this.speed.y = 0;
        }
    }
    else // Otherwise.
    {
        // New position data's.
        this.position = newPosition;
    }
};

// Act, the player to do this.
Player.prototype.act = function(step, level, keys)
{
    // Movement.
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);

    // Collision check.
    let otherActor = level.actorAt(this);
    if (otherActor)
    {
        level.playerTouched(otherActor.type, otherActor);
    }

    // Status check.
    if (level.status === "lost")
    {
        this.position.y += step;
        this.size.y -= step;
    }
};