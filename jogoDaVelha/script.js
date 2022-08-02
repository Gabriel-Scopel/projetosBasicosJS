//dados iniciais do tabuleiro:
let square = {
    a1:'',a2:'',a3:'',
    b1:'',b2:'',b3:'',
    c1:'',c2:'',c3:''
};

let player ='' //de quem é a vez, "x" ou "o"
let warning=''; 
let playing = false; //armazena quando o jogo ainda está em funcionamento

reset();

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item =>{ //verificando em cada posição do tabuleiro se há um evento de click
    item.addEventListener('click', itemClick);
});

function itemClick(event){ //pega o elemento clicado e marca no tabuleiro
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        tooglePlayer(); 
    }
};

function tooglePlayer(){//função que alterna a vez dos jogadores
    if(player === 'x'){
        player = 'o'
    }else{
        player = 'x'
    };
    renderInfo();
};

//resetando o jogo
function reset(){
    warning='';

    let random = Math.floor(Math.random()*2); //decidino de forma aleatória quem será o primeiro a jogar
    player = (random === 0 )?'x' : 'o';

    for(let i in square){ //zerando os dados do tabuleiro
        square[i]='';
    };

    playing = true;
    renderSquare();
    renderInfo();
};

function renderSquare(){ //preenche o quadro
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
};

function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
};

function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu! '
    }else if(checkWinnerFor('o')){
        warning = 'O "o" venceu!'
    }else if(isFull()){
        warning = "Deu empate.";
        playing = false;
    }
}

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon){
            return true;
        }
    }
    return false;
}

function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}