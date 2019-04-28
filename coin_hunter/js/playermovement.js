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

// Default jump values.
let isJumping = false;
let jumpSpeed = 0;
let maxJumpSpeed = 16;

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

        // Up key pressed and have a up speed?
        if (keys["up"] && !isJumping) // Yes.
        {
            jumpSpeed += 2;

            // ToDo: Player color by jump speed.

            if (jumpSpeed >= maxJumpSpeed)
            {
                isJumping = true;
            }
        }
        else if (isJumping || !keys["up"] && jumpSpeed > 0)
        {
            this.speed.y = -jumpSpeed;
            jumpSpeed = 0;
            isJumping = false;
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