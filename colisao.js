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