$(document).ready(function() {
    // Initializes drop-down menus
    $('select').material_select();
});

//Logo fills on hover.
var sourceSwap = function () {
    var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
};
//Logo space expands to show more info
var expandLogo = function() {
    $("#logo-space").append("<div id='logo-overlay' style='position:fixed;display:none;width:600px;height:300px;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:2'><div id='overlay-content' class='green-text text-accent-2'><h3 align='center'>innovata</h3><p align='center'>Open source project committed to finding new ways to visualize data.</p><p align='center'><a class='green-text text-accent-2' target='_blank' href='https://github.com/thecarlliu/innovata-app'><u>View Github Repo</u></a></p></div></div>");
    document.getElementById("logo-overlay").style.display = "block";
};
//Logo space minimizes to show less info
var minimizeLogo = function() {
    $("#logo-overlay").remove();
};

$(function () {
    $("#logo-img").hover(sourceSwap, sourceSwap);
    $("#logo-img").mouseenter(expandLogo);
    $("#logo-space").mouseleave(minimizeLogo);

    //When submit button is clicked, takes inputs, stores them in an object, and posts.
    $("#submit-btn").on("click", function(event) {
        event.preventDefault();
        var userInput = $("#viz-user-input");
        var nameInput = $("#viz-name-input");
        var typeInput = $("#viz-type-input");
        var dataInput = $("#viz-data-input");
        var convertedData = dataInput.val().trim();
        convertedData = convertedData.replace(/\b[-.,()&$#!\[\]{}"']+\B|\B[-.,()&$#!\[\]{}"']+\b/g, "");
        convertedData = "'"+convertedData+"'";

        var newViz = {
            viz_creator: userInput.val().trim(),
            viz_name: nameInput.val().trim(),
            viz_type: typeInput.val().trim(),
            viz_data: convertedData
        };

        userInput.val("");
        nameInput.val("");
        typeInput.val("");
        dataInput.val("");

        $.ajax("/api/new", {
            type: "POST",
            data: newViz
        });
    });
});