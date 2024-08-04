// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyA6TcQoVrdDhX95A_ylvmFiqToZsRkl8lg",
authDomain: "manutencao-sr.firebaseapp.com",
projectId: "manutencao-sr",
storageBucket: "manutencao-sr.appspot.com",
messagingSenderId: "550208038376",
appId: "1:550208038376:web:2564f664010a78abc4705d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Inicializar o Firestore
const db = getFirestore(app);

// Função para consultar todos os documentos
window.fetchTarefas = async function(id){
  try {
  const querySnapshot = await getDocs(collection(db, "tarefas"));
  querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  } catch (error) {
  console.error("Erro ao consultar documentos:", error);
  }
  }
  
  fetchTarefas();


  // Função para apagar um documento
window.deleteTarefa = async function(id) {
  try {
  await deleteDoc(doc(db, "tarefas", id));
  console.log(`Documento com ID ${id} apagado com sucesso!`);
  } catch (error) {
  console.error("Erro ao apagar documento:", error);
  }
  clearTable();
  populateTable();
  }

    // Função para editar um documento
    window.editTarefa = async function(id) {
      try {
        // Obter o documento da tarefa pelo ID
        const docRef = doc(db, "tarefas", id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const tarefa = docSnap.data();
          
          // Preencher o formulário com os dados da tarefa
          document.getElementById('conclusao').checked = tarefa.conclusao;
          document.getElementById('data').value = tarefa.data;
          document.getElementById('localizacao').value = tarefa.localizacao;
          document.getElementById('problema').value = tarefa.problema;
          document.getElementById('responsavel').value = tarefa.responsavel;
          
          // Salvar o ID da tarefa em um campo oculto ou variável global
          document.getElementById('tarefaId').value = id;
        } else {
          console.log("Nenhuma tarefa encontrada com esse ID.");
        }
      } catch (error) {
        console.error("Erro ao consultar documento para edição:", error);
      }
    }
    
  
  // Exemplo de uso
  /*   deleteTarefa("1"); */ // Substitua "2" pelo ID do documento que deseja apagar

  

  // Função para preencher a tabela com dados do Firestore
async function populateTable() {
  try {
  const querySnapshot = await getDocs(collection(db, "tarefas"));
  const tableBody = document.getElementById("tarefasTable").getElementsByTagName("tbody")[0];
  
  querySnapshot.forEach((doc) => {
  const tarefa = doc.data();
  const row = tableBody.insertRow();
  
  row.insertCell(0).textContent = doc.id;
  row.insertCell(1).textContent = tarefa.conclusao ? "Sim" : "Não";
  row.insertCell(2).textContent = tarefa.data;
  row.insertCell(3).textContent = tarefa.localizacao;
  row.insertCell(4).textContent = tarefa.problema;
  row.insertCell(5).textContent = tarefa.responsavel;
  
  // Adiciona botões de ação
  const actionCell = row.insertCell(6);
  actionCell.className = "action-buttons";
  actionCell.innerHTML = `
    <button class="edit-button" onclick="editTarefa('${doc.id}')">Editar</button>
    <button class="delete-button" onclick="deleteTarefa('${doc.id}')">Excluir</button>
  `;
  });
  } catch (error) {
  console.error("Erro ao consultar documentos:", error);
  }
  }

  populateTable();


  window.clearTable = function() {
    const tableBody = document.getElementById("tarefasTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''; // Remove todas as linhas da tabela
    };




// Dados para inserir
// Cria um objeto com os dados do formulário

const tarefas = [
{
id: "0",
conclusao: "true",
data: "Carregando...",
localizacao: "Carregando...",
problema: "Carregando...",
responsavel: "Carregando..."
}
];  

window.incluirTarefas = async function(id) {
  try {
    for (const tarefa of tarefas) {
    await setDoc(doc(db, "tarefas", tarefa.id), tarefa);
    console.log(`Documento com ID ${tarefa.id} inserido com sucesso!`);
  }
  } catch (error) {
    console.error("Erro ao inserir documentos:", error);
  }
  deleteTarefa("0");
  populateTable();
}

// Adiciona o evento de submit ao formulário
document.getElementById('tarefasForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do envio do formulário
  inserirTarefas(); // Chama a função para coletar as tarefas
}); 


function getFormData() {
  return {
    id: Date.now().toString(), // Gerar um ID único com base no timestamp atual
    conclusao: document.getElementById('conclusao').checked,
    data: document.getElementById('data').value,
    localizacao: document.getElementById('localizacao').value,
    problema: document.getElementById('problema').value,
    responsavel: document.getElementById('responsavel').value
  };
}

function inserirTarefas() {
  const tarefaId = document.getElementById('tarefaId').value;
  const tarefa = getFormData();

  if (tarefaId) {
    // Se existe um ID, estamos editando uma tarefa existente
    tarefa.id = tarefaId;
    atualizarTarefa(tarefa);
  } else {
    // Se não há ID, estamos criando uma nova tarefa
    tarefa.id = Date.now().toString(); // Gerar um ID único com base no timestamp atual
    tarefas.push(tarefa);
    incluirTarefas();
  }
  
  console.log('Tarefas atualizadas:', tarefas);
  clearForm(); // Limpar o formulário após enviar
}

window.atualizarTarefa = async function(tarefa) {
  try {
    // Atualizar o documento da tarefa com os novos dados
    await setDoc(doc(db, "tarefas", tarefa.id), tarefa);
    console.log(`Documento com ID ${tarefa.id} atualizado com sucesso!`);
    
    clearTable();
    populateTable();
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
  }
}

function clearForm() {
  document.getElementById('tarefasForm').reset();
  document.getElementById('tarefaId').value = ''; // Resetar o campo oculto do ID
}

