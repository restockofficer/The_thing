var cor = 'blue';
var cont = 1;
var myGamePiece;
function startGame() {
myGamePiece = new component(30, 30, "red", 450, 0);
myGameArea.start();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
  this.canvas.width = 480;
  this.canvas.height = 270;
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
ctx.fillRect(this.x, this.y, this.width, this.height);
cont++;

}
}

function updateGameArea(timestamp) {
myGameArea.clear();
myGamePiece.y += 1; 
myGamePiece.x -= 2; 
myGamePiece.update();
if (myGamePiece) {x + Width >= canvas.width || y + Height >= canvas.height }{
    cancelAnimationFrame(animationId); 
    return;
}

animationId = requestAnimationFrame(updateGameArea);

let animationId = requestAnimationFrame(updateGameArea);


requestAnimationFrame(updateGameArea);
}