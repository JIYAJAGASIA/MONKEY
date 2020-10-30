
var monkey ,monkey1, monkey_running;
var banana ,bananaImage, ObstacleImage;
var FoodGroup, ObstaclesGroup,Food,Obstacles;
var ground;
var score;
var SurvivalTime=0;
var background1,backgroundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  backgroundImage=loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ObstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 600);
  SurvivalTime=0;
 
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  background1=createSprite(200,200);
  background1.addImage(backgroundImage);
  background1.velocityX=-2;
  background1.scale=3.5;
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  console.log(ground.x);
  score=0;
  FoodGroup=createGroup();
  ObstaclesGroup=createGroup();
  
}

function draw() {
background(255);
 if (gameState===PLAY){
   
 
   if (ground.x < 0){
       ground.x = ground.width/2;
    }
    if (background1.x < 0){
       background1.x = background1.width/2;
    }
   if(keyDown("space")) {
      monkey.velocityY = -12;
    }
  
  
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
ground.visible=false;
  
 
  if(FoodGroup.isTouching(monkey))
  {
    score=score+2;
    FoodGroup.destroyEach();
     
     }
 }
   
if(monkey.isTouching(ObstaclesGroup)){
  gameState=END;
}

  if(gameState===END){
    if(ObstaclesGroup.isTouching(monkey))
    {
    monkey.scale=0.08;   
       }
    background1.velocityX=0;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
  }
  
    stroke("black");
    textSize(20);
    fill("black");
    text("Score "+ score, 500,50);
   drawSprites();
  
  Food();
  Obstacles();
   

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    score = score + Math.round(getFrameRate()/60);
    text("SurvivalTime "+ survivalTime, 100,50);
 
  
}
function Food() {
    //write code here to spawn the clouds
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.addImage(bananaImage)
     
      
    banana.y = Math.round(random(120,200))
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 900;
    FoodGroup.add(banana);
    }
}

function Obstacles(){
   if (frameCount % 200 === 0){
   var Obstacle = createSprite(800,320,10,40);
   Obstacle.velocityX = -(3+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
    
   
    //assign scale and lifetime to the obstacle           
    Obstacle.scale = 0.15;
    Obstacle.lifetime = 800;
   
   //add each obstacle to the group
    Obstacle.addImage(ObstacleImage);
  
    ObstaclesGroup.add(Obstacle);
}
}

function monkey1(){
  switch(score){ 
    case 10:monkey.scale=0.12;
      break;
      case 20:monkey.scale=0.14;
      break;
      case 30:monkey.scale=0.16;
      break;
      case 40:monkey.scale=0.18;
      break;
      default:break;
     
      
  }
}
