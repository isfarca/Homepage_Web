// Instantiate.
let player = new Player();

// 'Player' class.
function Player()
{
	// Default values.
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.v = 0;
	this.angle = 0;
	this.lastShootTime = 0;
	
	this.stats = {maxVelocity:100, rotation:0.03, acceleration:10, shootDelayMs:100};

	// Calling per frame.
	this.update = function(delta)
	{
		// Movement.
		if (keyLogger.KeyStatus.Up) // Up.
		{
			this.v += this.stats.acceleration;

			if (this.v > this.stats.maxVelocity)
			{
				this.v = this.stats.maxVelocity;
			}
		}
		if (keyLogger.KeyStatus.Down) // Down.
		{
			this.v -= this.stats.acceleration;

			if (this.v < -this.stats.maxVelocity)
			{
				this.v = -this.stats.maxVelocity;
			}
		}

		// Rotation.
		if (keyLogger.KeyStatus.Left) // Left.
		{
			this.angle -= this.stats.rotation;

			if (this.angle < 0)
			{
				this.angle += 2 * Math.PI;
			}
		}
		if (keyLogger.KeyStatus.Right) // Right.
		{
			this.angle += this.stats.rotation;

			if (this.angle > 2 * Math.PI)
			{
				this.angle -= 2 * Math.PI;
			}
		}

		// Fall of speed.
		if (!(keyLogger.KeyStatus.Up || keyLogger.KeyStatus.Down))
		{
			this.v *= 0.99;
		}

		// Set velocity.
		this.vx = this.v * Math.cos(this.angle);
		this.vy = this.v * Math.sin(this.angle);

		// Set position.
		this.x += this.vx * delta;
		this.y += this.vy * delta;

		// Shoot.
		let time = utilities.getTime();
		if (keyLogger.KeyStatus.Fire && time - this.lastShootTime >= this.stats.shootDelayMs)
		{
			bullets.push({x:this.x, y:this.y, angle:this.angle, v:250});
			this.lastShootTime = time;
		}
	};

	// Output.
	this.render = function(canvasRenderingContext)
	{
		// Player logo.
		let image = new Image();
		image.src = "images/player/Linux_Logo.png";
		let size = 50;
		canvasRenderingContext.drawImage(image, this.x - (size / 2), this.y - (size / 2), size, size);

		// Orientation line.
		canvasRenderingContext.strokeStyle = "#FF0000";
		canvasRenderingContext.beginPath();
		canvasRenderingContext.moveTo(this.x, this.y);
		let pointerLength = 25;
		canvasRenderingContext.lineTo(this.x + pointerLength * Math.cos(this.angle), this.y + pointerLength *
			Math.sin(this.angle));
		canvasRenderingContext.stroke();
	};
}