//Create variables here
var dogi1,dogi2
var dog,foodS
var foodStock,database,fedTime,lastFed,feed,addFood,foodi,feedDog
var garden,washroom,bedroom

function preload()
{
  //load images here
  dogi1=loadImage("images/dog1.png")
  dogi2=loadImage("images/dog2.png")
  garden=loadImage("images/Garden.png")
  washroom=loadImage("images/Wash Room.png")
  bedroom=loadImage("images/Bed Room.png")
}

function setup() {
  createCanvas(400, 500);
  database=firebase.database()
  dog=createSprite(200,400,150,150)
  foodi=new Food()
  dog.addImage(dogi1)
  dog.scale=0.15;
  foodStock=database.ref('food')
  foodStock.on("value",readStock)
  fedTime=database.ref('fedTime')
fedTime.on("value",function(data){lastFed=data.val()})
readState=database.ref('gamestate')
readState.on("value",function(data){gamestate=data.val()})
  textSize(20)
  feed=createButton("feed the dog")
  feed.position(400,95)
  feed.mousePressed(feedDog)
  addFood=createButton("food")
  addFood.position(200,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
currentTime=hour()
if(currentTime==lastFed+1){
  update("playing")
  foodi.garden()
} else if(currentTime==lastFed+2){
  update("slipping")
  foodi.bedroom()
}else if(currentTime>lastFed+2 && currentTime<=lastFed+4){
  update("bathing")
  foodi.washroom()
} else{
  update("hungry")
  foodi.display()
}

if(gamestate!=="hungry"){
  feed.hide;
  addFood.hide;
  dog.remove();
}
foodi.display();



  
  
drawSprites();

  //text("Press up Arrow key to feed tommy milk",130,10,300,20)
  //add styles here

}

function readStock(data){
  foodS=data.val()
  foodi. updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(dogi2)
   foodi. updateFoodStock(foodi.getFoodStock()-1)
  database.ref('/').update({food:foodi.getFoodStock(),fedTime:hour()})

}

function addFoods(){
  foodS++
  database.ref('/').update({food:foodS})
}


