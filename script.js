const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let acerto = document.getElementById('tot_acertos');
let erro = document.getElementById('tot_erros');


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        points(1);
        disableCards();
        return;
    }

    points(-1);
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
}

function totalReset() {

    resetBoard();
    cards.forEach((card) => {
        card.classList.remove('flip');
    });
    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
    });
    [acerto.innerText, erro.innerText] = [0, 0];
    setTimeout(() => {
        shuffle();
    }, 1000);


}

function points(pontuacao) {
    if (pontuacao > 0) {
        acerto.innerText = parseInt(acerto.innerText) + 1;
    }

    erro.innerText = parseInt(erro.innerText) + 1;
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});