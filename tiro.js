var SOM_TIRO = new Audio();
SOM_TIRO.src = "snd/tiro.mp3";
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();
function Tiro(contexto, nave) {
this.contexto = contexto;
this.nave = nave;
this.largura = 4;
this.altura = 20;
this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
this.y = nave.y - this.altura;
this.deslocamento = 10;
SOM_TIRO.currentTime = 0.0;
SOM_TIRO.play();
}


Tiro.prototype = {
atualizar: function() {
this.y -= this.deslocamento;
if (this.y < -this.altura) {
this.gameLoop.excluirSprite(this); // Verificar retirada da colisão
}
},
desenhar: function() {
var ctx = this.contexto;
ctx.save();
ctx.fillStyle = "red";
ctx.fillRect(this.x, this.y, this.largura, this.altura);
ctx.restore();
},

retangulosColisao: function() {
var rets = [
{x: this.x, y: this.y, largura: this.largura, altura: this.altura}
];
var ctx = this.contexto;
for (var i in rets) {
ctx.save();
ctx.strokeStyle = 'yellow';
ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
ctx.restore();
}
return rets
},
colidiuCom: function(outro) {
}
}


// Arquivo: inimigo.js
function Inimigo(contexto, imagem, x, y, deslocamento, imgExplosao,
painel) {

this.contexto = contexto;
this.imagem = imagem;
this.x = x;
this.y = y;
this.deslocamento = deslocamento;
this.imgExplosao = imgExplosao;
this.painel = painel;
this.largura = this.imagem.width;
this.altura = this.imagem.height;

}


Inimigo.prototype = {
atualizar : function() {
this.descer(this.deslocamento);
if (this.y > this.contexto.canvas.height) {
this.gameLoop.excluirSprite(this); // retirar da colisão
}
},
desenhar : function() {
this.contexto.drawImage(this.imagem, this.x, this.y, this.largura,

this.altura);

},
direita : function(deslocamento) {
if (this.x < this.contexto.canvas.width - this.largura - deslocamento) {
this.x += deslocamento;
}
},
esquerda : function(deslocamento) {
if (this.x > 0) {
this.x -= deslocamento;
}
},

subir : function(deslocamento) {
if (this.y > 0) {
this.y -= deslocamento;
}
},
descer : function(deslocamento) {
if (this.y < this.contexto.canvas.height) {
this.y += deslocamento;
}
},
retangulosColisao: function() {
var rets = [ {x: this.x, y: this.y, largura: this.largura, altura:
this.altura} ];
var ctx = this.contexto;
for (var i in rets) {
ctx.save();
ctx.strokeStyle = 'yellow';
ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
ctx.restore();
}
return rets
},


colidiuCom: function(outro) {
if (outro instanceof Tiro) {
painel.pontuacao++;
var explosao = new Explosao(this.contexto, this.imgExplosao,
this.x,

this.y);

this.gameLoop.adicionarSprite(explosao);
this.gameLoop.excluirSprite(this);
this.colisao.excluirSprite(this);
this.gameLoop.excluirSprite(outro);
this.colisao.excluirSprite(outro);
}
}
}

// Arquivo: colisao.js
function Colisao() {
this.sprites = [];
this.spritesExcluidos = [];
}
Colisao.prototype = {
adicionarSprite: function(sprite) {
this.sprites.push(sprite);
sprite.colisao = this;
},
excluirSprite: function(sprite) {
this.spritesExcluidos.push(sprite);
},

eliminarSprites: function() {
var arrayAux = [];
for (var i in this.sprites) {
if (this.spritesExcluidos.indexOf(this.sprites[i]) == -1) {
arrayAux.push(this.sprites[i]);
}
}
this.spritesExcluidos = [];
this.sprites = arrayAux;
},
verificar: function() {
for (var x = 0; x < this.sprites.length - 1; x++) {
for (var y = x + 1; y < this.sprites.length; y++) {
this.testarColisao(this.sprites[x], this.sprites[y]);
}
}
this.eliminarSprites();
},


testarColisao: function(sprite1, sprite2) {
var rets1 = sprite1.retangulosColisao();
var rets2 = sprite2.retangulosColisao();
colisoes:
for (var i in rets1) {
for (var j in rets2) {
if (this.temColisao(rets1[i], rets2[j])) {
sprite1.colidiuCom(sprite2);
sprite2.colidiuCom(sprite1);
break colisoes;

}
}
}
},
temColisao: function(ret1, ret2) {
return (ret1.x + ret1.largura) > ret2.x &&
ret1.x < (ret2.x + ret2.largura) &&
(ret1.y + ret1.altura) > ret2.y &&
ret1.y < (ret2.y + ret2.altura);
}
}