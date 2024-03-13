
/*
Derek Burns
ICS4U-01
https://sites.google.com/ocdsb.ca/coolermathgames/home
Snake game turned 2 player
*/
//Single snake code used from https://p5js.org/examples/interaction-snake-game.html


//Snake 1
var numSegments = 10;//size of snake 1
var direction1 = 'right';//starting direction of snake 1
var xStart = 100 //starting x coordinate for snake 1
var yStart = 100; //starting y coordinate for snake 1
var diff = 10; //Snake 1
var xCor = [];//Snake 1x
var yCor = [];//Snake 1y
var Score1 = 0;//Snake 1 score

//Snake 2
var numSegments2 = 10;//size of snake 2
var direction2 = 'right'; //starting direction of snake 2
var xStart2 = 100 //starting x coordinate for snake 2
var yStart2 = 300; //starting y coordinate for snake 2
var diff2 = 10; //Snake 2
var xCor2 = [];//Snake 2x
var yCor2 = [];//Snake 2y
var Score2 = 0;//Snake 2 score

//fruit
var xFruit;
var yFruit;

//Extra variables
var level = 1;
var levelChecker = 0;//used to make sure correct gameover screen is showen
/**
 * @name setup
 * @description does a setup of the canvas/frames/snakes
 * @returns none 
 */
function setup() {
  createCanvas(windowWidth/1.1,windowHeight/1.1);//size works well if in full screen on another tab
  frameRate(35); //limit speed
  strokeWeight(10);
  updateFruitCoordinates();
  
  //startup Snake 1
  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
  //startup Snake 2
  for (let i = 0; i < numSegments2; i++) {
    xCor2.push(xStart2 + i * diff2);
    yCor2.push(yStart2);
  }
}

/**
 * @name preload
 * @description loads all images entered so that they can be used in the program
 * @returns none
 */
function preload(){
  titleScreen = loadImage('snakegame.jpg')
  gameoverScreen = loadImage('replay.jpg')
  gameoverScreen1 = loadImage('p1crash.jpg')
  gameoverScreen2 = loadImage('p2crash.jpg')
}

/**
 * @name draw
 * @description loops all code within draw and attempts to print it to the canvas 
 * if requested
 * @returns none
 */
function draw() {
  //level 1
  if (level == 1) {
    image(titleScreen,0,0,windowWidth/1.1,windowHeight/1.1)
    if (keyIsDown(13)) {
      level = 2;
      }
    }

  //level 2
  if (level == 2) {   
    background(129,193,75);
    //Snake 1 draw
    for (let i = 0; i < numSegments - 1; i++) {
      line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }

    //Snake 2 draw
    for (let i = 0; i < numSegments2 - 1; i++) {
      line(xCor2[i], yCor2[i], xCor2[i + 1], yCor2[i + 1]);
    }

    //scoreboard
    stroke('Blue')
    strokeWeight(2)
    textSize(15)
    text('Plr One:', 10, 30);
    text(Score1, 70, 30);
    text('Plr Two:', (windowWidth/1.1)-110, 30);
    text(Score2, (windowWidth/1.1)-50,30);
    strokeWeight(10) //reset for snakes
    stroke(99,50,110) //snakes
    
    //Functions
    updateSnakeCoordinates();
    updateSnakeCoordinates2();
    checkGameStatus();
    checkGameStatus2();
    checkForFruit();
    checkForFruit2();
    }

  //If snake 1 crashed
  if (level == 3) {
    image(gameoverScreen1,0,0,windowWidth,windowHeight)
    levelChecker = 0;
    if (keyIsDown(82)) {
      
      //trying to find a working restart
      location.reload();
      }    
    }
  //If snake 2 crashed
  if (level == 4) {
    
    image(gameoverScreen2,0,0,windowWidth,windowHeight)
    levelChecker = 0;
    if (keyIsDown(82)) {
      
      //trying to find a working restart
      location.reload();
      }    
    }

}


/**
 * @name updateSnakeCoordinates
 * @description updates snake 1's cordinates based on direction
 * @returns none
 */
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction1) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

/**
 * @name updateSnakeCoordinates2
 * @description updates snake 2's cordinates based on direction
 * @returns none
 */
function updateSnakeCoordinates2() {
  for (let i = 0; i < numSegments2 - 1; i++) {
    xCor2[i] = xCor2[i + 1];
    yCor2[i] = yCor2[i + 1];
  }
  switch (direction2) {
    case 'right':
      xCor2[numSegments2 - 1] = xCor2[numSegments2 - 2] + diff2;
      yCor2[numSegments2 - 1] = yCor2[numSegments2 - 2];
      break;
    case 'up':
      xCor2[numSegments2 - 1] = xCor2[numSegments2 - 2];
      yCor2[numSegments2 - 1] = yCor2[numSegments2 - 2] - diff2;
      break;
    case 'left':
      xCor2[numSegments2 - 1] = xCor2[numSegments2 - 2] - diff2;
      yCor2[numSegments2 - 1] = yCor2[numSegments2 - 2];
      break;
    case 'down':
      xCor2[numSegments2 - 1] = xCor2[numSegments2 - 2];
      yCor2[numSegments2 - 1] = yCor2[numSegments2 - 2] + diff2;
      break;
  }
}

/**
 * @name checkGameStatus
 * @description makes sure snake 1 is not out of bounds
 * @returns none
 */
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    //game ends
    if (levelChecker == 0) {
      level = 3;
    }
    if (levelChecker == 1) {
      level = 4;
    }
  }
}

/**
 * @name checkGameStatus2
 * @description makes sure snake 2 is not out of bounds
 * @returns none
 */
function checkGameStatus2() {
  if (
    xCor2[xCor2.length - 1] > width ||
    xCor2[xCor2.length - 1] < 0 ||
    yCor2[yCor2.length - 1] > height ||
    yCor2[yCor2.length - 1] < 0 ||
    checkSnakeCollision2()
  ) {
    //game ends
    if (levelChecker == 0) {
      level = 4;
      }
    if (levelChecker == 1) {
      level = 3;
      }
  }
}

/**
 * @name checkSnakeCollision
 * @description makes sure snake 1 has not colided with anything
 * @returns {boolean} True/False
 */
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  const snakeHeadXX = xCor2[xCor2.length - 1];
  const snakeHeadYY = yCor2[yCor2.length - 1];
  
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
    if (xCor[i] === snakeHeadXX && yCor[i] === snakeHeadYY) {
      levelChecker = 1
      return true;
    }
  }
}

/**
 * @name checkSnakeCollision2
 * @description makes sure snake 2 has not colided with anything
 * @returns {boolean} True/False
 */
function checkSnakeCollision2() {
  const snakeHeadX2 = xCor2[xCor2.length - 1];
  const snakeHeadY2 = yCor2[yCor2.length - 1];
  const snakeHeadX22 = xCor[xCor.length - 1];
  const snakeHeadY22 = yCor[yCor.length - 1];
  for (let i = 0; i < xCor2.length - 1; i++) {
    if (xCor2[i] === snakeHeadX2 && yCor2[i] === snakeHeadY2) {
      return true;
    }
    if (xCor2[i] === snakeHeadX22 && yCor2[i] === snakeHeadY22) {
      levelChecker = 1;
      return true;
    }
  }
}

/**
 * @name checkForFruit
 * @description check if fruit was collected by snake 1 and add to score of player 1
 * @returns none
 */
function checkForFruit() {
  stroke(53,86,145) //fruit
  point(xFruit, yFruit);
  stroke(99,50,110) //snakes
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    Score1 += 1;
    /**
     * @name updateFruitCoordinates
     * @description randomizes the fruits location when called
     * @returns none
     */
    updateFruitCoordinates();
  }
}

/**
 * @name checkForFruit2
 * @description check if fruit was collected by snake 2 and add to score of player 2
 * @returns none
 */
function checkForFruit2() {
  stroke(53,86,145) //fruit
  point(xFruit, yFruit);
  stroke(99,50,110) //snakes
  if (xCor2[xCor2.length - 1] === xFruit && yCor2[yCor2.length - 1] === yFruit) {
    xCor2.unshift(xCor2[0]);
    yCor2.unshift(yCor2[0]);
    numSegments2++;
    Score2 += 1;
    /**
     * @name updateFruitCoordinates
     * @description randomizes the fruits location when called
     * @returns none
     */
    updateFruitCoordinates();
  }
}

/**
 * @name updateFruitCoordinates
 * @description randomizes the fruits location when called
 * @returns none
 */
function updateFruitCoordinates() {
  //Code used from p5.js library
  //used to make sure fruit can possibly line up with snake 
  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

/**
 * @name keyPressed
 * @description function runs through code if a key is pressed down
 * @returns none
 */
function keyPressed() {
  if (level == 2) {
    switch (keyCode) {
        //player 1
        case 37:
          if (direction1 !== 'right') {
            direction1 = 'left';
          }
          break;
        case 39:
          if (direction1 !== 'left') {
            direction1 = 'right';
          }
          break;
        case 38:
          if (direction1 !== 'down') {
            direction1 = 'up';
          }
          break;
        case 40:
          if (direction1 !== 'up') {
            direction1 = 'down';
          }
          break;
        //player 2
        case 65:
          if (direction2 !== 'right') {
            direction2 = 'left';
          }
          break;
        case 68:
          if (direction2 !== 'left') {
            direction2 = 'right';
          }
          break;
        case 87:
          if (direction2 !== 'down') {
            direction2 = 'up';
          }
          break;
        case 83:
          if (direction2 !== 'up') {
            direction2 = 'down';
          }
          
          break;
     
    
    }  
  }
}

