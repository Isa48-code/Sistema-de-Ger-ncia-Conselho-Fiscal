let dados = JSON.parse(localStorage.getItem("dados")) || [];

function salvar() {
    localStorage.setItem("dados", JSON.stringify(dados));
}

function adicionar() {
    let data = document.getElementById("data").value;
    let descricao = document.getElementById("descricao").value;
    let valor = Number(document.getElementById("valor").value);
    let tipo = document.getElementById("tipo").value;

    if (data == "" || descricao === "" || isNaN(valor) || valor <= 0) {
    alert("Preencha todos os campos corretamente!");
    return;
    }

    dados.push({
        id: Date.now(),
        data: data,
        descricao: descricao,
        valor: valor,
        tipo: tipo
    });

    salvar();
    atualizar();

    document.getElementById("data").value = ""
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo").value = "entrada";

}

function excluir(id) {
    dados = dados.filter(item => item.id !== id);
    salvar();
    atualizar();
}

function atualizar() {
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    let saldo = 0;

    dados.forEach(item => {
        let linha = `
            <tr>
                <td>${item.data}</td>
                <td>${item.descricao}</td>
                <td class="${item.tipo}">R$ ${item.valor.toFixed(2)}</td>
                <td>${item.tipo === "entrada" ? "Entrada" : "Saída"}</td>
                <td><button class="excluir" onclick="excluir(${item.id})">Excluir</button></td>
            </tr>
        `;

        tabela.innerHTML += linha;

        if (item.tipo === "entrada") {
            saldo += item.valor;
        } else {
            saldo -= item.valor;
        }
    });
    
    document.getElementById("saldo").innerText = saldo.toFixed(2);
}

atualizar();