var imagem = new Image();
imagem.src = "Nave_Base.png";
var cont = 1;
var myGamePiece = {}
function startGame() {
myGamePiece = new component(100, 100, "red", 650, 700);
myGameArea.start();
}
var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
  this.canvas.width = 800;
  this.canvas.height = 600;
  this.context = this.canvas.getContext("2d");
  document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  }
  
  function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color;
this.color;
this.update = function(){
ctx = myGameArea.context;
if(cont % 10 == 0)
cor = 'red';
cor = 'blue';

//ctx.fillStyle = color;
ctx.fillStyle = cor;
ctx.drawImage(imagem, this.x, this.y, this.width, this.height);
cont++;

}
}
function updateGameArea(key) {
  myGameArea.clear();
  myGamePiece.update();
  document.addEventListener("keydown",
  function(evento) {
  movimentaNaveTeclado(evento.keyCode);
  });
  

  if (myGamePiece.x <= 0) {
    myGamePiece.x = 0;
  }
  if (myGamePiece.y > 500) {
    myGamePiece.y = 500;
  }
  if (myGamePiece.x > 700) {
    myGamePiece.x = 700;
  }
  
  function movimentaNaveTeclado(Key) {
  if (Key == 65) { // Seta para esquerda
    myGamePiece.x -= 0.07;
  }
   else if (Key == 68) { // Seta para direita
    myGamePiece.x += 0.07;
  } else if (Key == 32) { // espaço
  disparaTiro(x+1, 0-0);
  }
  ctx.drawImage(Nave, x, 0-0);
  }
}