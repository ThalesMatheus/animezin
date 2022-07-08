//Pega o valor do input
const SelecionarImagem = document.getElementById('avatar');
//Adiciona o evento de troca de imagem
SelecionarImagem.addEventListener("change", listaDeArquivos, false);

function listaDeArquivos() {
  if (!this.files.length) {
    imagem.src = "/scr/IMG/erro.png";
  } else {
    //Caminha pelos arquivos selecionados e mostra a imagem selecionada no input de imagem
    for (let i = 0; i < this.files.length; i++) {
      imagem.src = URL.createObjectURL(this.files[i]);
      imagem.onload = function() {
        URL.revokeObjectURL(this.src);
      }
    }
  }
}

