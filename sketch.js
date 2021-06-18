//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var dogImg;

function preload()
{
	//load images here
  dogImg=loadImage("images/dog.png");
  happyDog=loadImage("images/happyDog.png");
}

function setup() {
	createCanvas(500, 500);

  database=firebase.database();

  dog=createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.1;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(49,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy);
}

  drawSprites();
  //add styles here
  fill("white");
  textSize(16);
  text("Note:Press UP ARROW to feed Drago milk",100,50);

  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  //logic to decrease the value of foodS and once it becomes 0 foodS should be set as 0 always
  if (x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
