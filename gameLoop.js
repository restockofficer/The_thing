function GameLoop(contexto, colisao, musica) {
    this.contexto = contexto;
    this.colisao = colisao;
    this.musica = musica;
    this.sprites = [];
    this.spritesExcluidos = [];
    this.rodando = false;
    this.gameOver = false;
    }
    GameLoop.prototype = {
    adicionarSprite: function(sprite) {
    this.sprites.push(sprite);
    sprite.gameLoop = this;
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
    rodar: function() {
    this.rodando = true;
    this.musica.play();
    this.desenhar();
    },
    parar: function() {
    this.rodando = false;
    this.musica.pause();
    },
    
    desenhar: function() {
    if ( this.rodando ) {
    //this.limpar();
    for (var i in this.sprites) {
    this.sprites[i].atualizar();
    }
    for (var i in this.sprites) {
    this.sprites[i].desenhar();
    }
    this.eliminarSprites();
    this.colisao.verificar();
    var gameLoop = this;
    
    requestAnimationFrame(function() {
    gameLoop.desenhar();
    });
    }
    },
    limpar: function() {
    contexto.clearRect(0, 0, this.contexto.canvas.width,
    
    this.contexto.canvas.height);
    
    }
    }
    
    
    // Arquivo: nave.js
    function Nave(contexto, imagem, x, y, imgExplosao) {
    
    this.contexto = contexto;
    this.imagem = imagem;
    this.x = x;
    this.y = y;
    this.imgExplosao = imgExplosao;
    this.largura = this.imagem.width;
    this.altura = this.imagem.height;
    this.acabaramVidas = null;
    this.vidasExtras = 3;
    
    }
    
    Nave.prototype = {
    atualizar : function() {
    },
    desenhar : function() {
    this.contexto.drawImage(this.imagem, this.x, this.y, this.largura,
    
    this.altura);
    
    },
    direita : function(deslocamento) {
    if (this.x < this.contexto.canvas.width - this.largura -
    deslocamento) {
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
    if (this.y <= this.contexto.canvas.height - this.altura -
    deslocamento) {
    this.y += deslocamento;
    }
    },
    atirar: function() {
    var tiro = new Tiro(this.contexto, this);
    this.gameLoop.adicionarSprite(tiro);
    this.colisao.adicionarSprite(tiro);
    },
    
    
    retangulosColisao: function() {
    var rets = [
    //{x: this.x, y: this.y, largura: this.largura, altura: this.altura}
    {x: this.x+35, y: this.y+10, largura: 10, altura: 20},
    {x: this.x+10, y: this.y+30, largura: 60, altura: 30}
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
    if (this.gameLoop.rodando) {
    if (outro instanceof Inimigo) {
    var explosao1 = new Explosao(this.contexto,
    this.imgExplosao,
    
    this.x, this.y);
    this.gameLoop.adicionarSprite(explosao1);
    
    var explosao2 = new Explosao(this.contexto,
    
    this.imgExplosao,
    
    outro.x, outro.y);
    this.gameLoop.adicionarSprite(explosao2);
    this.gameLoop.excluirSprite(this);
    this.colisao.excluirSprite(this);
    this.gameLoop.excluirSprite(outro);
    this.colisao.excluirSprite(outro);

    var nave = this;
    
    explosao1.fimDaExplosao = function() {
    
    nave.vidasExtras--;
    if (nave.vidasExtras < 0) {
    if (nave.acabaramVidas) nave.acabaramVidas();
    } else {
    nave.colisao.adicionarSprite(nave);
    nave.gameLoop.adicionarSprite(nave);
    
    nave.x = contexto.canvas.width / 2 -
    
    imgNave.width / 2;
    nave.y = contexto.canvas.height - imgNave.height;
    }
    }
    }
    }
    }
    }