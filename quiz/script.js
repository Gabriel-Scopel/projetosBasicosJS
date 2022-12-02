let currentQuestion = 0; //questão atual
let correctAnswers =0; //qtd de questões acertadas

showQuestion();

//adicionando evento no botão final do questionário
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//functions
function showQuestion(){
    if(questions[currentQuestion]){ //verifica se não acabaram as questões (fora do index)
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion/ questions.length)*100); //cálculo da porcentagem de quantas questôes já foram respondidas
        document.querySelector('.progress--bar').style.width = `${pct}%`; //aumentando a largura da barra de progresso baseado na porcentagem pct
        document.querySelector('.scoreArea').style.display = 'none'; //escondendo a área de score se ela estiver aparecendo por algum motivo
        document.querySelector('.questionArea').style.display = 'block'; //exibindo a pergunta 
        document.querySelector('.question').innerHTML = q.question; //preenchendo a div da questão com a questão da vez
        let optionsHtml = ''; //variável que armazenará as opções da vez
        for(let i in q.options){
            optionsHtml+=`<div data-op="${i}" class = "option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml;//preenchendo a área da opções com as opções
        //adicionando um evento de click a cada uma das opções:
        document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', optionClickEvent);
        });
    }else{
        finishQuiz();//quando as perguntas se esgotarem
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));//pegando qual a opção que o usuário clicou

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers+=1;
    }
    currentQuestion++;//passando para a próxima pergunta
    showQuestion();//exibindo a próxima pergunta
}

function finishQuiz(){
    let points = Math.floor((correctAnswers/questions.length)*100); //porcentagem de acerto

    if(points<30){
        document.querySelector('.scoreText1').innerHTML = "Precisa melhorar!";
        document.querySelector('.scorePct').style.color = "#ff0000";
    }else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = "Parabéns!";
        document.querySelector('.scorePct').style.color = "#ffff00";
    }else{
        document.querySelector('.scoreText1').innerHTML = "Excelente!";
        document.querySelector('.scorePct').style.color = "#0d630d";
    }
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display = 'block'; 
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`; 
}

function resetEvent(){
    currentQuestion = 0; 
    correctAnswers =0; 

    showQuestion();
}