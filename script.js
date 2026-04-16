let dados = JSON.parse(localStorage.getItem("dados")) || [];
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

function salvar() {
    localStorage.setItem("dados", JSON.stringify(dados));
}

function adicionar() {
    let eventoId = document.getElementById("evento").value;
    let data = document.getElementById("data").value;
    let descricao = document.getElementById("descricao").value;
    let valor = Number(document.getElementById("valor").value);
    let tipo = document.getElementById("tipo").value;

    if (data === "" || descricao === "" || isNaN(valor) || valor <= 0) {
    alert("Preencha todos os campos corretamente!");
    return;
    }

    dados.push({
        eventoId: eventoId,
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
    document.getElementById("evento").value = "";

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
        let nomeEvento = eventos.find(e => e.id == item.eventoId)?.nome || "-"

        let linha = `
            <tr>
                <td>${nomeEvento}</td>
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

function salvarEventos() {
    localStorage.setItem("eventos", JSON.stringify(eventos));
}

function criarEvento() {
    let nome = prompt("Nome do evento: ");

    if (!nome) return;

    eventos.push({
        id: Date.now(),
        nome: nome
    });

    salvarEventos();
    carregarEventos();
}
function carregarEventos() {
    let select = document.getElementById("evento");
    select.innerHTML = `<option value="">Sem evento</option>`;

    eventos.forEach(ev => {
        select.innerHTML += `
        <option value="${ev.id}">${ev.nome}</option>
    `;
    });
}

carregarEventos();
atualizar();