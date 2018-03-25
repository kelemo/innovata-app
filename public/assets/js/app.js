//Img swap on hover.
var sourceSwap = function () {
    var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
};
//Logo space expands to show more info
var expandLogo = function() {
    $("#logo-space").append("<div id='logo-overlay' style='position:fixed;display:none;width:600px;height:300px;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:2'><div id='overlay-content' class='green-text text-accent-2'><h3 align='center'>Innovata</h3><p align='center'>Open source project committed to finding new ways to visualize data.</p><a class='green-text text-accent-2' target='_blank' href='https://github.com/dylankuntz/innovata'><p align='center'><u>View Github Repo</u></p></a></div></div>");
    document.getElementById("logo-overlay").style.display = "block";
};
//Logo space minimizes to show less info
var minimizeLogo = function() {
    $("#logo-overlay").remove();
};

//Viz-card expands on hover, showing more info.
var expandCard = function() {
    var $this = $(this);
    var cardContainer = $this;
    var vizName = cardContainer.attr("viz-name");
    var vizCreator = cardContainer.attr("viz-creator");
    cardContainer.append("<div id='card-expanded' class='card-content green accent-2'><p class='white-text'>"+vizName+"\n by "+vizCreator+"</p></div>");
    document.getElementById("card-expanded").style.display = "block";
    // cardContainer.append("<div id='card-expanded' class='viz-card-content green accent-2' style='position:absolute;width:100px;height:100px;z-index:2;display:none;'><p class='white-text'>"+vizName+"\n by "+vizCreator+"</p></div>");
    // document.getElementById("card-expanded").style.display = "block";
};
//Viz-card minimizes on un-hover, showing less info.
var minimizeCard = function() {
    $(".card-content").remove();
};

//Displays Viz on display.html
var displayViz = function() {
    var $this = $(this);
    var cardContainer = $this.parent().parent();

    var vizCreator = cardContainer.attr("viz-creator");
    var vizName = cardContainer.attr("viz-name");
    var vizType = cardContainer.attr("viz-type");
    var vizData = cardContainer.attr("viz-data");

    $("#processing-display-area").empty();
    //TODO: append a processing script containing the appropriate program according to vizType, sandwiching the vizData as input
    $("#processing-display-area").append("<p>"+vizName+" by "+vizCreator+"</p><br><canvas data-processing-sources='processing/eternity.pde'></canvas>");
    console.log("viz displayed");
};

$(function () {
    $("#logo-img").hover(sourceSwap, sourceSwap);
    $("#logo-img").mouseenter(expandLogo);
    $("#logo-space").mouseleave(minimizeLogo);
    $(".viz-card").mouseenter(expandCard);
    $(".viz-card").mouseleave(minimizeCard);
    $(".viz-card-img").hover(sourceSwap);
    $(".viz-card-img").click(displayViz); //this isnt working
});

//TODO: Write function called "setVizCards" that will -> for each Viz in our db, creates the following html element with the appropriate Viz data stored, and appends to the $("#viz-card-area") in the index.html. You'll need to make a <div class="row" id="first-row"> to start it off.
