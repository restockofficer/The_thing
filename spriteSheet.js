function Spritesheet(contexto, imagem, linhas, colunas, intervalo) {
    this.contexto = contexto;
    this.imagem = imagem;
    this.linhas = linhas;
    this.colunas = colunas;
    this.intervalo = intervalo;
    this.linhaQuadro = 0;
    this.colunaQuadro = 0;
    this.fimDoCiclo = null;
    }
    Spritesheet.prototype = {
    desenharQuadro: function(x, y) {
    var larguraQuadro = this.imagem.width / this.colunas;
    var alturaQuadro = this.imagem.height / this.linhas;
    this.contexto.drawImage(this.imagem, larguraQuadro *
    this.colunaQuadro,
    
    alturaQuadro * this.linhaQuadro,
    
    larguraQuadro, alturaQuadro,
    x, y, larguraQuadro, alturaQuadro);
    },
    
    
    proximoQuadro: function() {
    var agora = new Date().getTime();
    if (! this.ultimoTempo) {
    this.ultimoTempo = agora;
    }
    if (agora - this.ultimoTempo < this.intervalo) {
    return;
    }
    if (this.colunaQuadro < this.colunas - 1) {
    this.colunaQuadro++;
    } else {
    this.colunaQuadro = 0;
    if (this.fimDoCiclo) {
    this.fimDoCiclo();
    }
    }
    this.ultimoTempo = agora;
    }
    }