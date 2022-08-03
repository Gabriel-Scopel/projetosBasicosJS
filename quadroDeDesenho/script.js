//cor selecionada
let currentColor = 'black';

let canDraw = false;
let mouseX = 0;
let mouseY = 0;

//selecionando o canvas
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

//fazendo um loop nas cores e adicionando um evento de click a cada uma
document.querySelectorAll('.colorArea .color').forEach(item =>{
    item.addEventListener('click', colorClickEvent);
});

document.querySelector('.clear').addEventListener('click', clearScreen);

//monitorando as ações do mouse para que o desenho seja realizado
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');//pegando a cor clicada
    currentColor = color;
    document.querySelector('.color.active').classList.remove('.active'); //desselecionando a cor que estava previamente selecionada
    e.target.classList.add('.active')//selecionando a cor desejada
}

function mouseDownEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop
}
function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}
function mouseUpEvent(){
    canDraw = false;
}

function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //propriedades do desenho
    ctx.beginPath();
    ctx.lineWidth = 5; //grossura de 5px
    ctx.lineJoin = "round" //formato arredondado
    //fazendo a linha
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor; //colocando a linha da cor selecionada
    ctx.stroke();


    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}