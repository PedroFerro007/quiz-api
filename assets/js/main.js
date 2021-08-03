const resultado = document.querySelector('#resultado');

fetch("https://opentdb.com/api.php?amount=10")
    .then(response => {
        return response.json();
    }).then(obj => {
        console.log(obj);
        obj.results.forEach(valor => {
            const respostas = [];
            respostas.push(valor.correct_answer, ...valor.incorrect_answers);
            criaPergunta(valor.question, valor.category);
            grauDificuldade(valor.difficulty);
            shuffle(respostas);
            criaRespostas(respostas, valor.correct_answer);

        });
    }).catch(e => {
        console.log(e);
    })



function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function criaPergunta(pergunta, categoria) {
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    h2.innerText = `Question: ${pergunta}`;
    h3.innerText = `Category: ${categoria}`;
    resultado.appendChild(h2);
    resultado.appendChild(h3);
}

function grauDificuldade(dificuldade) {
    const h3 = document.createElement('h3');
    h3.innerText = `Difficulty: ${dificuldade}`;
    if (dificuldade === 'easy') {
        h3.style.color = 'green';
    } else if (dificuldade === 'medium') {
        h3.style.color = 'orange';
    } else {
        h3.style.color = 'red';
    }

    resultado.appendChild(h3);
}


function criaBotao() {
    let button = document.createElement('button');
    button.innerText = 'Send Reply';
    button.style.display = 'none';
    return button;
}


function criaRespostas(respostas, respostaCerta) {
    let botao = criaBotao();
    const form = document.createElement('form');
    botao.addEventListener('click', e => {
        let selected;
        //Loop para pegar valor selecionado do radio button
        for (let i = 0; i < rbs.length; i++) {
            if (rbs[i].checked) {
                selected = rbs[i].value;
            }

        }
        if (selected === respostaCerta) {
           for(rb of rbs){
            rb.disabled = true
           }
            botao.insertAdjacentElement('afterend', criaTextoAcerto());
            botao.remove();
        } else if (selected !== respostaCerta) {
            for(rb of rbs){
                rb.disabled = true
               }
            botao.insertAdjacentElement('afterend', criaTextoErro(respostaCerta));
            botao.remove();
        }
    })

    for (alternativas of respostas) {
        form.innerHTML += `<input type="radio" class="opcao" name="opcao" value="${alternativas}"> ${alternativas} <br>`;
    }



    //Definindo que o botão apareça após selecionar um radio button
    let rbs = form.querySelectorAll('.opcao');
    for (rb of rbs) {
        rb.addEventListener('change', e => {
            botao.style.display = 'block';
        })
    }

    //Previnindo evento submit do formulário
    form.addEventListener('submit', e => {
        e.preventDefault();
    })

    form.appendChild(botao);
    resultado.appendChild(form);
}

function criaTextoAcerto() {
    let p = document.createElement('p');
    p.classList.add('p-correct');
    p.innerHTML = 'Congratulations, correct answer!';
    return p;
}

function criaTextoErro(resposta) {
    let p = document.createElement('p');
    p.classList.add('p-error');
    p.innerText = `Oh no you missed. Correct answer : ${resposta}`;
    return p;
}

