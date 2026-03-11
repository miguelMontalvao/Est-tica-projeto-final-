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
