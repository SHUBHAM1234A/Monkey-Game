var monkey , monkey_running,t
var banana ,bananaImg, obs, obsImg;
var bgrp, ogrp,rush,pd
var score=0,bg,bg1,ig,ST=0

function preload(){
  
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bg = loadImage("bg.png")
  
  rush = loadFont("RUSH.otf")
  pd = loadFont("PRICEDOWN.otf")
  
  bananaImg = loadImage("banana.png");
  obsImg = loadImage("obstacle.png");
}

function setup() {
  createCanvas(640,360); 
  bg1 = createSprite(460,150,10,10);
  bg1.addImage(bg);
  bg1.scale=1;
  
  ig = createSprite(320,370,650,10) 
 
  monkey = createSprite(100,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  t= createSprite(100,340,10,10);
  
  bgrp = new Group();
  ogrp = new Group();
}

function draw() {
  background(bg);
  
  monkey.setCollider("rectangle",0,10,300,600);
  t.visible=false;
  monkey.debug = false;
    if (monkey.isTouching(bgrp)){
      score = score + 1;
      bgrp.destroyEach();
    }
    
  if (!monkey.isTouching(ogrp)){
    ST = Math.ceil(frameCount/28);
    banana1();
    obs1();
    
    monkey.velocityY = monkey.velocityY + 0.8;
    bg1.velocityX = -4;
    if (bg1.x < 0){
      bg1.x = bg1.width/2;
    }
    if (keyWentDown("space") && monkey.y===303 || monkey.y===303.8){
      monkey.velocityY = -15;  
    }
  }
  
    if (monkey.isTouching(ogrp)){
     bg1.velocityX = 0;
    ogrp.setVelocityXEach(0);
    bgrp.setVelocityXEach(0);
    
    bgrp.setLifetimeEach(-1);
    ogrp.setLifetimeEach(-1);
    }
  
  monkey.collide(ig); 

  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("yellow");
  textFont(rush);
  text("Score: "+score,50,25);
  
  stroke("black");
  strokeWeight(5)
  textSize(50);
  fill("gold");
  
  textFont(pd);
  text("Survival Time: "+ST,50,75)
}

function banana1() {
  if(frameCount%80===0){
    banana = createSprite(640,Math.round(random(120,300)),10,10);
    banana.velocityX = -4;
    banana.addImage(bananaImg);
    banana.scale=0.1;
    banana.lifetime = 160;
    bgrp.add(banana);
  }
}

function obs1() {
  if(frameCount%300===0){
    obs = createSprite(640,340,10,10);
    obs.velocityX = -6;
    obs.addImage(obsImg);
    obs.scale=0.15;
    obs.lifetime = 160;
    ogrp.add(obs);
  }
}