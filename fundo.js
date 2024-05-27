function Fundo(contexto, imagem, deslocamento) {
    this.contexto = contexto;
    this.imagem = imagem;
    this.deslocamento = deslocamento;
    this.posicaoEmenda = 0;
    }
    
    
    Fundo.prototype = {
    atualizar : function() {
    this.posicaoEmenda += this.deslocamento;
    if (this.posicaoEmenda > this.imagem.height) {
    this.posicaoEmenda = 0;
    }
    },
    desenhar : function() {
    var img = this.imagem;
    // Primeira cópia
    var posY = this.posicaoEmenda - img.height;
    this.contexto.drawImage(img, 0, posY, img.width, img.height);
    // Segunda cópia
    posY = this.posicaoEmenda;
    this.contexto.drawImage(img, 0, posY, img.width, img.height);
    }
    }