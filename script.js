const counts = [0, 0, 0, 0];

function vote(tubeNumber) {
    counts[tubeNumber - 1]++;
    document.getElementById(`count${tubeNumber}`).innerText = counts[tubeNumber - 1];
    
    animateBall(tubeNumber);
}

function animateBall(tubeNumber) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.getElementById(`tube${tubeNumber}`).appendChild(ball);

    setTimeout(() => {
        ball.remove();
    }, 1000);
}

// Ball-Style dynamisch erzeugen
const style = document.createElement('style');
style.innerHTML = `
.ball {
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    animation: fall 1s ease-out forwards;
}
@keyframes fall {
    0% { top: -20px; opacity: 1; }
    100% { top: 80%; opacity: 0; }
}
`;
document.head.appendChild(style);
