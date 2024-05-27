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