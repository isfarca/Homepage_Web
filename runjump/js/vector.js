// Vector construct.
function Vector(x, y)
{
    this.x = x;
    this.y = y;
}

// Addition other coordinates to current vector position data.
Vector.prototype.plus = function(other)
{
    return new Vector(this.x + other.x, this.y + other.y);
};

// Scale vector object.
Vector.prototype.times = function(scale)
{
    return new Vector(this.x * scale, this.y * scale);
};