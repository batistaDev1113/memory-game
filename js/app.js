/******************************
 * Yunior Batista             *
 * ************************** */

/*
 * Create a list that holds all of your cards
 */
let icons = ['far fa-gem', 'fa fa-paper-plane', 'fa fa-anchor', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'far fa-gem',
    'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane',
    'fa fa-cube'
];

const cardContainer = document.querySelector('.deck');

let cardsClicked = [];
let matchedCards = [];
let firstClicked = true;
let clickCount = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(icons).forEach(function (e) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class='" + e + "'></i>";
    cardContainer.appendChild(card);


    // add event listener on clicked card
    card.addEventListener('click', function () {
        //only call timer one time        
        if (firstClicked) {
            timerDisplay();
            firstClicked = false;
        }

        // call moves function only after 2 clicks
        clickCount++;
        if (clickCount % 2 == 0) {
            moves();
        }

        if (cardsClicked.length === 1) {
            card.classList.add('open', 'show', 'disable');
            cardsClicked.push(this);

            //compare cards
            if (this.innerHTML === cardsClicked[0].innerHTML) {
                this.classList.add('match');
                cardsClicked[0].classList.add('match');

                //keep track of how many cards matched
                matchedCards.push(this, cardsClicked[0]);
                cardsClicked = [];
                gameOver();
            } else {

                cardsClicked[0].classList.add('animate');
                this.classList.add('animate');
                setTimeout(() => {
                    this.classList.remove('open', 'show', 'disable');
                    cardsClicked[0].classList.remove('open', 'show', 'disable');
                    cardsClicked = [];
                }, 400)

            }
        } else {
            this.classList.add('open', 'show', 'disable');
            cardsClicked.push(this);
        }

    });

});



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// timer function section
let secTimer = 0;
let time = document.querySelector('.timer');

let intervalTimer;

function timerDisplay() {

    convertSeconds();
    return intervalTimer = setInterval(timeIt, 1000);

} //end timer function


function convertSeconds(s) {

    let min = Math.floor(s / 60);
    let sec = s % 60;
    return prettyNumber(min) + ' : ' + prettyNumber(sec);

}

function timeIt() {
    secTimer++;
    return time.innerHTML = convertSeconds(secTimer);
}


// number formatting function for timer
function prettyNumber(number) {
    if (number < 10) {
        return '0' + number;
    } else
        return number;
} // end of nf function


//moves function
let movesCounter = 0;
let movesNum;

function moves() {
    movesCounter++;
    switch (movesCounter) {
        case 9:
            starRemover();
            break;
        case 13:
            starRemover();
            break;
    }

    movesNum = document.querySelector('.moves');
    movesNum.innerHTML = movesCounter;
}

// function star rating
let childStar;
let parentStar;

function starRemover() {
    parentStar = document.querySelector('ul');
    childStar = document.querySelector('li');
    parentStar.removeChild(childStar);

}


//gameOver function
function gameOver() {
    if (matchedCards.length === 16) {
        popModal();
        play();
    }

} // end of gameOver


document.querySelector('.restart').addEventListener('click', reset);

//reset the moves, stars and icons
function reset() {
    window.location.reload();
}

// show game stats after game over
// modal function
const myModal = document.querySelector('#modal');
const myTimer = document.querySelector('#time');
const myStars = document.querySelector('#stars');

function popModal() {
    myModal.classList.remove('hide');
    let movesNum1 = document.getElementById('moves');
    movesNum1.innerHTML = movesCounter;

    myTimer.innerHTML = convertSeconds(secTimer);
    myStars.innerHTML = document.querySelector('.stars').innerHTML;

}

// close modal after button 'Close' click
const btnModal = document.querySelector('button.btn-secondary');
btnModal.addEventListener('click', function () {
    myModal.classList.add('hide');
    window.location.reload();
});

//play audio after winning
let audioPlay = new Audio("./sounds/fanfare.mp3");
play = () => {
    audioPlay.play();
}

