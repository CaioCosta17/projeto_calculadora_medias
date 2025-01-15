const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./Midias/aprovado.png" alt="Emoji Celebrando" />';
const imgReprovado = '<img src="./Midias/reprovado.png" alt="Emoji Decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima:'));

//Fazendo com que uma nova linha de resultados seja exibida em vez de substituir a atual
    let linhas = '';//Para seu funcionamento ela deve estar no topo do código no escopo global

//Criando o evento de submit
form.addEventListener('submit', function(e) {
    e.preventDefault(); //Removendo a função do submit de atualizar a tela

//Sequência em que as funções são chamadas
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

//Função resposável por adicionar novas linhas
function adicionaLinha() {
//Capturando os inputs dos campos, Nome e Nota da Atividade 
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

//Verificando se o nome da atividade existe no array, caso não existá poderá ser adicionada, caso existá, não poderá ser adicionada
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida.`)
    } else {
//Fazendo um push dos array's para adicionar o conteúdo
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

//Adicionando os resultados no corpo da tebala como uma linha 
    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado }</td>`;//Criando validação se a nota for maior que 7 está aprovado, se menor não
    linha += '</tr>';

//Concatenando a váriavel linha na váriavel linhas
    linhas += linha;
    };

//Inserindo função de limpar o campo após adicionado
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
};

//Função responsável por atualizar os resultados do corpo da tabela
function atualizaTabela() {

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;//Inserindo o conteúdo dentro da tag

};

//Função responsável por atulizar as informações da média
function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

//Função responsável pelo cálculo da média
function calculaMediaFinal() {
//Responsável pela soma das notas
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]
    }
//Responsável pela divisão entre as atividades
    return somaDasNotas / notas.length; 
}