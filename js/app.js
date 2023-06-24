import { load } from "../carrega-pagina.js";
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

let cursos = [
  {
    titulo: "Curso de Ciência de Dados",
    vagas: 30,
    descricao:
      "Este curso tem como objetivo ensinar aos alunos as habilidades necessárias para se tornarem cientistas de dados eficazes, incluindo a coleta e análise de grandes conjuntos de dados, a construção de modelos preditivos e a visualização de dados. Os alunos aprenderão a usar ferramentas populares de ciência de dados, como Python, R e SQL.",
    metodologia:
      "O curso é ministrado online, com aulas gravadas e tutoriais práticos. Os alunos terão acesso a fóruns de discussão para interagir com outros alunos e professores.",
    conteudo:
      "Introdução à ciência de dados;Coleta e limpeza de dados;Análise exploratória de dados;Construção de modelos preditivos;Visualização de dados",
    recursos: "Python;R;SQL;Jupyter Notebook;Pandas;NumPy;Matplotlib",
  },
  {
    titulo: "Curso de Segurança da Informação",
    vagas: 30,
    descricao:
      "Este curso tem como objetivo ensinar aos alunos as melhores práticas de segurança da informação, incluindo a proteção de sistemas e dados contra ameaças cibernéticas. Os alunos aprenderão a identificar vulnerabilidades e a implementar medidas de segurança para garantir a integridade, confidencialidade e disponibilidade dos dados.",
    metodologia:
      "O curso é ministrado online, com aulas gravadas e tutoriais práticos. Os alunos terão acesso a fóruns de discussão para interagir com outros alunos e professores.",
    conteudo:
      "Introdução à segurança da informação;Criptografia;Redes seguras;Gerenciamento de riscos;Compliance e regulamentação",
    recursos: "Kali Linux;Wireshark;Metasploit;Nmap;OpenSSL",
  },
  {
    titulo: "Curso de Aprendizado de Máquina (Machine Learning)",
    vagas: 30,
    descricao:
      "O objetivo deste curso é ensinar aos alunos os fundamentos do aprendizado de máquina, incluindo regressão, classificação, agrupamento e redes neurais. Os alunos aprenderão a usar ferramentas como Python, Jupyter Notebook, Scikit-learn, TensorFlow, Keras e NLTK para construir modelos de aprendizado de máquina e processamento de linguagem natural. Os alunos também aprenderão como avaliar a precisão de seus modelos e como ajustá-los para obter melhores resultados. No final do curso, os alunos estarão preparados para aplicar o aprendizado de máquina em uma variedade de problemas do mundo real.",
    metodologia:
      "O curso é ministrado online, com aulas gravadas e tutoriais práticos. Os alunos terão acesso a fóruns de discussão para interagir com outros alunos e professores.",
    conteudo:
      "Introdução ao aprendizado de máquina;Regressão;Classificação;Agrupamento;Redes Neurais;Processamento de Linguagem Natural",
    recursos: "Python;Jupyter Notebook;Scikit-learn;TensorFlow;Keras;NLTK",
  },
  {
    titulo: "Curso de Desenvolvimento de Jogos",
    vagas: 30,
    descricao:
      "Este curso tem como objetivo ensinar aos alunos os fundamentos do desenvolvimento de jogos, incluindo o design de jogos, a programação de jogos e o desenvolvimento de jogos para diferentes plataformas. Os alunos aprenderão a usar as ferramentas de desenvolvimento de jogos mais populares para criar jogos divertidos e interativos.",
    metodologia:
      "O curso é ministrado online, com aulas gravadas e tutoriais práticos. Os alunos terão acesso a fóruns de discussão para interagir com outros alunos e professores.",
    conteudo:
      "Introdução ao desenvolvimento de jogos;Programação de jogos;Design de jogos;Criação de jogos para plataformas específicas;Publicação de jogos na loja de aplicativos",
    recursos: "Unity 3D;Visual Studio;Photoshop;Illustrator",
  },
];

window.addEventListener("load", () => {
  // Adicionar os cursos no localStorage se ainda não estiverem definidos
  if (!localStorage.getItem("cursos")) {
    localStorage.setItem("cursos", JSON.stringify(cursos));
  }

  // Obter os cursos do localStorage
  cursos = JSON.parse(localStorage.getItem("cursos"));

  load(cursos);

  // Verificar se há vagas disponíveis
  vagasDisponiveis(cursos);

  listaAlunos();

  atualizaVagas(cursos);

  // Carregar as pessoas matriculadas
  carregarPessoas();
});
