document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const btAdicionarCampo = document.getElementById('btAdicionarCampo');
    const perguntasContainer = document.getElementById('perguntas-container');
    const btEnviar = document.getElementById('btEnviar');


    btAdicionarCampo.addEventListener('click', (event) => {
        event.preventDefault();


        const questionLabel = document.createElement('label');
        questionLabel.textContent = 'Pergunta:';
        const questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.placeholder = ' ';
        questionInput.classList.add('form__input');

        const tipoRespostaLabel = document.createElement('label');
        tipoRespostaLabel.textContent = 'Tipo de Resposta:';
        const tipoResposta = document.createElement('select');
        tipoResposta.classList.add('form__input');
        const opcoes = ['Resposta Curta', 'Resposta Longa', 'Múltipla Escolha', 'Caixa de Seleção'];
        opcoes.forEach((opcao) => {
            const option = document.createElement('option');
            option.value = opcao;
            option.textContent = opcao;
            tipoResposta.appendChild(option);
        });


        tipoResposta.addEventListener('change', (event) => {
            const tipo = event.target.value;
            adicionarCamposResposta(tipo, questionInput);
        });


        perguntasContainer.appendChild(questionLabel);
        perguntasContainer.appendChild(questionInput);
        perguntasContainer.appendChild(tipoRespostaLabel);
        perguntasContainer.appendChild(tipoResposta);
    });


    function adicionarCamposResposta(tipo, questionInput) {

        const existingFields = document.querySelectorAll('.resposta-campo');
        existingFields.forEach(field => field.remove());

        let respostaCampo;
        if (tipo === 'Resposta Curta') {
            respostaCampo = document.createElement('input');
            respostaCampo.type = 'text';
            respostaCampo.placeholder = 'Resposta curta';
            respostaCampo.maxLength = 200;
        } else if (tipo === 'Resposta Longa') {
            respostaCampo = document.createElement('textarea');
            respostaCampo.placeholder = 'Resposta longa';
        } else if (tipo === 'Múltipla Escolha' || tipo === 'Caixa de Seleção') {
            // Adicionar opções para múltipla escolha ou caixa de seleção
            respostaCampo = document.createElement('div');
            adicionarOpcoes(tipo, respostaCampo);
        }

        respostaCampo.classList.add('form__input', 'resposta-campo');
        perguntasContainer.appendChild(respostaCampo);
    }


    function adicionarOpcoes(tipo, container) {
        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = 'Adicionar Opção';
        container.appendChild(addOptionButton);

        addOptionButton.addEventListener('click', (event) => {
            event.preventDefault();

            const optionInput = document.createElement('input');
            optionInput.type = tipo === 'Múltipla Escolha' ? 'radio' : 'checkbox';
            optionInput.name = 'opcao';
            const optionLabel = document.createElement('input');
            optionLabel.type = 'text';
            optionLabel.placeholder = 'Opção';
            optionLabel.classList.add('form__input');

            container.appendChild(optionInput);
            container.appendChild(optionLabel);
        });
    }


    btEnviar.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Formulário enviado!');
    });
});
