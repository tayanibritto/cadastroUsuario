//Pesquisa de CEP

document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepPesquisar = elemento.value;

    if(!cepPesquisar.length === 8){
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepPesquisar}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            } else {
                alert("Favor digitar um número de CEP válido.");
            }
        })
        .catch(error => alert(`Código de erro de CEP: ${error}. Verificar se o número digitado é válido.`));
});

//Salvar informações em Local Storage

document.getElementById('salvarInformacoes').addEventListener('click', () => {
    const nomeCompletoForm = document.getElementById('nomeCompleto');
    const cpfForm = document.getElementById('cpf');
    const cepForm = document.getElementById('cep');
    const logradouroForm = document.getElementById('logradouro');
    const bairroForm = document.getElementById('bairro');
    const cidadeForm = document.getElementById('cidade');
    const estadoForm = document.getElementById('estado');
    const numeroForm = document.getElementById('numero');

    const formDados = {
        nomeCompleto: nomeCompletoForm.value,
        cpf: cpfForm.value,
        cep: cepForm.value,
        logradouro: logradouroForm.value,
        bairro: bairroForm.value,
        cidade: cidadeForm.value,
        estado: estadoForm.value,
        numero: numeroForm.value
    };

    const salvarDados = JSON.stringify(formDados);

    localStorage.setItem('dadosSalvos', salvarDados);

    console.log('Dados salvos.');
});

//Recupera os dados do formulário

window.addEventListener('load', () => {
    const recuperarDados = localStorage.getItem('dadosSalvos');

    if (recuperarDados) {
        const dados = JSON.parse(recuperarDados);
        const form = document.getElementById('formCadastro');

       for (const chave in dados) {
        const elemento = form.elements[chave];
        elemento.value = dados[chave];
       }
    }
});
