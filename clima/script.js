document.querySelector('.busca').addEventListener('submit', async(event)=>{
    event.preventDefault(); //bloqueando que o formulário seja atualizado e as informações perdidas ao clicar no botão buscar

    let input = document.querySelector('#searchInput').value; //pegando os dados digitados no input
    //verificando se o usuário de fato digitou algo
    if(input !== ''){
        clearInfo();
        showWarning("Carregando...");
        //pegando os dados através da api usando os dados digitados no input
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f57413984a64b2608e78b7d4cbaefae4&units=metric&lang=pt_br` ;
        let results = await fetch(url);
        let json = await results.json();
        if(json.cod === 200){ //verificando se a cidade existe
            showInfo({ //montando um json com as informações relevantes para enviar para a função
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning("Não encontramos esta localização.")
        }

    }
});

function showInfo(json){//apresentando as informações na tela
    showWarning('');

    document.querySelector('.resultado').style.display = 'block'; //mostrando a div que estava oculta com display none
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>º</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`; 
};

function showWarning(msg){ //apresenta uma mensagem ao usuário quando o botão buscar é acionado
    document.querySelector('.aviso').innerHTML = msg;
};

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = "none";
};