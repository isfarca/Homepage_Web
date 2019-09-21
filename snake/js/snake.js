// Canvas.
let canvas;
let canvasRenderingContext;

// Pressed key(s).
let directionKey;
let actualKey;

// Create the unit.
let box;

// Ground image.
let groundImage;

// Food.
let foods;
let maxFoodsOnField;
let foodsOnField;

// Create the snake.
let snake;

// Create the score.
let score;

// Skipped frames for tail.
let skippedFrames;
let amountOfSkippedFrames;

// Initialize variables.
init();

// Initializing.
function init()
{
    // Canvas.
    canvas = document.getElementById("canvas");
    canvasRenderingContext = canvas.getContext("2d");

    // Direction for keys.
    directionKey =
    {
        UP : 1,
        DOWN : 2,
        LEFT : 3,
        RIGHT : 4
    };

    // Unit.
    box = 32;

    // Ground.
    groundImage = new Image();
    groundImage.src = "images/ground.png";

    // Foods.
    foods =
    [
        ["images/foods/windows.png", -1],
        ["images/foods/linux.png", 1]
    ];

    // Max foods on game.
    maxFoodsOnField = 5;

    // Snake.
    snake = [];
    snake[0] =
    {
        x : 9 * box,
        y : 10 * box
    };

    // Score.
    score = 0;

    // Skipped frames for tail.
    skippedFrames = 0;
    amountOfSkippedFrames = 0;

    // Create foods.
    foodsOnField = [];
    for (let i = 0; i < maxFoodsOnField; i++)
    {
        // Spawn food.
        createFood(i);
    }
}

// Key logic.
document.addEventListener("keydown", keyDirection);
function keyDirection(event)
{
    // Set event handler for keys.
    let key = event.code ? event.code : event.which;

    // Get the pressed down key.
    switch (key)
    {
        // Up.
        case "KeyW":
        case "ArrowUp":
            actualKey = directionKey.UP;
            break;

        // Down.
        case "KeyS":
        case "ArrowDown":
            actualKey = directionKey.DOWN;
            break;

        // Left.
        case "KeyA":
        case "ArrowLeft":
            actualKey = directionKey.LEFT;
            break;

        // Right.
        case "KeyD":
        case "ArrowRight":
            actualKey = directionKey.RIGHT;
            break;
    }
}

// Check collision.
function collision(head, array)
{
    for (let i = 0; i < array.length; i++)
    {
        if (head.x === array[i].x && head.y === array[i].y)
        {
            return true;
        }
    }

    return false;
}

// Draw everything.
function draw()
{
    // Ground.
    canvasRenderingContext.drawImage(groundImage, 0, 0);

    // Snake.
    for (let i = 0; i < snake.length; i++)
    {
        // Snake complete.
        canvasRenderingContext.fillStyle = (i === 0) ? "green" : "white";
        canvasRenderingContext.fillRect(snake[i].x, snake[i].y, box, box);

        // Border.
        canvasRenderingContext.strokeStyle = "red";
        canvasRenderingContext.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    // Old head position.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // Which direction?
    if (actualKey === directionKey.UP) // Up.
    {
        snakeY -= box;
    }
    if (actualKey === directionKey.DOWN) // Down.
    {
        snakeY += box;
    }
    if (actualKey === directionKey.LEFT) // Left.
    {
        snakeX -= box;
    }
    if (actualKey === directionKey.RIGHT) // Right.
    {
        snakeX += box;
    }

    // Food.
    for (let i = 0; i < maxFoodsOnField; i++)
    {
        // Output food.
        let currentFoodImage = new Image();
        currentFoodImage.src = foodsOnField[i].src;
        canvasRenderingContext.drawImage(currentFoodImage, foodsOnField[i].x, foodsOnField[i].y);

        // If the snake eats the food.
        if (snakeX === foodsOnField[i].x && snakeY === foodsOnField[i].y)
        {
            // Set amount of skipped frames.
            amountOfSkippedFrames = foodsOnField[i].value;

            // Is skipped frames grater than amount of skipped frames?
            if (skippedFrames > amountOfSkippedFrames) // Yes.
            {
                // Remove tails.
                for (let i = 0; i > amountOfSkippedFrames; i--)
                {
                    snake.pop();
                }

                // Set default.
                skippedFrames = amountOfSkippedFrames = 0;
            }

            // Increment score.
            score += foodsOnField[i].value;

            // Spawn food.
            createFood(i);
        }
    }

    // Remove or not remove the tail.
    if (skippedFrames < amountOfSkippedFrames) // Not remove.
    {
        // Increment skipped frames.
        skippedFrames++;
    }
    else // remove.
    {
        // Set default.
        skippedFrames = amountOfSkippedFrames = 0;

        // Remove tail.
        snake.pop();
    }
    
    // Add the new head.
    let newHead =
    {
        x : snakeX,
        y : snakeY
    };
    
    // Game over.
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake) ||
        score < 0)
    {
        clearInterval(game);
    }

    // Unshift new head.
    snake.unshift(newHead);

    // Display.
    canvasRenderingContext.fillStyle = "white";
    canvasRenderingContext.font = "45px Changa one";
    canvasRenderingContext.fillText(score,2 * box,1.6 * box);
}

// Call draw function every 100ms.
let game = setInterval(draw, 100);

// Spawn food.
function createFood(index)
{
    // Random food.
    let randomPick = Math.floor(Math.random() * foods.length);

    // Set food information.
    foodsOnField[index] =
    {
        src : foods[randomPick][0],
        value : foods[randomPick][1],
        x : Math.floor(Math.random() * 17 + 1) * box,
        y : Math.floor(Math.random() * 15 + 3) * box
    };
}