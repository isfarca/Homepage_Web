// Memory item values list.
let memoryArray =
    [
        "C", "C",
        "C++", "C++",
        "C#", "C#",
        "HTML5", "HTML5",
        "JS", "JS",
        "CSS", "CSS",
        "PHP", "PHP",
        "Deutsch", "Deutsch",
        "Dart", "Dart",
        "Englisch", "Englisch",
        "Türkisch", "Türkisch",
        "Java", "Java"
    ];

// Handling current clicked memory cards.
let memoryValues = [];
let memoryTileIds = [];
let flippedTiles = 0;

// Background image by closing.
let tileBackgroundImage = "url(images/background.png) no-repeat";

// Randomize memory cards.
Array.prototype.ShuffleTile = function()
{
    let i = this.length, j, temp;
    while (i-- > 0)
    {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

// Generate new memory game board.
function NewBoard()
{
    // Set default values.
    flippedTiles = 0;
    let output = "";
    memoryArray.ShuffleTile();

    // Set onclick event for all memory cards.
    for (let i = 0; i < memoryArray.length; i++)
    {
        output += '<div id="tile_'+ i +'" onclick="FlipTile(this, \'' + memoryArray[i] + '\')"></div>';
    }

    // Output memory cards.
    document.getElementById("memoryBoard").innerHTML = output;
}

// Open / Close memory card.
function FlipTile(tile, value)
{
    if (memoryValues.length < 2 && tile.innerHTML === "")
    {
        // Open memory card.
        tile.style.background = "#FFFFFF";
        tile.innerHTML = '<p>' + value + '</p>';

        if (memoryValues.length === 0) // Open first memory card.
        {
            // Set memory item value for checking.
            memoryValues.push(value);
            memoryTileIds.push(tile.id);
        }
        else if (memoryValues.length === 1) // Open second memory card.
        {
            // Set memory item value for checking.
            memoryValues.push(value);
            memoryTileIds.push(tile.id);

            if (memoryValues[0] === memoryValues[1]) // Memory cards match.
            {
                // Add the number of open memory cards.
                flippedTiles += 2;

                // Clear both arrays.
                memoryValues = [];
                memoryTileIds = [];

                // Opened all memory cards, than generate a new game board.
                setTimeout(function()
                {
                    // Check to see if the whole board is cleared.
                    if (flippedTiles === memoryArray.length)
                    {
                        alert("Memory erfolgreich gelöst. Neues Feld wird erstellt!");
                        document.getElementById("memoryBoard").innerHTML = "";
                        NewBoard();
                    }
                }, 1000);
            }
            else // Memory doesn't match.
            {
                // Flip memory cards back.
                function FlipToBack()
                {
                    // Flip the 2 tiles back over.
                    let tile1 = document.getElementById(memoryTileIds[0]);
                    let tile2 = document.getElementById(memoryTileIds[1]);
                    tile1.style.background = tileBackgroundImage;
                    tile1.innerHTML = "";
                    tile2.style.background = tileBackgroundImage;
                    tile2.innerHTML = "";

                    // Clear both arrays
                    memoryValues = [];
                    memoryTileIds = [];
                }
                setTimeout(FlipToBack, 700);
            }
        }
    }
}