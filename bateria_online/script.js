document.body.addEventListener('keyup', (event)=>{ //monitorando na págica inteira caso alguma tecla seja acionada
    playSound(event.code.toLowerCase()); //enviando para playSound o código da tecla em minusculo
});
//obs: perceba que o nome dos arquivos de aúdio correspondente a cada som é o mesmo nome das possiveis teclas

//fazendo com que ao clicar no botão a melodia seja tocada:
document.querySelector('.composer button').addEventListener('click',()=>{
    let song = document.querySelector('#input').value; //pegando os valores digitados no campo de input
    if(song !== ''){ //verificando se o campo input não está vazio
        let songArray = song.split(''); //transformando oque foi digitado no input em um array
        playComposition(songArray);
    }
});
function playSound(sound){ 
    let audioElement = document.querySelector(`#s_${sound}`); //pegando o elemento pelo id (html)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`); //pegando a div 
    
    if(keyElement){
        keyElement.classList.add('active'); //adicionando "active" ao nome da classe para que ela seja pintada (css)
        //removendo "active" da classe após 300milisegundos:
        setTimeout(()=>{
            keyElement.classList.remove('active');
        }, 300)
    }
    
    if(audioElement){ //verificando se a tecla pressionada é uma das possiveis
        audioElement.play(); //tocando o arquivo de audio
        audioElement.currentime = 0; //coloca o timer do audio para o zero, para que no instante que a tecla seja apertada, o som saia, assim ele não espera o som acabar para tocar de novo
    }
};

function playComposition(songArray){
    let wait = 0;
    //fazendo com que o tempo entre uma nota e outra seja de 250milisegundos
    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);
        wait+=250;
    }
}