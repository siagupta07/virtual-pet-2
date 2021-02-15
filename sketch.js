//Create variables here
var lastFeed;
var dog,dogIMG, dog1, dog2;
var database, foodS, foodStock;
var score = 20;
var database
function preload()
{
  dog1=loadImage("images/dogImg.png")
  dog2=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000,500);
  database=firebase.database();
  dog=createSprite(250,250,10,10);
  dog.addImage(dog1);
  dog.scale = 0.3;

    foodObj = new Food();
  foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    feed=createButton("feedthedog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("addFood")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
  
}


function draw() {  
background("lightblue")
  foodObj.display();
  //add styles here
  textSize(25);
  fill("pink")

  feedTime=database.ref('feedtime')
  feedTime.on("value",function(data){
  lastFeed=data.val();
  })
  
  if(lastFeed>=12){
    text("Last Feed :"+ lastFeed%12 + "PM", 350, 30)
  }else if(lastFeed==0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed :"+ lastFeed + "AM", 350, 30)
  }
  drawSprites();
}


function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(dog2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

