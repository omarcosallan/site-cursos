export function load(cursos) {
  const cursoTitulo = document.querySelector(".titulo");
  const descricao = document.querySelector(".curso-card-descricao");
  const metodologia = document.querySelector(".curso-card-metodologia");
  const conteudo = document.querySelector(".curso-card-conteudo");
  const recursos = document.querySelector(".curso-card-recursos");

  const curso = cursos.find(
    (curso) => curso.titulo === cursoTitulo.textContent
  );
  descricao.innerText = curso.descricao;
  metodologia.innerText = curso.metodologia;
  carregaLista(conteudo, curso.conteudo);
  carregaLista(recursos, curso.recursos);
}

function carregaLista(lista, items) {
  items = items.split(";");
  items.forEach((item) => {
    const elemento = document.createElement("li");
    elemento.textContent = item;
    lista.appendChild(elemento);
  });
}
