// Gerando o filtro de letras
window.onload = () => {
    console.log("Lista Funcionando")
    // Pegando todas as letras do alfabeto
    let alfabeto = "abcdefghijklmnopqsrtuvwxyz"
    let lista = document.getElementById("lista")
    // Criando lista com as letras do alfabeto
    for(let i = 0; i < alfabeto.length; i++){
        let li = document.createElement("li")
        li.textContent = alfabeto[i]
        lista.appendChild(li)
    }
    getDados()
}

async function getDados() {
    let response = await fetch('http://localhost:3000/api/ani/')
    if (response.ok) {
        let json = await response.json();
        for (let i = 0; i < 15; i++) {
            console.log(json[i]['anime']);
        }
    } else {
    alert("HTTP-Error: " + response.status);
    }
}
