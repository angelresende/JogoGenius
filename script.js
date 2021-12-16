// Definindo as orderns.
let order = []; // Ordens do jogo.
let clickedOrder = []; // Ordem de cliques do jogador.
let score = 0; // Para saber quando errou.

/**
  * 0 - Verde;
  * 1 - Vermelho;
  * 2 - Amarelo; 
  * 3 - Azul.
**/

// Selecionando as cores do HTML, baseados nas divs criadas.
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Sortea números entre os arrays de 0 a 3. Criando ordem randômica de cores.
let shuffleOrder = () => {

    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Acende a próxima cor.
let lightColor = (element, number) => {
    number = number * 500;
    
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    });

}

// Checa se as cores selecionadas pelo jogador são as mesmas da ordem gerada no jogo.
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }

    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! \nIniciando próximo nível!`);
        nextLevel();
    }
}

// Clique do jogador.
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

// Retorna a cor.
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Próximo nível.
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// Game Over.
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu!\nClique em OK para jogar novamente.`);
    order = [];
    clickedOrder = [];
    playGame();
}

// Início do Game.
let playGame = () => {
    alert('Bem-vindo ao Gênesis! \nIniciando a partida!');
    score = 0;
    nextLevel();
}

// Evento de clique para as cores.
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// Início do jogo.
playGame();