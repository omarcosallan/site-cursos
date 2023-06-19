export function valida(input) {
  const inputCPF = document.getElementById("cpf");
  inputCPF.addEventListener("input", () => {
    formataCPF(inputCPF);
    validaCPF(inputCPF);
  });

  if (!input.validity.valid) {
    input.classList.remove("campo-valido");
    input.classList.add("campo-invalido");
    return false;
  } else {
    input.classList.add("campo-valido");
    input.classList.remove("campo-invalido");
  }
  return true;
}

export function validaCPF(input) {
  const cpfFormatado = input.value.replace(/\D/g, "");
  if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
    input.classList.add("campo-invalido");
    return false;
  } else {
    input.classList.remove("campo-invalido");
  }
  return true;
}

function checaCPFRepetido(cpf) {
  const valoresRepetidos = [
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ]; // Valores de CPF inválidos com todos os digitos repetidos
  return !valoresRepetidos.includes(cpf);
}

function checaEstruturaCPF(cpf) {
  const cpfSemDigitos = cpf.replace(/\D/g, "");
  const digitoVerificador1 = cpfSemDigitos.charAt(9);
  const digitoVerificador2 = cpfSemDigitos.charAt(10);

  let soma = 0;
  let resto;

  // Cálculo do primeiro dígito verificador
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfSemDigitos.charAt(i)) * (10 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === parseInt(digitoVerificador1)) {
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfSemDigitos.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    return resto === 10 || resto === parseInt(digitoVerificador2);
  }
  return false;
}

export function formataCPF(input) {
  const cpf = input.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos do valor do CPF

  // Verifica se o CPF possui até 11 dígitos
  if (cpf.length <= 11) {
    // Formata o CPF com os pontos e o hífen
    let cpfFormatado = cpf;

    // Adiciona os pontos
    if (cpf.length > 3 && cpf.length <= 6) {
      cpfFormatado = cpf.substr(0, 3) + "." + cpf.substr(3);
    } else if (cpf.length > 6 && cpf.length <= 9) {
      cpfFormatado =
        cpf.substr(0, 3) + "." + cpf.substr(3, 3) + "." + cpf.substr(6);
    }

    // Adiciona o hífen
    if (cpf.length === 11) {
      cpfFormatado =
        cpf.substr(0, 3) +
        "." +
        cpf.substr(3, 3) +
        "." +
        cpf.substr(6, 3) +
        "-" +
        cpf.substr(9);
    }

    // Define o valor formatado no campo de CPF
    input.value = cpfFormatado;
  }
}
