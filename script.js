let dados = JSON.parse(localStorage.getItem("dados")) || [];

function salvar() {
    localStorage.setItem("dados", JSON.stringify(dados));
}

function adicionar() {
    let descricao = document.getElementById("descricao").value;
    let valor = Number(document.getElementById("valor").value);
    let tipo = document.getElementById("tipo").value;

    if (descricao === "" || isNaN(valor) || valor <= 0) {
    alert("Preencha corretamente!");
    return;
    }

    dados.push({
        descricao,
        valor,
        tipo
    });

    salvar();
    atualizar();

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";

}

function atualizar() {
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    let saldo = 0;

    dados.forEach(item => {
        let linha = `
            <tr>
                <td>${item.descricao}</td>
                <td class="${item.tipo}">R$ ${item.valor}</td>
                <td>${item.tipo}</td>
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