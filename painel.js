function Painel(contexto, nave) {
    this.contexto = contexto;
    this.nave = nave;
    this.pontuacao = 0;
    }
    
    
    Painel.prototype = {
    atualizar: function() {
    },
    desenhar: function() {
    var x = 10;
    var y = 10;
    var ctx = this.contexto;
    ctx.scale(0.5, 0.5);
    for (var i = 1; i <= this.nave.vidasExtras; i++) {
    this.contexto.drawImage(this.nave.imagem, x, y);
    x += 70;
    }
    ctx.scale(2, 2);
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '18px sans-serif';
    ctx.fillText("Pontos:" + this.pontuacao, 400, 25);
    ctx.restore();
    }
    }