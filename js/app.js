import {
  adicionarPessoa,
  atualizaVagas,
  carregarPessoas,
  listaAlunos,
  vagasDisponiveis,
} from "./matriculados.js";
import { formataCPF, valida, validaCPF } from "./validacao.js";

carregarPessoas();

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("blur", (evento) => {
    valida(evento.target);
  });
});

const cpfInput = document.getElementById("cpf");
cpfInput.addEventListener("blur", () => {
  validaCPF(cpfInput);
  formataCPF(cpfInput);
});

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();

  const cpfInput = document.getElementById("cpf");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const titulo = document.querySelector(".titulo");

  if (validaCPF(cpfInput) && valida(nomeInput) && valida(emailInput)) {
    adicionarPessoa(
      cpfInput.value,
      nomeInput.value.toUpperCase(),
      emailInput.value,
      titulo.innerText
    );

    cpfInput.value = "";
    nomeInput.value = "";
    emailInput.value = "";
  } else {
    let mensagemInvalida = document.querySelector(".mensagem-invalida");
    mensagemInvalida.textContent =
      "❌ Alguns campos estão vazios, preencha-os.";
    setTimeout(() => {
      mensagemInvalida.textContent = ""; // Remover o texto após 4 segundos
    }, 4000);
  }
});

document
  .querySelector(".visualizar-matriculados")
  .addEventListener("click", () => {
    document.getElementById("lista-pessoas").classList.toggle("lista-clicado");
  });

let cursos = {
  "Curso de Ciência de Dados": 30,
  "Curso de Desenvolvimento de Jogos": 30,
  "Curso de Aprendizado de Máquina (Machine Learning)": 30,
  "Curso de Segurança da Informação": 30,
};

window.addEventListener("load", () => {
  // Adicionar os cursos no localStorage se ainda não estiverem definidos
  if (!localStorage.getItem("cursos")) {
    localStorage.setItem("cursos", JSON.stringify(cursos));
  }

  // Obter os cursos do localStorage
  cursos = JSON.parse(localStorage.getItem("cursos"));

  // Verificar se há vagas disponíveis
  vagasDisponiveis(cursos);

  listaAlunos();

  atualizaVagas(cursos);

  // Carregar as pessoas matriculadas
  carregarPessoas();
});
