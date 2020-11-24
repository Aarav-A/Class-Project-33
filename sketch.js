const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var ground
var score = 0
var turn = 0
var particle = null
var gameState = 0
var plinko = []
var divisions = []
var divisionHeight = 300

function setup() {
  createCanvas(480, 800);
  engine = Engine.create();
  world = engine.world;

  // gameState = play

  ground = new Ground(240, 790, 480, 20)

  for (var j = 40; j <= width; j = j + 50) {
    plinko.push(new Plinko(j, 75, 10))
  }
  for (var j = 15; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j, 175, 10))
  }
  for (var j = 40; j <= width; j = j + 50) {
    plinko.push(new Plinko(j, 275, 10))
  }
  for (var j = 15; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j, 375, 10))
  }
  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight))
  }

  //  mousePressed()
}

// function touchStarted() {
//   console.log("touchStarted")
// }


let value = 0
function draw() {
  background("black");
  Engine.update(engine);

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display()
  }
  for (var j = 0; j < plinko.length; j++) {
    plinko[j].display()
  }

  ground.display()
  if (particle !== null) {
    particle.display()
    // console.log("Particle - " + particle.body.position.y)
    if (particle.body.position.y > 750) {
      if (particle.body.position.x > 350) {
        score = score + 500
        particle = null
        if (turn == 5) {
          gameState = 3
        } else {
          gameState = 0
        }
      } else if (particle.body.position.x > 150 && particle.body.position.x < 349) {
        // if (particle.body.position.x > 200&&particle.body.position.x < 349) {
        score = score + 300
        particle = null
        if (turn == 5) {
          gameState = 3
        } else {
          gameState = 0
        }
      } else {
        score = score + 100
        particle = null
        if (turn == 5) {
          gameState = 3
        } else {
          gameState = 0
        }
      }
    }
  }



  text("Score: " + score, 20, 40)

  if(turn===5){
      text("GameOver-"+score,240,400)
    }
    
  drawSprites();
}


function touchEnded() {
  // console.log("touchStarted " + touchX + "gameState - " + gameState)
  if (gameState == 0) {
    turn++
    particle = new Particle(touchX, 10, 10)
    gameState = 1
  }
}

// function touchEnded() {
//   console.log("touchEnded " + touchX)
// }

// function mousePressed() {
//   console.log("mousePressed - " + gameState + " mouseX - " + mouseX)
//   if (gameState === 0) {
//     turn++
//     particle = new Particle(mouseX, 10, 10)
//     if (particle !== null) {
//       particle.display()
//     }
//     gamestate = 1
//   }
// }