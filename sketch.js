var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;
var cloud, icloud;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacleGroup,cloudsGroup;
var PLAY=1; //constants
var END=0;
var gameState=PLAY;
var gameOver,igameOver
var restart,irestart;
var jumpSound,dieSound,checkpSound;
var lightning,ilightning,slightning;



var score=0;


function preload(){
  girl_running = loadAnimation("girlRunning.png","girlRunning2.png","girlRunning3.png");
  girl_collided = loadAnimation("girlCollided.png");
  
  groundImage = loadImage("ground2.png");
  icloud = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  igameOver = loadImage("gameOver.png");
  irestart = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpSound = loadSound("checkPoint.mp3");
  
}

function setup() {
  background(220);
  createCanvas(windowWidth,windowHeight);
  
  //create a girl sprite
  girl = createSprite(50,height-50,20,50);
  girl.addAnimation("running", girl_running);
  girl.addAnimation("collided", girl_collided);
  girl.scale = 0.5;
  girl.setCollider("rectangle",0,0,85,140);
  //girl.debug=true;
  //create a ground sprite
  ground = createSprite(200,height-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,height-10,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstacleGroup = new Group();
  cloudsGroup = createGroup();
  
   gameOver = createSprite(width/2,height/2-70);
        gameOver.addImage("gameOver.png",igameOver);
        gameOver.scale=0.3;
        gameOver.visible=false;
        
        restart = createSprite(width/2,height/2);
        restart.addImage("restart.png",irestart);
        restart.scale = 0.4;
        restart.visible=false;
}

function draw() {
  //set background color
  background("black");
  
  
  text("score:"+score,30,50);
  
  if(gameState===PLAY)
  {
        if(obstacleGroup.isTouching(girl))
        {
          gameState=END;
          dieSound.play();
        }
    ground.velocityX = -(4+3*(score/500));
    
        score=score+Math.round(getFrameRate()/30);
            // jump when the space key is pressed
        if((keyDown("space")||touches.length>0) && girl.y >= height-80) {
          girl.velocityY = -10;
          jumpSound.play();
        }
          girl.velocityY = girl.velocityY + 0.8

        if (ground.x < 0){
          ground.x = ground.width/2;
        }
        ground.velocityX=-3;
     
        if(score>0 && score%500===0){
          checkpSound.play();
        }
        //Spawn Clouds
        spawnClouds();
        spawnObstacle();
  }
  else if(gameState===END)
  {
        ground.velocityX=0;
        cloudsGroup.setVelocityXEach(0);
        cloudsGroup.setLifetimeEach(-1);
        obstacleGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
    
        girl.changeAnimation("collided",girl_collided);
        girl.velocityY=0;
    
        restart.visible=true;
        gameOver.visible=true;
    
        if(mousePressedOver(restart)||touches.length>0){
          gameState = PLAY;
          obstacleGroup.destroyEach();
          cloudsGroup.destroyEach();
          girl.changeAnimation("running", girl_running);
          gameOver.visible=false;
          restart.visible=false;
          score=0;
          touches=[];
        }
        
  }

  
  
  
  
  
  //stop man from falling down
  girl.collide(invisibleGround);
 
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
   if(frameCount%60===0){
    cloud = createSprite(width,height-300,10,10);
    cloud.addImage("cloud.png",icloud);
    cloud.scale=0.3;
    cloud.y=Math.round(random(height-300,height-250));
   cloud.velocityX=-(3+score/500);
   cloud.lifetime=(200);
    console.log(cloud.depth);
     cloud.depth=girl.depth;
     girl.depth+=1;
     cloudsGroup.add(cloud);
     
   }

  
  
 // write your code here 
}
function spawnObstacle(){
  if(frameCount%70===0){
    obstacle = createSprite(width,height-37,12,40);
    obstacle.velocityX=-(4+score/500);
    obstacle.scale=0.5;
    
    var rando = Math.round(random(1,6));
    switch(rando){
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
         }
    obstacle.lifetime = 150;
 obstacleGroup.add(obstacle);
  }
}



