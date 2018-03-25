//Traces shapes as they are in motion producing geometric art.
//Created by Carl Liu 2/20/18

float angle;
int a = 100;
float c1 = 255;
float c2 = 255;
float c3 = 255;

void setup() {
    background(236,239,241);
  size(600, 400);
  colorMode(RGB, 100);
  noFill();
}

void draw() {
  //background(0);
  for (int i=0;i<4;i++){
    float r = a*cos(radians(angle));
    if (i==1){
      r = a*sin(radians(angle));
    }
    if (i==2){
      r = -a*cos(radians(angle));
    }
    if (i==3){
      r = -a*sin(radians(angle));
    }
    float x = r*cos(radians(angle)) + width/2;
    float y = r*sin(radians(angle)) + height/2;
    ellipse(x,y,r,r);
  }
  if (c1 < -50) {
    c1 = 255;
    c2 -= 5;
  }
  if (c2 < -50) {
    c2 = 255;
    c3 -= 5;
  }
  if (c3 < -50) {
    c3 = 255;
  }
  c1-=5;
  stroke(c1, c2, c3);
  angle+=2;
}