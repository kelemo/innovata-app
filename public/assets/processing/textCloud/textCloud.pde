//Word Array
String[] words = {"was", "the", "of", "it", "times", "age", "epoch", "season", "It", "best", "worst", "wisdom", "foolishness", "belief", "incredulity", "Light", "Darkness", "spring", "hope"};
//Count Array
int[] counts = {9, 9, 9, 8, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1};
//Graphics Array
Word[] graphics = new Word[counts.length];

PFont myFont;
int maxSize=counts.length*10;
int totalCounts=0;
int sizeDiff=0;

boolean button = false;

void setup() {
    size(500,300);
    colorMode(RGB, 255);
    background(0);
    initializeGraphics();
    adjustPositions();
    noLoop();
}

void draw() {
  if (button==true) {
      textFlow();
      button = false;
    }
  for (int i=0;i<graphics.length;i++){
    graphics[i].drawGraphic();
    image(graphics[i].graphic, 0, 0);
  }
}

void initializeGraphics() {
  myFont = createFont("Impact", 50 );
    for (int i=0;i<counts.length;i++){
      totalCounts+=counts[i];
    }
    sizeDiff=maxSize/totalCounts;
    for (int i = 0; i < counts.length; i++) {
      graphics[i] = new Word(words[i], sizeDiff*counts[i],width/2, height/2, 255);
    }
}

void adjustPositions() {
  for (int i=0;i<counts.length-1;i++){
    Word currWord = graphics[i];
    Word nextWord = graphics[i+1];
    if (nextWord.ypos+nextWord.wordheight/2 >= currWord.ypos-currWord.wordheight/2) {
      nextWord.ypos = currWord.ypos-currWord.wordheight/2-nextWord.wordheight/2;
    }
  }
}

void textFlow() {
  for (int i=0;i<counts.length-1;i++){
    Word currWord = graphics[i];
    Word nextWord = graphics[i+1];
    if (currWord.ypos+currWord.wordheight/2 < height){
      currWord.ypos = currWord.ypos + currWord.wordheight;
    }
    else {
      currWord.graphic.fill(0);
    }
    nextWord.ypos = nextWord.ypos + currWord.wordheight;
  }
}

void mouseClicked() {
  button = true;
}

class Word {
  String wordString;
  PGraphics graphic;
  int wordlength;
  int wordheight;
  int tsize;
  int xpos;
  int ypos;
  int fillcol;
  
  Word(String w, int t, int x, int y, int f) {
    wordString = w;
    tsize = t;
    wordlength = tsize*wordString.length();
    wordheight = tsize;
    xpos = x;
    ypos = y;
    fillcol = f;
    graphic = createGraphics(width, height, JAVA2D);
  }
  
  void drawGraphic() {
    graphic.beginDraw();
    graphic.clear();
    graphic.smooth();
    graphic.fill(fillcol);
    graphic.textAlign(CENTER, CENTER);
    graphic.textFont(myFont, tsize);
    graphic.text(wordString, xpos, ypos);
    graphic.endDraw();
  }
}