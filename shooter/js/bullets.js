// Instantiate bullets.
let bullets = new Bullets();

// 'Bullets' class.
function Bullets()
{
	// Default values.
	this.objects = [];
	this.maxID = 0;

	// Initialize.
	this.init = function(bullet)
	{
		// Velocity of bullets.
		bullet.vx = bullet.v * Math.cos(bullet.angle);
		bullet.vy = bullet.v * Math.sin(bullet.angle);
	};

	// Set bullets.
	this.push = function(bullet)
	{
		// First of all, initialize bullet.
		this.init(bullet);

		// Search empty space.
		let id = 0;
		for (;;)
		{
			if (this.objects[++id] !== undefined)
			{
				id++;
			}
			else
			{
				break;
			}
		}
		this.objects[id] = bullet;

		// Set the amount of bullets by id.
		if (id > this.maxID)
		{
			this.maxID = id;
		}
	};

	// Calling per frame.
	this.update = function(delta)
	{
		// Go through all bullets.
		for (let i = 0; i <= this.maxID; i++)
		{
			// If the bullet is no available, then continue the search.
			if (this.objects[i] === undefined)
			{
				continue;
			}

			// Refresh the positions of bullets.
			let object = this.objects[i];
			object.x += object.vx * delta;
			object.y += object.vy * delta;

			// Detect if on screen.
			if (object.x < 0 || object.y < 0 || object.x > width || object.y > height || object.remove)
			{
				// Delete current bullet.
				delete this.objects[i];
			}
		}
	};

	// Render playable field.
	this.render = function(canvasRenderingContext)
	{
		// White background.
		canvasRenderingContext.fillStyle = "#000000";

		// Go through all bullets.
		for (let i = 0; i < this.maxID; i++)
		{
			// If the bullet is no available, then continue the search.
			if (this.objects[i] === undefined)
			{
				continue;
			}

			// Render / Fill the bullet.
			let object = this.objects[i];
			canvasRenderingContext.beginPath();
			canvasRenderingContext.arc(object.x, object.y, 2, 0, 6.28);
			canvasRenderingContext.fill();
		}
	};

	// Get the minimum distance of between target and bullet.
	this.getMinimumDistanceInfo = function(targetObject)
	{
		// Set the maximum distance.
		let distance = 99999;

		// Current bullet object.
		let object;

		// Go through all bullets.
		for (let i = 0; i <= this.maxID; i++)
		{
			// If the bullet is no available, then continue the search.
			if (this.objects[i] === undefined)
			{
				continue;
			}

			// Get the current distance of between target and bullet.
			let currentDistance = Math.sqrt
			(
				(targetObject.x - this.objects[i].x)*(targetObject.x - this.objects[i].x) +
				(targetObject.y - this.objects[i].y)*(targetObject.y - this.objects[i].y)
			);

			// Check is the distance correctly.
			if (currentDistance < distance)
			{
				distance = currentDistance;
				object = this.objects[i];
			}
		}

		// Return multiple values.
		return {distance:distance, object:object};
	};
}