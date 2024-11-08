let totalTarefas = 0;
let tarefasConcluidas = 0;
let tarefasPendentes = 0;

function atualizarContadores() {
    document.getElementById('totalTarefas').innerText = totalTarefas;
    document.getElementById('tarefasConcluidas').innerText = tarefasConcluidas;
    document.getElementById('tarefasPendentes').innerText = tarefasPendentes;
    salvarDados();
}

function salvarDados() {
    // Salvar contadores no localStorage
    localStorage.setItem('totalTarefas', totalTarefas);
    localStorage.setItem('tarefasConcluidas', tarefasConcluidas);
    localStorage.setItem('tarefasPendentes', tarefasPendentes);

    // Salvar lista de tarefas no localStorage
    const tarefas = [];
    const listaTarefas = document.getElementById('listaTarefas').getElementsByTagName('li');
    for (let li of listaTarefas) {
        tarefas.push({
            tarefa: li.childNodes[0].nodeValue.trim(),
            concluida: li.style.textDecoration === 'line-through',
            categoria: li.childNodes[1].nodeValue.trim(),
            prioridade: li.childNodes[2].nodeValue.trim()
        });
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarDados() {
    // Carregar contadores do localStorage
    totalTarefas = parseInt(localStorage.getItem('totalTarefas')) || 0;
    tarefasConcluidas = parseInt(localStorage.getItem('tarefasConcluidas')) || 0;
    tarefasPendentes = parseInt(localStorage.getItem('tarefasPendentes')) || 0;

    // Carregar tarefas do localStorage
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
        totalTarefas++;
        if (tarefa.concluida) {
            tarefasConcluidas++;
        } else {
            tarefasPendentes++;
        }

        const li = document.createElement('li');
        li.className = 'tarefa';
        li.innerHTML = `
            ${tarefa.tarefa} - ${tarefa.categoria} - ${tarefa.prioridade}
            <button onclick="completarTarefa(this)">Completar</button>
            <button onclick="removerTarefa(this)">Remover</button>
        `;
        if (tarefa.concluida) {
            li.style.textDecoration = 'line-through';
        }
        document.getElementById('listaTarefas').appendChild(li);
    });

    atualizarContadores();
}

function adicionarTarefa() {
    const tarefa = document.getElementById('novaTarefa').value;
    const categoria = document.getElementById('categoria').value;
    const prioridade = document.getElementById('prioridade').value;

    if (tarefa === '') {
        alert('Por favor, digite uma tarefa.');
        return;
    }

    totalTarefas++;
    tarefasPendentes++;
    atualizarContadores();

    const li = document.createElement('li');
    li.className = 'tarefa';
    li.innerHTML = `
        ${tarefa} - ${categoria} - ${prioridade}
        <button onclick="completarTarefa(this)">Completar</button>
        <button onclick="removerTarefa(this)">Remover</button>
    `;
    document.getElementById('listaTarefas').appendChild(li);

    document.getElementById('novaTarefa').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('prioridade').value = '';
}

function completarTarefa(button) {
    const li = button.parentElement;
    li.style.textDecoration = 'line-through';
    tarefasConcluidas++;
    tarefasPendentes--;
    atualizarContadores();
}

function removerTarefa(button) {
    const li = button.parentElement;
    li.remove();
    totalTarefas--;
    if (li.style.textDecoration === 'line-through') {
        tarefasConcluidas--;
    } else {
        tarefasPendentes--;
    }
    atualizarContadores();
}

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', carregarDados);
