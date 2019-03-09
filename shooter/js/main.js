// Instantiate.
let canvas;
let	canvasRenderingContext;
let	width;
let	height;

// Initialize.
function init()
{
	// Get canvas.
	canvas = document.getElementById("canvas");

	// Set canvas size.
	width = canvas.width;
	height = canvas.height;

	// Set dimension.
	canvasRenderingContext = canvas.getContext('2d');

	// Initialize keys.
	window.onkeydown = keyLogger.keyDownListener;
	window.onkeyup = keyLogger.keyUpListener;
	
	// Initialize player.
	player.x = width / 2;
	player.y = height / 2;
	
	// Main game loop.
	setInterval(function()
	{
		updateGame(0.01);
		renderGame();
	},10);
}

// Update game play / conditions / game logic per frame.
function updateGame(delta)
{
	bullets.update(delta);
	targets.update(delta);
	player.update(delta);
}

// Output game per frame.
function renderGame()
{
	// Background.
	renderBackground();

	// Game content.
	player.render(canvasRenderingContext);
	bullets.render(canvasRenderingContext);
	targets.render(canvasRenderingContext);
}

// Output background.
function renderBackground()
{
	// White level.
	canvasRenderingContext.fillStyle = "#c6c6c6";

	// Set game screen.
	canvasRenderingContext.fillRect(0, 0, width, height);
}