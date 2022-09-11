let calc = document.querySelector('.body-apps-calc');
let modal = document.querySelector('.modal');
let close = document.querySelector('.modal-close')

// calculator
calc.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.classList.add('modal-active');
    modal.appendChild(calcul)
    calcul.style.display = 'grid';
});

close.addEventListener('click', () => {
    modal.style.display = 'none';
    calcul.style.display = 'none';
    document.body.classList.remove('modal-active');
});

const calcul = document.querySelector('.calc');
const result = document.querySelector('#result')

calcul.addEventListener('click', function(event) {
    if (!event.target.classList.contains('calc__btn')) return;

    const value = event.target.innerText;

    switch(value) {
        case 'C':
            result.innerText = '';
            break;

        case '=':
            result.innerText = eval(result.innerText);
            break;
        
        default:
            result.innerText += value;
    }

});

//timer
const iconTimer = document.querySelector('.body-apps-timer');
const timerApp = document.querySelector('.time');

iconTimer.addEventListener('click', () => {
    modal.appendChild(timerApp)
    timerApp.style.display = 'block'
    modal.style.display = 'flex';
    document.body.classList.add('modal-active');
});

close.addEventListener('click', () => {
    modal.style.display = 'none';
    timerApp.style.display = 'none';
    modal.removeChild(timerApp);
    document.body.classList.remove('modal-active');
});

const timer = document.getElementById('timer');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
let timeOut;
let time = 3600;
timer.innerHTML = '00 : 00';

startBtn.addEventListener('click', function() {
    timeOut = setInterval(timers, 1000);
});

stopBtn.addEventListener('click', function() {
    clearInterval(timeOut);
})

function timers() {
    if (time < 0) {
        alert('Время закончилось');
        clearInterval(timeOut);
        window.location.reload();
    } else {
        let minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timer.innerHTML = `${minutes} : ${seconds}`;
        time--;
    }
}

//life
const lifeIcon = document.querySelector('.body-apps-life');
const life = document.querySelector('.life');

lifeIcon.addEventListener('click', () => {
    modal.appendChild(life)
    life.style.display = 'block'
    modal.style.display = 'flex';
    document.body.classList.add('modal-active');
});

close.addEventListener('click', () => {
    modal.style.display = 'none';
    life.style.display = 'none';
    modal.removeChild(life);
    document.body.classList.remove('modal-active');
});


const canvass = document.getElementById('c1');
const ctxx = canvass.getContext('2d');
let mas = []
let count = 0;
let timerr;


canvass.onclick = function(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    mas[y][x] = 1;
    drawField()
};

function goLife() {
    let n = 30, m = 30;
    for (let i = 0; i < m; i++) {
        mas[i] = []
        for (let j = 0; j < n; j++) {
            mas[i][j] = 0;
        }
    }
}
goLife();

function drawField() {
    ctxx.clearRect(0, 0, 300, 300);
    for (let i = 0; i < 30; i++) {

        for (let j = 0; j < 30; j++) {
            if (mas[i][j] == 1) {
                ctxx.fillRect(j*10, i*10, 10, 10);
            }
        }
    }
}

function startLife() {
    let mas2 = [];
    for (let i = 0; i < 30; i++) {
        mas2[i] = []
        for (let j = 0; j < 30; j++) {
            let neighbors = 0;
            if (mas[fpm(i)-1][j] == 1) neighbors++;
            if (mas[i][fpp(j)+1] == 1) neighbors++;
            if (mas[fpp(i)+1][j] == 1) neighbors++;
            if (mas[i][fpm(j)-1] == 1) neighbors++;
            if (mas[fpm(i)-1][fpp(j)+1] == 1) neighbors++;
            if (mas[fpp(i)+1][fpp(j)+1] == 1) neighbors++;
            if (mas[fpp(i)+1][fpm(j)-1] == 1) neighbors++;
            if (mas[fpm(i)-1][fpm(j)-1] == 1) neighbors++;
            (neighbors == 2 || neighbors == 3) ? mas2[i][j] = 1 : mas2[i][j] == 0;
        }
    }
    mas = mas2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = count;
    timerr = setTimeout(startLife, 300);
}

function fpm(i) {
    if (i == 0) return 30;
    else return i;
}
function fpp(i) {
    if (i == 29) return -1;
    else return i;
}

document.getElementById('startGame').onclick = startLife;


