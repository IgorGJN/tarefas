// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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


  // Dados para inserir
             // Cria um objeto com os dados do formulário
/* const tarefas = {
  conclusao: formData.get("conclusao") === "on",
  data: formData.get("data"),
  localizacao: formData.get("localizacao"),
  problema: formData.get("problema"),
  responsavel: formData.get("responsavel")
}; */

const tarefas = [
    {
      id: "2",
      conclusao: "true",
      data: "2024-08-02",
      localizacao: "Local A",
      problema: "Problema X",
      responsavel: "Responsável 1"
    },
    {
      id: "3",
      conclusao: "false",
      data: "2024-08-03",
      localizacao: "Local B",
      problema: "Problema Y",
      responsavel: "Responsável 2"
    },
    {
      id: "4",
      conclusao: "true",
      data: "2024-08-04",
      localizacao: "Local C",
      problema: "Problema Z",
      responsavel: "Responsável 3"
    }
  ]; 
  
  // Função para inserir documentos
window.insertTarefas = async function(id) {
    try {
      for (const tarefa of tarefas) {
        await setDoc(doc(db, "tarefas", tarefa.id), tarefa);
        console.log(`Documento com ID ${tarefa.id} inserido com sucesso!`);
      }
    } catch (error) {
      console.error("Erro ao inserir documentos:", error);
    }
  }
/*   
  insertTarefas(); */


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
  
  // Exemplo de uso
/*   deleteTarefa("1"); */ // Substitua "2" pelo ID do documento que deseja apagar


/* 
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
              });
            } catch (error) {
              console.error("Erro ao consultar documentos:", error);
            }
          }
  
          // Chama a função para preencher a tabela
          populateTable();
 */


          
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
  
          // Função para apagar um documento
/*           async function deleteTarefa(id) {
            try {
              await deleteDoc(doc(db, "tarefas", id));
              alert(`Documento com ID ${id} apagado com sucesso!`);
              location.reload(); // Recarrega a página para atualizar a tabela
            } catch (error) {
              console.error("Erro ao apagar documento:", error);
            }
          } */
  
          // Função para editar um documento (exemplo básico)
          function editTarefa(id) {
            // Aqui você pode implementar uma interface para editar os dados
            // Por exemplo, mostrar um formulário pré-preenchido
            alert(`Editar tarefa com ID ${id}. Implemente a função de edição.`);
          }
  
          // Chama a função para preencher a tabela
          populateTable();


                  // Função para limpar a tabela

          window.clearTable = function() {
            const tableBody = document.getElementById("tarefasTable").getElementsByTagName("tbody")[0];
            tableBody.innerHTML = ''; // Remove todas as linhas da tabela
          };


                  // Função para limpar o formulário
        function clearForm() {
            document.getElementById("tarefasForm").reset();
        }

        // Função para lidar com o envio do formulário
        document.getElementById("tarefasForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            const formData = new FormData(event.target);

/*             // Cria um objeto com os dados do formulário
            const tarefas = {
                conclusao: formData.get("conclusao") === "on",
                data: formData.get("data"),
                localizacao: formData.get("localizacao"),
                problema: formData.get("problema"),
                responsavel: formData.get("responsavel")
            }; */

            console.log("Dados do formulário:", tarefas);

            // Aqui você pode adicionar o código para enviar os dados para o Firestore
            // e outros processos necessários

            // Limpar o formulário após o envio (opcional)
            event.target.reset();
        });