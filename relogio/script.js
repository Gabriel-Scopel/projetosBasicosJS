let digitalElement  = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

function updateClock(){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    let sDeg = ((360/60)*second)-90; //calculando o angulo que o ponteiro deve estar
    let mDeg = ((360/60)*minute)-90;
    let hDeg = ((360/12)*hour)-90;

    sElement.style.transform = `rotate(${sDeg}deg)`; //realizando a mudança de posição do ponteiro
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;
}

function fixZero(time){ //formatando as horas corretamente
    if(time<10){
        return '0'+time;
    }else{
        return time;
    }
}

setInterval(updateClock, 1000) //atualiza a função updateClock a cada 1000ms
updateClock(); //rodando a função imediatamente, assim não é necessário esperar 1000ms para o relógio funcionar

