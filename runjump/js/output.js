// Display constructor.
function DOMDisplay(parent, level)
{
    // Define game window and level.
    this.wrap = parent.appendChild(element("div", "game"));
    this.level = level;

    // Add background and start drawing frame.
    this.wrap.appendChild(this.drawBackground());
    this.actorLayer = null;
    this.drawFrame();
}

// Default scale value.
let scale = 15;

// Draw background.
DOMDisplay.prototype.drawBackground = function()
{
    // Define table.
    let table = element("table", "background");
    table.style.width = this.level.width * scale + "px";
    table.style.height = this.level.height * scale + "px";

    // Define grid.
    this.level.grid.forEach(function(row)
    {
        let rowElement = table.appendChild(element("tr"));
        rowElement.style.height = scale + "px";

        row.forEach(function(type)
        {
            rowElement.appendChild(element("td", type));
        });
    });

    // Return complete game level as table.
    return table;
};

// Draw actors.
DOMDisplay.prototype.drawActors = function()
{
    // Define container.
    let wrap = element("div");

    // Define actors.
    this.level.actors.forEach(function(actor)
    {
        let rect = wrap.appendChild(element("div", "actor " + actor.type));

        rect.style.width = actor.size.x * scale + "px";
        rect.style.height = actor.size.y * scale + "px";
        rect.style.left = actor.position.x * scale + "px";
        rect.style.top = actor.position.y * scale + "px";
    });

    // Return all actors as container.
    return wrap;
};

// Draw frame.
DOMDisplay.prototype.drawFrame = function()
{
    // Remove actor layer, when it has instance.
    if (this.actorLayer)
    {
        this.wrap.removeChild(this.actorLayer);
    }

    // Add actor layer.
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = "game " + (this.level.status || "");

    // Player hold in the field of view.
    this.scrollPlayerIntoView();
};

// Player in the field of view handling.
DOMDisplay.prototype.scrollPlayerIntoView = function()
{
    // Window.
    let width = this.wrap.clientWidth;
    let height = this.wrap.clientHeight;
    let margin = width / 3;

    // Viewport.
    let left = this.wrap.scrollLeft, right = left + width;
    let top = this.wrap.scrollTop, bottom = top + height;

    // Player position.
    let player = this.level.player;
    let center = player.position.plus(player.size.times(0.5)).times(scale);

    // Scroll window, when a player is out of sight.
    if (center.x < left + margin)
    {
        this.wrap.scrollLeft = center.x - margin;
    }
    else if (center.x > right - margin)
    {
        this.wrap.scrollLeft = center.x + margin - width;
    }

    if (center.y < top + margin)
    {
        this.wrap.scrollTop = center.y - margin;
    }
    else if (center.y > bottom - margin)
    {
        this.wrap.scrollTop = center.y + margin - height;
    }
};

// Clear display.
DOMDisplay.prototype.clear = function()
{
    this.wrap.parentNode.removeChild(this.wrap);
};