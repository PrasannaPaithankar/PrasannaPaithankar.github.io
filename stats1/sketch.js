let n = 1,
  a,
  b,
  c,
  d,
  e;
let c1 = 0;
let c2 = 0;
let ar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var ae = [];

for (k = 0; k < 10; k++) {
  ae[k] = [];

  for (l = 0; l < 10; l++) {
    ae[k][l] = 1;
  }
}

var ae1 = [];
for (k = 0; k < 8; k++) {
  ae1[k] = 0;
}
function setup() {
  createCanvas(windowWidth, windowWidth + 20);
}
function draw() {
  background(255);
  frameRate(60);
  {
    stroke(25, 255, 0);
    strokeWeight(2);
    for (i = 10; i <= windowWidth / 2; i += windowWidth / 20) {
      for (j = 10; j <= windowWidth / 2; j += windowWidth / 20) {
        rect(j, i, windowWidth / 20, windowWidth / 20);
      }
    }

    stroke(0);
    strokeWeight(1);
    a = random(ar);
    b = random(ar);
    c = random(ar);
    d = random(ar);
    if (ae[a][b] != 0) {
      ae[a][b] = ae[a][b] - 1;
      ae[c][d] = ae[c][d] + 1;
      for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
          text(
            ae[i][j],
            10 + i * (windowWidth / 20) + windowWidth / 40,
            10 + j * (windowWidth / 20) + windowWidth / 40
          );
        }
      }
    } else if (ae[a][b] == 0) {
      ae[a][b] = ae[a][b];
      ae[c][d] = ae[c][d];
      for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
          text(
            ae[i][j],
            10 + i * (windowWidth / 20) + windowWidth / 40,
            10 + j * (windowWidth / 20) + windowWidth / 40
          );
        }
      }
    }
  }
  {
    stroke(25, 255, 0);
    strokeWeight(3);
    line(20 + windowWidth / 2, 10, 20 + windowWidth / 2, 10 + windowWidth / 2);
    line(
      20 + windowWidth / 2,
      10 + windowWidth / 2,
      1.9 * (windowWidth / 2),
      10 + windowWidth / 2
    );
  }
  {
    stroke(0);
    strokeWeight(1);
    for (i = 0; i < 8; i++) {
      text(
        i,
        24 + windowWidth / 2 + i * (1.9 / 20) * (windowWidth / 2),
        23 + windowWidth / 2
      );
    }
  }
  {
    for (i = 0; i < 10; i++) {
      for (j = 0; j < 10; j++) {
        e = ae[i][j];
        ae1[e]++;
      }
    }
    strokeWeight(3);
    for (i = 0; i < 8; i++) {
      point(
        27 + windowWidth / 2 + i * (1.9 / 20) * (windowWidth / 2),
        -ae1[i] + 10 + windowWidth / 2
      );
    }
  }
  for (k = 0; k < 8; k++) {
    ae1[k] = 0;
  }
}
