//Creates a ".viz-card" html element for each item in the array input.
function setVizCards(listViz) {
    var vizCardArea = $("#viz-card-area");
    for (i=0;i<listViz.length;i++) {
        vizCardArea.append("<div class='col s2'><div class='card'><div onclick='displayViz(this)' class='card-image viz-card' viz-creator="+listViz[i].viz_creator+" viz-name="+listViz[i].viz_name+" viz-type="+listViz[i].viz_type+" viz-data="+listViz[i].viz_data+"><a href='/display'><img class='viz-card-img z-depth-3 responsive-img' width='100' height='100' src='images/innovata-logo-outline.png' data-alt-src='images/innovata-logo-filled.png'></a></div></div></div>");
    }
}

//Gets all Vizs from our database, and creates a viz-card for each one.
$.get("/api/gallery", function(data) {
    setVizCards(data);
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

//Viz-card expands on hover, showing more info.
var expandCard = function() {
    var $this = $(this);
    var cardContainer = $this;
    var vizName = cardContainer.attr("viz-name");
    var vizCreator = cardContainer.attr("viz-creator");
    cardContainer.append("<div id='card-expanded' class='card-content green accent-2'><p class='white-text'>"+vizName+"\n by "+vizCreator+"</p></div>");
    document.getElementById("card-expanded").style.display = "block";
    //TODO: allow expanded viz-card info to rest "above" other divs, and fit text better
};
//Viz-card minimizes on un-hover, showing less info.
var minimizeCard = function() {
    $(".card-content").remove();
};

//Takes certain attributes of the viz-card that was clicked, stores them in an object, and posts it.
function displayViz(obj) {

    var vizCreator = $(obj).attr("viz-creator");
    var vizName = $(obj).attr("viz-name");
    var vizType = $(obj).attr("viz-type");
    var vizData = $(obj).attr("viz-data");

    var vizDisplay = {
        creator: vizCreator,
        name: vizName,
        type: vizType,
        data: vizData
    };

    $.ajax("/api/display", {
        type: "POST",
        data: vizDisplay
    });
}

$(function () {
    $("#logo-img").hover(sourceSwap, sourceSwap);
    $("#logo-img").mouseenter(expandLogo);
    $("#logo-space").mouseleave(minimizeLogo);
    $(".viz-card").mouseenter(expandCard);
    $(".viz-card").mouseleave(minimizeCard);
    $(".viz-card-img").hover(sourceSwap);
});