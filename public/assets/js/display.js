//Dynamically generates the processing visualization
function createDisplay(creator, name, type, data) {
    $("#processing-display-area").empty();
    if (parseInt(type)===1) {
        //Need to prep data for processing program:;
        var wordList = data.split(" ");
        for (var i=0;i<wordList.length;i++){
            wordList[i] = wordList[i].toLowerCase();
        }
        console.log(wordList);
        var words =[];
        var count =[];
        //Counts number of times each word appears, store each word in words[], their count in the respective index in count[]
        for (var i=0;i<wordList.length;i++) {
            //first check if words[] already has the word
            if (checkRepeated(wordList[i], words)) {//if word is found more than once
                incrementWordCount(words.indexOf(wordList[i]), count);//find index of word in words[], increment value of int with same index in count[]
            }
            else {//if word does not yet exist in words[]
                words.push(wordList[i]);//push word to words[]
                count.push(1);//push value of 1 to count[]
            }
        }
        //Orders the words and their counts in greatest to least
        carlSort(words, count);
        console.log(words);
        console.log(count);

        //Need to alter words and count so that it can be inserted as strings with the appropriate syntax when parsed
        var wordsString = "{";
        for (var i=0;i<words.length;i++) {
            wordsString+='"';
            wordsString+=words[i];
            wordsString+='"';
            if (i!=words.length-1) {
                wordsString+=",";
            }
        }
        wordsString+="}";
        count = "{"+count.toString()+"}";
        console.log(wordsString);
        console.log(count);
        var vizTypeString = "Text Flow";
        //Now we can generate our processing script with the arrays as inputs
        runProcessing(wordsString, count, name, creator, vizTypeString);
    }
}

function runProcessing(wordString, countString, vizName, vizCreator, vizType) {
    var label = "<h4>"+vizName+" by "+vizCreator+" via "+vizType+"</h4><br>";
    var scriptStart = "<script type='application/processing' data-processing-target='visualization'>";
    var scriptEnd = "</script>";
    var canvas = "<canvas id='visualization'></canvas>";
    var processingProgram =

        'String[] words = '+wordString+';\n' +
        'int[] counts = '+countString+';\n' +
        'Word[] graphics = new Word[counts.length];\n' +
        'PFont myFont;\n' +
        'int maxSize=counts.length*10;\n' +
        'int totalCounts=0;\n' +
        'int sizeDiff=0;\n' +

        'void setup() {\n' +
            'size(500,300);\n' +
            'colorMode(RGB, 255);\n' +
            'background(0);\n' +
            'initializeGraphics();\n' +
            'adjustPositions();\n' +
            'noLoop();\n' +
        '}\n' +

        'void draw() {\n' +
            'for (int i=0;i < graphics.length;i++){\n' +
            'graphics[i].drawGraphic();\n' +
            'image(graphics[i].graphic, 0,0);\n' +
            '}\n' +
        '}\n' +

        'void initializeGraphics() {\n' +
            'myFont = createFont("Impact", 50 );\n' +
            'for (int i=0;i < counts.length;i++){\n' +
                'totalCounts+=counts[i];\n' +
            '}\n' +
            'sizeDiff=maxSize/totalCounts;\n' +
            'for (int i = 0; i < counts.length; i++) {\n' +
                'graphics[i] = new Word(words[i], sizeDiff*counts[i],width/2, 3*height/4, 255);\n' +
            '}\n' +
        '}\n' +

        'void adjustPositions() {\n' +
            'for (int i=0;i < counts.length-1;i++){\n' +
                'Word currWord = graphics[i];\n' +
                'Word nextWord = graphics[i+1];\n' +
                'if (nextWord.ypos+nextWord.wordheight/2 >= currWord.ypos-currWord.wordheight/2) {\n' +
                    'nextWord.ypos = currWord.ypos-currWord.wordheight/2-nextWord.wordheight/2;\n' +
                '}\n' +
            '}\n' +
        '}\n' +

        'class Word {\n' +
            'String wordString;\n' +
            'PGraphics graphic;\n' +
            'int wordlength;\n' +
            'int wordheight;\n' +
            'int tsize;\n' +
            'int xpos;\n' +
            'int ypos;\n' +
            'int fillcol;\n' +
            '\n' +

            'Word(String w, int t, int x, int y, int f) {\n' +
                'wordString = w;\n' +
                'tsize = t;\n' +
                'wordlength = tsize*wordString.length();\n' +
                'wordheight = tsize;\n' +
                'xpos = x;\n' +
                'ypos = y;\n' +
                'fillcol = f;\n' +
                'graphic = createGraphics(width, height, JAVA2D);\n' +
            '}\n' +

            'void drawGraphic() {\n' +
                'graphic.beginDraw();\n' +
                'graphic.smooth();\n' +
                'graphic.fill(fillcol);\n' +
                'graphic.textAlign(CENTER, CENTER);\n' +
                'graphic.textFont(myFont, tsize);\n' +
                'graphic.text(wordString, xpos, ypos);\n' +
                'graphic.endDraw();\n' +
            '}\n' +
        '}';

    $("#processing-display-area").append(label+scriptStart+processingProgram+scriptEnd+canvas);
}

function carlSort(wordArray, countArray) {
    var finished = true;
    for (var i=0;i<countArray.length-1;i++) {
        if (countArray[i]<countArray[i+1]) {
            var currCount = countArray[i];
            var nextCount = countArray[i+1];
            countArray[i+1] = currCount;
            countArray[i] = nextCount;
            var currWord = wordArray[i];
            var nextWord = wordArray[i+1];
            wordArray[i+1] = currWord;
            wordArray[i] = nextWord;
            finished = false;
        }
    }
    if (finished === false) {
        carlSort(wordArray, countArray);
    }
}

function incrementWordCount(index, array) {
    array[index]++;
}

function checkRepeated(word, array) {
    var found = false;
    for (var i=0;i<array.length;i++) {
        if (array[i]===word) {
            found = true;
            break;
        }
    }
    return found;
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