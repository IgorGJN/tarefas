// Exemplo de uso
const id = [3, 7, 15, 23];

function gerarID(min, max, arrayExistente) {
    let numeroAleatorio;

    // Loop até gerar um número que não esteja no array
    do {
        numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (arrayExistente.includes(numeroAleatorio));

    return numeroAleatorio;
}

const novoID = gerarID(100, 1000, id);




// Adiciona o evento de submit ao formulário
document.getElementById('tarefasForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do envio do formulário
    
    coletarTarefas(); // Chama a função para coletar as tarefas
});

function coletarTarefas(){

    const tarefas = [];
    console.log(tarefas)

    const tarefa = {
        id: 11,
        conclusao: document.getElementById('conclusao').value,
        data: document.getElementById('data').value,
        localizacao: document.getElementById('localizacao').value,
        problema: document.getElementById('problema').value,
        responsavel: document.getElementById('responsavel').value,
    }

        tarefas.push(tarefa); // Adiciona a tarefa ao array de tarefas

        console.log(tarefa)
        console.log(tarefas)
    }


