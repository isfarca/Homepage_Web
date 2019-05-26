// Codes for control.
let controlCodes =
{
    // Arrows.
    ArrowLeft : "left",
    ArrowUp : "up",
    ArrowRight : "right",

    // Letters.
    KeyA : "left",
    KeyW : "up",
    KeyD : "right"
};

// Key status.
function trackKeys(codes)
{
    // Create zero pressed keys.
    let pressed = Object.create(null);

    // Handle key events.
    function handler(event)
    {
        // Have the pressed key a defined property?
        if (codes.hasOwnProperty(event.code)) // Yes.
        {
            // Change true boolean by current pressed code.
            pressed[codes[event.code]] = event.type === "keydown";

            // Default act by event release prevent.
            event.preventDefault();
        }
    }

    // Add listeners.
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);

    return pressed;
}