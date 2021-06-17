var mario, mario_running, coin, coinImg, pipe, pipeImg;
var ground, groundImg, cloudImg, pipeImg;
var pipeGroup, cloudGroup, coinGroup;

score =0;

function preload() {
  mario_running = loadAnimation("mario_running1.png", "mario_running3.png","mario_running4.png");
  groundImg = loadImage("background.png");
  cloudImg = loadImage("cloud.png");
  pipeImg = loadImage("pipe.png");
  coinImg = loadImage("coin.png");
}

function setup() {
  createCanvas(800,500);

 ground = createSprite(300,300);
 ground.addImage("ground", groundImg);
 ground.scale = 1.5;
 ground.x = ground.width/2;

mario = createSprite(50,400,20,20);
mario.addAnimation("running",mario_running);
mario.scale = 0.3;

pipeGroup = new Group();
cloudGroup = new Group();
coinGroup = new Group();

edges = createEdgeSprites();

}

function draw() {
  background("white");  


 ground.velocityX = -4;
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }

  if (keyDown("space") && mario.y >= 400) {
    mario.velocityY = -10;
  }

mario.velocityY = mario.velocityY + 0.5;

mario.collide(edges[3]);

spawnClouds();
spawnPipe();
spawnCoin();

if (coinGroup.isTouching(mario)){
  coinGroup.destroyEach();
  score = score+2;
}

if(pipeGroup.isTouching(mario)) {
  pipeGroup.destroy();
  cloudGroup.destroy();
  mario.destroy();
  coinGroup.destroy();
  ground.velocityX = 0;
}

  drawSprites();

  text("Score: "+ score,700,50);
}

function spawnClouds() {
  if(frameCount%60===0){
    cloud = createSprite(800,120,40,10);
    cloud.addImage(cloudImg);
    cloud.y = Math.round(random(280,50));
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime = 300;
    cloudGroup.add(cloud);

    cloud.depth = mario.depth;
    mario.depth = mario.depth + 1;

  }
}

function spawnPipe() {
  if(frameCount%80===0) {
    pipe = createSprite(400,500,20,20);
    pipe.addImage(pipeImg);
    pipe.x = Math.round(random(200,800));
    pipe.velocityX = -5;
    pipe.scale = 0.3;
    pipe.lifetime = 300;
    pipeGroup.add(pipe);
  }
}

function spawnCoin() { 
  if (frameCount%80===0) {
    coin = createSprite(300,400,20,20);
    coin.addImage(coinImg);
    coin.x = Math.round(random(300,800));
    coin.velocityX = -5;
    coin.scale = 0.03;
    coin.lifetime = 300;
    coinGroup.add(coin);
  }

}
