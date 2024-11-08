document.addEventListener('DOMContentLoaded', carregarTarefas);

function adicionarTarefa() {
    const tarefaInput = document.getElementById('novaTarefa');
    const tarefa = tarefaInput.value;
    if (tarefa) {
        const listaTarefas = document.getElementById('listaTarefas');
        const li = document.createElement('li');
        li.textContent = tarefa;
        listaTarefas.appendChild(li);
        salvarTarefas();
        tarefaInput.value = '';
    }
}

function removerTarefas() {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = '';
    localStorage.removeItem('tarefas');
}

function salvarTarefas() {
    const listaTarefas = document.getElementById('listaTarefas');
    const tarefas = [];
    for (let i = 0; i < listaTarefas.children.length; i++) {
        tarefas.push(listaTarefas.children[i].textContent);
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefas) {
        const listaTarefas = document.getElementById('listaTarefas');
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.textContent = tarefa;
            listaTarefas.appendChild(li);
        });
    }
}
