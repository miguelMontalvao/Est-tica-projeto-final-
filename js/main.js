const form = document.getElementById('meuFormulario');
const lista = document.getElementById('listaClientes');

// 1. FUNÇÃO PARA EXIBIR DADOS (LER DO BANCO)
function carregarClientes() {
    lista.innerHTML = ""; // Limpa a lista antes de renderizar
    const clientes = JSON.parse(localStorage.getItem('banco_clientes')) || [];
    
    clientes.forEach((cliente, index) => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} - Tel: ${cliente.telefone}`;
        lista.appendChild(li);
    });
}

// 2. EVENTO DE SALVAR (ESCREVER NO BANCO)
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const novoCliente = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value
    };

    // Pega o que já tem no banco ou cria um array vazio
    const clientes = JSON.parse(localStorage.getItem('banco_clientes')) || [];
    
    // Adiciona o novo cliente ao array
    clientes.push(novoCliente);

    // Salva de volta no LocalStorage (convertendo para texto)
    localStorage.setItem('banco_clientes', JSON.stringify(clientes));

    form.reset(); // Limpa os campos
    carregarClientes(); // Atualiza a lista na tela
});

// Carrega os dados assim que a página abre
carregarClientes();

// script.js
form = document.getElementById('formAgendamento');
const tabelaCorpo = document.querySelector('#tabelaAgendamentos tbody');

// Função para converter a data em dia da semana (Ex: Segunda-feira)
function obterDiaSemana(dataString) {
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    // Ajuste de fuso horário: adicionamos o horário para evitar que o JS retroceda um dia
    const data = new Date(dataString + 'T00:00:00'); 
    return dias[data.getDay()];
}

// Função para carregar e exibir os dados
function renderizarTabela() {
    tabelaCorpo.innerHTML = ""; // Limpa a tabela antes de desenhar
    const agendamentos = JSON.parse(localStorage.getItem('meus_agendamentos')) || [];

    agendamentos.forEach(item => {
        const linha = document.createElement('tr');
        
        // Criamos as células (td) para cada coluna
        linha.innerHTML = `
            <td>${item.diaSemana}</td>
            <td>${item.data}</td>
            <td>${item.horario}</td>
            <td>${item.servico}</td>
        `;
        
        tabelaCorpo.appendChild(linha);
    });
}

form.addEventListener('submit', (e) => {
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

    form.reset(); // Limpa o formulário
    renderizarTabela(); // Atualiza a planilha visual
    
    // Exibe a mensagem de sucesso
    alert("Agendamento concluído. Esperamos por você! 😊");
    // -------------------------

    form.reset();
    renderizarTabela();
});

// Inicia a página mostrando o que já está salvo
renderizarTabela();
