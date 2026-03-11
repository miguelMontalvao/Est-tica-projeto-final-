// --- 1. CONFIGURAÇÃO DO FORMULÁRIO DE CLIENTES ---
const formCliente = document.getElementById('meuFormulario');
const listaClientes = document.getElementById('listaClientes');

function carregarClientes() {
    listaClientes.innerHTML = ""; 
    const clientes = JSON.parse(localStorage.getItem('banco_clientes')) || [];
    
    clientes.forEach((cliente) => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} - Tel: ${cliente.telefone}`;
        listaClientes.appendChild(li);
    });
}

formCliente.addEventListener('submit', function(event) {
    event.preventDefault();

    const novoCliente = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value
    };

    const clientes = JSON.parse(localStorage.getItem('banco_clientes')) || [];
    clientes.push(novoCliente);
    localStorage.setItem('banco_clientes', JSON.stringify(clientes));

    formCliente.reset(); 
    carregarClientes(); 
});

// --- 2. CONFIGURAÇÃO DO FORMULÁRIO DE AGENDAMENTOS ---
// Corrigido: Agora usamos uma constante única para este formulário
const formAgendamento = document.getElementById('formAgendamento');
const tabelaCorpo = document.querySelector('#tabelaAgendamentos tbody');

function obterDiaSemana(dataString) {
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const data = new Date(dataString + 'T00:00:00'); 
    return dias[data.getDay()];
}

function renderizarTabela() {
    if (!tabelaCorpo) return; // Evita erro caso a tabela não exista na página
    tabelaCorpo.innerHTML = ""; 
    const agendamentos = JSON.parse(localStorage.getItem('meus_agendamentos')) || [];

    agendamentos.forEach(item => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${item.diaSemana}</td>
            <td>${item.data}</td>
            <td>${item.horario}</td>
            <td>${item.servico}</td>
        `;
        tabelaCorpo.appendChild(linha);
    });
}

formAgendamento.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataInput = document.getElementById('data').value;
    
    const novoAgendamento = {
        data: dataInput,
        diaSemana: obterDiaSemana(dataInput),
        horario: document.getElementById('horario').value,
        servico: document.getElementById('servico').value
    };

    const banco = JSON.parse(localStorage.getItem('meus_agendamentos')) || [];
    banco.push(novoAgendamento);
    localStorage.setItem('meus_agendamentos', JSON.stringify(banco));

    formAgendamento.reset(); 
    renderizarTabela();
    alert("Agendamento concluído. Esperamos por você! 😊");
});

// --- INICIALIZAÇÃO ---
// Carrega os dados de ambas as seções ao abrir a página
carregarClientes();
renderizarTabela();