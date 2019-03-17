// Instantiate.
let targets = new Targets();

// 'Targets' class.
function Targets()
{
	// Image sources.
	let imageSources =
	[
		"images/targets/Mac_OS_Logo.png",
		"images/targets/Windows_10_Logo.png"
	];

	// Default values.
	this.objects = [];
	this.maxID = 0;

	// Initialize.
	this.init = function(target)
	{
		// Velocity.
		target.vx = target.v * Math.cos(target.angle);
		target.vy = target.v * Math.sin(target.angle);

		// Animation time by hit.
		target.hitAnimClock = -1;

		// Scale.
		target.scale = 1;

		// Alpha.
		target.alpha = 0;
		target.nextAlpha = 1;
	};

	// Set targets.
	this.push = function(target)
	{
		// Initialize target.
		this.init(target);

		// Search empty space.
		let i = 0;
		for (;;)
		{
			if (this.objects[++i] !== undefined)
			{
				i++;
			}
			else
			{
				break;
			}
		}
		this.objects[i] = target;

		// Set the amount of targets by id.
		if (this.maxID < i)
		{
			this.maxID = i;
		}
	};

	// Get the number of targets.
	this.getAmount = function()
	{
		let number = 0;
		for (let i = 0; i < this.maxID; i++)
		{
			if (this.objects[i] === undefined)
			{
				continue;
			}
			number++;
		}

		return number;
	};

	// Calling per frame.
	this.update = function(delta)
	{
		// Go through all the targets.
		for (let i = 0; i < this.maxID; i++)
		{
			// If the targets is no available, then continue the search.
			if (this.objects[i] === undefined)
			{
				continue;
			}

			// Set velocity.
			let object = this.objects[i];
			object.x += object.vx * delta;
			object.y += object.vy * delta;

			// Animation by hitting.
			if (object.alpha !== object.nextAlpha)
			{
				object.alpha += (object.nextAlpha - object.alpha) / 10;
			}
			if (object.alpha > 0.1)
			{
				let info = bullets.getMinimumDistanceInfo(object);
				
				if(info.distance <= object.size * object.scale)
				{
					info.object.remove = true;

					if(object.hitAnimClock === -1)
					{
						object.hitAnimClock = 0;
					}
				}
			}
			if (object.hitAnimClock !== -1)
			{
				object.hitAnimClock += delta;

				if (object.hitAnimClock >= 1)
				{
					delete this.objects[i];

					continue;
				}
			}
			
			// Detect if on screen.
			if (object.x < 0 || object.y < 0 || object.x > width || object.y > height)
			{
				delete this.objects[i];
			}
		}

		// Is the amount of targets under ten.
		if (this.getAmount() < 10) // Yes.
		{
			// Spawn new target.
			this.push
			({
				x:Math.random() * width,
				y:Math.random() * height,
				v:5,
				angle:Math.random() * 2 * Math.PI,
				size:50,
				src:imageSources[Math.floor(Math.random() * (imageSources.length + 1))]
			});
		}
	};

	// Output.
	this.render = function(canvasRenderingContext)
	{
		// Go through all the targets.
		for (let i = 0; i < this.maxID; i++)
		{
			// If the targets is no available, then continue the search.
			if (this.objects[i] === undefined)
			{
				continue;
			}

			// Set current object.
			let object = this.objects[i];

			// Set default scale of current object.
			object.scale = 1;

			// Animation.
			if (object.hitAnimClock !== -1)
			{
				object.alpha = 1 - object.hitAnimClock * 1.5;

				if (object.alpha < 0)
				{
					object.alpha = 0;
				}

				object.size = 50 + 20 * object.hitAnimClock;
				object.nextAlpha = object.alpha;
			}

			// Target images.
			let image = new Image();
			image.src = object.src;
			canvasRenderingContext.globalAlpha = object.alpha;
			canvasRenderingContext.drawImage(image, object.x, object.y, object.size, object.size);
			canvasRenderingContext.globalAlpha = 1;
		}
	};
}