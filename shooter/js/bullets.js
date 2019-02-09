let bullets = new Bullets();

function Bullets()
{
	this.objects = [];
	this.maxID = 0;
	
	this.init = function(bullet)
	{
		bullet.vx = bullet.v * Math.cos(bullet.angle);
		bullet.vy = bullet.v * Math.sin(bullet.angle);
	};

	this.push = function(bullet)
	{
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

		if (id > this.maxID)
		{
			this.maxID = id;
		}
	};
	
	this.update = function(dt)
	{
		for (let i = 0; i <= this.maxID; i++)
		{
			if (this.objects[i] === undefined)
			{
				continue;
			}
			
			let obj = this.objects[i];
			
			obj.x += obj.vx * dt;
			obj.y += obj.vy * dt;

			// Detect if on screen.
			if (obj.x < 0 || obj.y < 0 || obj.x > width || obj.y > height || obj.remove)
			{
				delete this.objects[i];
			}
		}
	};
	
	this.render = function(ctx)
	{
		ctx.fillStyle = "#000000";

		for(let i = 0;i < this.maxID;i++)
		{
			if(this.objects[i] === undefined)
			{
				continue;
			}
			
			let obj = this.objects[i];

			ctx.beginPath();
			ctx.arc(obj.x,obj.y,2,0,6.28);
			ctx.fill();
		}
	};

	this.getMinInfo = function(o)
	{
		let dist = 99999;
		let obj;

		for (let i = 0; i <= this.maxID; i++)
		{
			if (this.objects[i] === undefined)
			{
				continue;
			}

			let d = Math.sqrt
			(
				(o.x - this.objects[i].x)*(o.x - this.objects[i].x) +
				(o.y - this.objects[i].y)*(o.y - this.objects[i].y)
			);

			if (d < dist)
			{
				dist = d;
				obj = this.objects[i];
			}
		}
		return {dist:dist,object:obj};
	};
}