// Once the page is finished loading.
$(document).ready(function()
{
    // The bars icon is clicked?
    $(".fa-bars").on("click", function()
    {
        // Open or Close menu bar.
        $("header nav ul").toggleClass("open");
    });
});