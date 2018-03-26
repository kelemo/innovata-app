//Dynamically generates the processing-display appropriate to the viz-card that was pressed.
function createDisplay(creator, name, type, data) {
    $("#processing-display-area").empty();
    if (parseInt(type)===1) {
        //TODO: append a processing script containing the appropriate program according to vizType, sandwiching the vizData as input
        $("#processing-display-area").append("<h4>"+name+" by "+creator+"</h4><br><canvas data-processing-sources='processing/eternity.pde'></canvas>");
    }
}

//Retrieves info from the viz-card that was clicked, and creates a display on display.html
$.get("/api/display", function(data) {
    createDisplay(data.creator, data.name, data.type, data.data);
});

//Img swap on hover.
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
});