// Armazena elementos para o html 
var valorInput = document.getElementById("valor");
var categoriaSelect = document.getElementById("categoria");
var unidadeOrigemSelect = document.getElementById("unidadeOrigem");
var unidadeDestinoSelect = document.getElementById("unidadeDestino");
var converterButton = document.getElementById("converterButton");
var resultadoInput = document.getElementById("resultado");

// Atualiza as opcoes que é obtida do valor e retorna um Array de unidades correspondentes
categoriaSelect.addEventListener("change", atualizarUnidadesDeOrigem);

unidadeOrigemSelect.addEventListener("change", atualizarUnidadesDeDestino);

converterButton.addEventListener("click", converter);

// Limpa as opcoes dos elementos
function atualizarUnidadesDeOrigem() {
    unidadeOrigemSelect.innerHTML = "";

    var categoriaSelecionada = categoriaSelect.value;
    var unidadesDeOrigem = obterUnidadesDeOrigem(categoriaSelecionada);

    unidadesDeOrigem.forEach(function (unidade) {
        var option = document.createElement("option");
        option.value = unidade;
        option.text = unidade;

        unidadeOrigemSelect.appendChild(option);
    });
}

// Retorna um Array de unidades de origem com base na categoria
function obterUnidadesDeOrigem(categoria) {
    switch (categoria) {
        case "comprimento":
            return ["metros", "centimetros", "polegadas"];
        case "peso":
            return ["quilogramas", "gramas", "libras"];
        case "temperatura":
            return ["Celsius", "Fahrenheit", "Kelvin"];
        default:
            return [];
    }
}

// Atualiza as opcoes dos elementos
function atualizarUnidadesDeDestino() {
    unidadeDestinoSelect.innerHTML = "";

    var categoriaSelecionada = categoriaSelect.value;
    var unidadeOrigemSelecionada = unidadeOrigemSelect.value;
    var unidadesDeDestino = obterUnidadesDeDestino(categoriaSelecionada, unidadeOrigemSelecionada);

    unidadesDeDestino.forEach(function (unidade) {
        var option = document.createElement("option");
        option.value = unidade;
        option.text = unidade;

        unidadeDestinoSelect.appendChild(option);
    });
}

// Retorna um Array de unidade de destino com base na categoria e unidade de origem
function obterUnidadesDeDestino(categoria, unidadeOrigem) {
    switch (categoria) {
        case "comprimento":
            return ["metros", "centimetros", "polegadas"].filter
                (function (unidade) {
                    return unidade !== unidadeOrigem;
                });
        case "peso":
            return ["quilogramas", "gramas", "libras"].filter
                (function (unidade) {
                    return unidade !== unidadeOrigem;
                });
        case "temperatura":
            return ["Celsius", "Fahrenheit", "Kelvin"].filter(function (unidade) {
                return unidade !== unidadeOrigem;
            });
        default:
            return [];
    }
}
// Retorna o valor convertido e caso estiver vazio ele retorna a msg de alerta 
function converter() {
    var valor = parseFloat(valorInput.value);
    var categoria = categoriaSelect.value;
    var unidadeOrigem = unidadeOrigemSelect.value;
    var unidadeDestino = unidadeDestinoSelect.value;

    if (isNaN(valor) || categoria === "" || unidadeOrigem === "" || unidadeDestino === "") {
        alert("Preencha todos os campos antes de converter.");
        return;
    }

    let resultado;

// Recebe os parametros para a conversão
    switch (categoria) {
        case "comprimento":
            resultado = converterComprimento(valor, unidadeOrigem, unidadeDestino);
            break;
        case "peso":
            resultado = converterPeso(valor, unidadeOrigem, unidadeDestino);
            break;
        case "temperatura":
            resultado = converterTemperatura(valor, unidadeOrigem, unidadeDestino);
            break;
        default:
            resultado = "";
    }
    resultadoInput.value = resultado;
}
// Realiza as conversoes especificas para cada categoria de medida
function converterComprimento(valor, unidadeOrigem, unidadeDestino) {
    switch (unidadeOrigem) {
        case "metros":
            switch (unidadeDestino) {
                case "centimetros":
                    return valor * 100;
                case "polegadas":
                    return valor * 39.3701;
                default:
                    return "";
            }
        case "centimetros":
            switch (unidadeDestino) {
                case "metros":
                    return valor / 100;
                case "polegadas":
                    return valor * 0.393701;
                default:
                    return "";
            }
        case "polegadas":
            switch (unidadeDestino) {
                case "metros":
                    return valor / 39.3701;
                    case "centimetros":
                        return valor / 0.393701;
                default:
                    return "";
            }
        default:
            return "";
    }

}
// Realiza as conversoes especificas para cada categoria de peso

function converterPeso(valor, unidadeOrigem, unidadeDestino) {
    switch (unidadeOrigem) {
        case "quilogramas":
            switch (unidadeDestino) {
                case "gramas":
                    return valor * 1000;
                case "libras":
                    return valor * 2.20462;
                default:
                    return "";
            }
        case "gramas":
            switch (unidadeDestino) {
                case "quilogramas":
                    return valor / 1000;
                case "libras":
                    return valor * 0.00220462;
                default:
                    return "";
            }
        case "libras":
            switch (unidadeDestino) {
                case "quilogramas":
                    return valor / 2.20462;
                case "gramas":
                    return valor / 0.00220462;
                default:
                    return "";
            }
        default:
            return "";
    }
}
// Realiza as conversoes especificas para cada categoria de temperatura

function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
    switch (unidadeOrigem) {
        case "Celsius":
            switch (unidadeDestino) {
                case "Fahrenheit":
                    return valor * 1.8 + 32;
                case "Kelvin":
                    return valor + 273.15;
                default:
                    return "";
            }
        case "Fahrenheit":
            switch (unidadeDestino) {
                case "Celsius":
                    return (valor - 32) / 1.8;
                case "Kelvin":
                    return (valor + 459.67) / 1.8;
                default:
                    return "";
            }
        case "Kelvin":
            switch (unidadeDestino) {
                case "Celsius":
                    return valor - 273.15;
                case "Fahrenheit":
                    return valor * 1.8 - 459.67;
                default:
                    return "";
            }
        default:
            return "";
    }
}