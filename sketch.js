var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ;
var hero ;
var heroAnimation ;
var ground ;
var score ;
var zombie ;
var zombieImg ;
var zombiesGroup ;
var bullet;
var background1,backgroundlv2;
var laser;
var score;
var button;



function preload() {
  heroAnimation = loadImage("iron man.png");
  zombieImg = loadImage("zombie.png") ;
  background1 = loadImage("backgroundnew.jpg");
  backgroundlv2 = loadImage("background(lv2).jpg");
  laser = loadImage("laser-removebg-preview.png");
}

function setup() {
  createCanvas(800,400);
  
  hero = createSprite(50,350,20,20) ;
  hero.addImage(heroAnimation);
  hero.scale = 0.4 ;

  button = createSprite(350,300,100,30);
  button.visible = false;
  
  ground = createSprite(400,390,800,20);
  ground.depth = -10 ;
  
  zombiesGroup = new Group();
  bulletsGroup = new Group();

  score = 0 ;
}

function draw() {
  background(background1) ;
  
  stroke("white")
  fill("white");
  textSize(30)
  text("Kill The Zombie", 250,50);

  
  text("Score:"+score,50,50);

  
  
 if(gameState === PLAY){
   
   if(keyDown("space")) {
    
    spawnBullets();
   }
  
   /*for (var i = 0; i < zombiesGroup.length; i++) {
    if (zombiesGroup.get(i).isTouching(bullet)) {
        zombiesGroup.get(i).destroy();
        score=score+1;
      }
    }*/

 if(zombiesGroup.isTouching(bulletsGroup)){
    score = score+1;
    zombiesGroup.destroyEach();
    bulletsGroup.destroyEach();
  }
   
   spawnZombie();
  
   if(zombiesGroup.isTouching(hero)){
     gameState = END ;
   }
   
 }
   else if (gameState === END) {
     ground.velocityX = 0 ;
     hero.velocityY = 0 ;
     
     
     textSize(20)
     text("GAME OVER" , 300,150 ) ;
     textSize()
     text("Press R To Restart" , 275,200)
     
     
     zombiesGroup.setLifetimeEach(-1);
     zombiesGroup.setVelocityXEach(0);
     
    
    
 }
  
  if(keyDown("r")) {
   restart() ;
  }

  hero.collide(ground) ;
  
drawSprites() ; 
}

function spawnZombie() {
  if (frameCount % 60 === 0){
   var zombie = createSprite(650,310,10,150);
    var rand = Math.round(random(80,120));
    zombie.addImage(zombieImg) ;
    zombie.velocityX = -6 ;   
    zombie.scale = 0.4 ;
    zombie.lifetime = 100 ;
    zombie.depth = 10 ;
    zombie.setCollider("rectangle",0,0,180,300);
   
    
    
    
    zombiesGroup.add(zombie);

    
  }
  if (score===3){
    zombiesGroup.destroyEach();
    zombiesGroup.setVelocityXEach(0);
    button.visible = true;
    text("Level 1 completed!",250,250);
    if(mousePressedOver(button)){
      button.destroy();
      level2();
    }
  }
  
  
}

function restart() {
    gameState = PLAY ;
    score = 0 ;
    zombiesGroup.destroyEach() ;
}

function spawnBullets() {
  var bullet = createSprite(110,320,10,10);
   bullet.addImage(laser);
   bullet.scale = 0.2;
    var rand = Math.round(random(80,120));
    bullet.velocityX = 6 ;  
    bullet.lifetime = 100 ;
    bullet.depth = 10 ;
    bullet.setCollider("rectangle",0,0,80,30);
    bulletsGroup.add(bullet);
   
    if(score===10){
      bulletsGroup.destroyEach();
      bulletsGroup.setVelocityXEach(0);
    }
}

function level2(){
  zombiesGroup.destroyEach();
  hero.destroy();
  var background2 = createSprite(400,200,1000,800);
  background2.addImage(backgroundlv2);
}
