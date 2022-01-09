//creacion de sprites
var kaizer;
var vidas = 5;
var gameState = "PLAY";
var salto = "piso";

var piso1, piso2;

var pared1;

var techo1;

var  pisosGroup, techos, paredes, paredesGroup;

var enfriamiento = 0;

function preload(){
  
}

function setup() {
createCanvas(2000,600);
//creacion de grupos

pisosGroup = new Group();
paredesGroup = new Group();


var a = cuartos_arriba(-100,50);
var b = cuartos_abajo(0,100);
var c = cuartos_derecha(100,200);
var d = cuartos_izquierda(-100,200);




//creacion del personaje principal
kaizer = createSprite(50,300,10,10);
}

function draw() {
background("black");
if(gameState === "PLAY"){
textSize(20);
fill("white");
text("vidas: "+ vidas, camera.position.x, camera.position.y-250);

if(enfriamiento < 1){
  textSize(20);
  fill("white");
  text("teletransporte listo", camera.position.x+100, camera.position.y-250);
}else{
  textSize(20);
  fill("white");
  text("enfriamiento: "+ enfriamiento, camera.position.x+100, camera.position.y-250);
}

// console.log(mouseX, mouseY);

kaizer.velocityX = 0;
//camara
camera.position.x = kaizer.x+800;
camera.position.y = kaizer.y;

//gravedad

if(kaizer.isTouching(pisosGroup)){
  kaizer.velocityY = 0;
  salto = "piso";
}
if(salto === "piso"){
  if(keyDown("A")){
    kaizer.x=  kaizer.x-2;
    kaizer.velocityY =  kaizer.velocityY+1;
    enfriamiento = enfriamiento-1;
  }
  if(keyDown("D")){
    kaizer.x =  kaizer.x+2;
    kaizer.velocityY =  kaizer.velocityY+1;
    enfriamiento = enfriamiento-1;
  }
}
if(salto !== "piso"){
if(keyDown("A")){
  kaizer.x=  kaizer.x-3;
  kaizer.velocityY =  kaizer.velocityY+1;
  enfriamiento = enfriamiento-1;
}
if(keyDown("D")){
  kaizer.x =  kaizer.x+3;
  kaizer.velocityY =  kaizer.velocityY+1;
  enfriamiento = enfriamiento-1;
}
}

if(keyWentDown("N")&& enfriamiento < 1){
  kaizer.x = kaizer.x-100;
  kaizer.velocityY =  kaizer.velocityY+1;
  enfriamiento = 100;
}
if(keyWentDown("M")&enfriamiento < 1){
  kaizer.x = kaizer.x+100;
  kaizer.velocityY =  kaizer.velocityY+1;
  enfriamiento = 100;
}
// if(keyDown("W")){
//   kaizer.y=  kaizer.y-2;
// }
// if(keyDown("S")){
//   kaizer.y =  kaizer.y+2;
// }
if(salto === "piso"){
  if(keyWentDown("SPACE")){
    kaizer.y = kaizer.y-100;
    kaizer.velocityY =  kaizer.velocityY+5;
    salto = "aire";
  }

}

if(salto !== "piso"){
  if(keyWentDown("SPACE")){
    kaizer.y = kaizer.y;
  }

}

if(kaizer.velocityY >= 8){
  kaizer.velocityY = 5;
}
 kaizer.collide(paredesGroup);
 kaizer.collide(pisosGroup);
//  kaizer.collide(techos);
//reglas
if(kaizer.y > 350){
  kaizer.y = 100;
  vidas = vidas-1;
}
if(vidas <= 0){
  gameState = "END";
}
}
if(gameState === "END"){
  kaizer.velocityY = 0;

  textSize(50);
  fill("white");
  text("GAME OVER", camera.position.x-500, camera.position.y);

}

// camera.off();

  drawSprites();
}

function pisos(x,y){
      var p = createSprite(x,y,110,10);
      pisosGroup.add(p);
}
function puertas1(x,y){
  var t1 = createSprite(x-35,y,40,10);
  var t2 = createSprite(x+35,y,40,10);
  pisosGroup.add(t1);
  pisosGroup.add(t2);
}
function puertas2(x,y){
  var w1 = createSprite(x,y-35,10,40);
  var w2 = createSprite(x,y+35,10,40);
  paredesGroup.add(w1);
  paredesGroup.add(w2);
}
function paredes(x,y){
    var w = createSprite(x,y,10,100);
    paredesGroup.add(w);
}
function cuartos_arriba(i,j){
  paredes(i+50,j+100);
  pisos(i+100,j+150);
  paredes(i+150,j+100);
  puertas1(i+100,j+50);
}
function cuartos_abajo(i,j){
  paredes(i+50,j+100);
  puertas1(i+100,j+150);
  paredes(i+150,j+100);
  pisos(i+100,j+50);
}
function cuartos_izquierda(i,j){
  puertas2(i+50,j+100);
  pisos(i+100,j+150);
  paredes(i+150,j+100);
  pisos(i+100,j+50);
}
function cuartos_derecha(i,j){
paredes(i+50,j+100);
pisos(i+100,j+150);
puertas2(i+150,j+100);
pisos(i+100,j+50);
}

function balas(x,y){

}

function pinchos(x,y){

}