const listaPessoas = document.getElementById("lista-pessoas");

export function adicionarPessoa(cpf, nome, email, curso) {
  const cursosLocalStorage = localStorage.getItem("cursos");
  const alunosLocalStorage = localStorage.getItem("alunos");

  if (!cursosLocalStorage) {
    alert("Nenhum curso encontrado");
    return;
  }

  const alunos = alunosLocalStorage ? JSON.parse(alunosLocalStorage) : [];
  const cursos = JSON.parse(cursosLocalStorage);

  // Verificar se há vagas disponíveis
  if (vagasDisponiveis(cursos, curso)) {
    let mensagemInvalida = document.querySelector(".mensagem-invalida");
    mensagemInvalida.textContent =
      "❌ Não há vagas disponíveis para este curso.";
    setTimeout(() => {
      mensagemInvalida.textContent = ""; // Remover o texto após 4 segundos
    }, 4000);
    return;
  }

  const cpfExistente = alunos.find((p) => p.cpf === cpf && p.curso === curso);
  if (cpfExistente) {
    let mensagemInvalida = document.querySelector(".mensagem-invalida");
    mensagemInvalida.textContent = "❌ CPF já cadastrado para este curso.";
    setTimeout(() => {
      mensagemInvalida.textContent = ""; // Remover o texto após 4 segundos
    }, 4000);
    return;
  }

  const aluno = { cpf, nome, email, curso };
  alunos.push(aluno);
  localStorage.setItem("alunos", JSON.stringify(alunos));

  // Atualizar o número de vagas no localStorage
  cursos[curso] -= 1;
  localStorage.setItem("cursos", JSON.stringify(cursos));

  vagasDisponiveis(cursos);
  carregarPessoas();
  atualizaVagas(cursos);
}

function adicionarPessoaNaLista(cpf, nome, email) {
  const itemLista = document.createElement("li");
  const textoItem = document.createTextNode(`${cpf} - ${nome} - ${email}`);

  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.classList.add("btn-excluir");
  botaoExcluir.addEventListener("click", function () {
    excluirPessoa(cpf);
  });

  itemLista.appendChild(textoItem);
  itemLista.appendChild(botaoExcluir);
  listaPessoas.appendChild(itemLista);
}

function excluirPessoa(cpf) {
  // Obter a lista de pessoas do LocalStorage
  const pessoasSalvas = localStorage.getItem("alunos");
  let pessoas = [];

  if (pessoasSalvas) {
    pessoas = JSON.parse(pessoasSalvas);
  }

  // Encontrar o índice do aluno com o CPF fornecido
  const indice = pessoas.findIndex((pessoa) => pessoa.cpf === cpf);

  if (indice !== -1) {
    // Remover o aluno da lista
    const alunoRemovido = pessoas.splice(indice, 1)[0];

    // Atualizar o LocalStorage com a nova lista de pessoas
    localStorage.setItem("alunos", JSON.stringify(pessoas));

    // Acrescentar uma vaga ao curso do aluno removido
    const cursosSalvos = localStorage.getItem("cursos");
    let cursos = {};

    if (cursosSalvos) {
      cursos = JSON.parse(cursosSalvos);
    }

    if (cursos && cursos.hasOwnProperty(alunoRemovido.curso)) {
      cursos[alunoRemovido.curso] += 1;
    }

    // Atualizar o LocalStorage com a nova quantidade de vagas do curso
    localStorage.setItem("cursos", JSON.stringify(cursos));

    // Recarregar a lista de pessoas e as vagas
    vagasDisponiveis(cursos);
    carregarPessoas();
    atualizaVagas(cursos);
  }
}

export function carregarPessoas() {
  const curso = document.querySelector(".titulo").innerText;

  listaPessoas.innerHTML = "";
  const pessoasSalvas = localStorage.getItem("alunos");

  if (pessoasSalvas) {
    const pessoas = JSON.parse(pessoasSalvas);

    pessoas
      .filter((pessoa) => pessoa.curso == curso)
      .forEach((p) => {
        adicionarPessoaNaLista(p.cpf, p.nome, p.email);
      });
  }
  listaAlunos();
}

export function atualizaVagas(cursos) {
  const tituloElement = document.querySelector(".titulo");
  const vagasElement = document.querySelector(".vagas");
  vagasElement.textContent = `${cursos[tituloElement.textContent]} vagas`;
}

export function listaAlunos() {
  const tituloElement = document.querySelector("#lista-titulo");
  const curso = document.querySelector(".titulo").innerText;

  const cursosSalvos = localStorage.getItem("cursos");
  const cursos = JSON.parse(cursosSalvos);

  const pessoasSalvas = localStorage.getItem("alunos");
  const pessoas = JSON.parse(pessoasSalvas);

  if (pessoas != null) {
    let matriculados = pessoas.filter(
      (pessoa) => pessoa.curso === curso
    ).length;
    tituloElement.textContent = `${matriculados} alunos matriculados. Restam ${cursos[curso]} vagas.`;
  } else {
    tituloElement.textContent = `Não há alunos matriculados.`;
  }
}

export function vagasDisponiveis(cursos) {
  // Verificar se há vagas disponíveis
  const curso = document.querySelector(".titulo").innerText;
  if (cursos[curso] === 0) {
    document.querySelector("form").style.display = "none";
    console.log(listaPessoas.parentElement.parentElement);
    listaPessoas.parentElement.parentElement.style.display = "initial";
  } else {
    document.querySelector("form").style.display = "flex";
    listaPessoas.parentElement.parentElement.style.display = "grid";
  }
}
