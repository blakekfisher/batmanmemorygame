// Select all of the squares
let card = document.querySelectorAll(".square");
//the array of all the cards above
let cards = [...card];
//the number of moves
let move = 0;
//the move number on the page
let moveNumber = document.querySelector(".moveNumber");
//the reset icon
let reset = document.querySelector("i");
//the bat symbol score
let batSymbol = document.querySelectorAll(".batSymbol");
// the array to hold 2 picked cards
let pickedCards = [];
//control whether a card is flipped or not
let cardSelected = false;
//first card selected
let cardOne;
//second card selected
let cardTwo;
//select the board
let squares = document.querySelector(".squares");
//stop more than 2 cards being selected
let stopFlip = false;
//array to hold the matched cards
let allMatchedCards = [];
//modal variables
let modal = document.querySelector(".modal");
let batNumber = document.querySelector(".batNumber");
let finalTime = document.querySelector(".finalTime");
let playAgain = document.querySelector(".playAgain");
let closeModal = document.querySelector(".closeModal");

// ********************************************************************

//star the game when the page loads
document.body.onload = start();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
  var currentIndex = cards.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}

//start the game
function start() {
  // Add a click event listener to all of the cards and flip cards when clicked
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flip);
  }
  //move the cards display postions after shuffle
  let shuffledCards = shuffle(cards);
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(el) {
      squares.appendChild(el);
    });
  }
}

//function to flip the cards
function flip() {
  if (stopFlip) return;
  //add the flip style to a clicked card
  this.classList.add("flip");
  moveCount();
  pickedCards.push(this);
  // card 1 selected
  if (cardSelected === false) {
    cardSelected = true;
    cardOne = this;
    return;
    //card 2 selected
  } else {
    cardSelected = false;
    cardTwo = this;
    match();
  }
}

//match card 1 and card 2
function match() {
  let cardOneId = cardOne.getAttribute("data-cardid");
  let cardTwoId = cardTwo.getAttribute("data-cardid");
  if (cardOneId === cardTwoId) {
    //lock the cards in place
    cardOne.removeEventListener("click", flip);
    cardTwo.removeEventListener("click", flip);
    //add these cards to array allMatchedCards
    allMatchedCards.push(cardOne);
    allMatchedCards.push(cardTwo);
    //remove these cards from the original array cards
    let allMatch = cards.splice(this);
  } else {
    // flip the cards back
    stopFlip = true;
    setTimeout(function() {
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      stopFlip = false;
    }, 850);
  }
  winner();
}

//declare a winner and show a modal when 16 cards match
function winner() {
  if (allMatchedCards.length === 16) {
    //display modal
    modal.style.display = "block";
    //number of bats received 1 to 3
    batNumber.textContent = bats;
    clearInterval(interval);
    finalTime.textContent = document.querySelector(".timer").innerHTML;
  }
}

let bats = 0;
//Number of moves and rating
function moveCount() {
  for (var i = 0; i < batSymbol.length; i++) {
    if (move === 16) {
      //display 3 bat symbols
      batSymbol[0].setAttribute("src", "batmanCharacters/batSymbol.png");
      bats = 3;
    } else if (move > 16 && move <= 24) {
      bats = 2
      //display 2 bat symbols
    } else if (move > 24) {
      //display 1 bat symbols
      batSymbol[1].setAttribute("src", "batmanCharacters/batSymbol.png");
      bats = 1;
    }
  }
  if (move == 1) {
    time = 0;
    count();
  }
  moveNumber.textContent = 1 + move++;
}

// timer in seconds only
let time = 0;
let timer = document.querySelector(".timer");
let interval;

function count() {
  interval = setInterval(function() {
    timer.innerHTML = time + " s";
    time++;
  }, 1000);
}

//Modal fuction
closeModal.addEventListener("click", function() {
  modal.style.display = "none";
  // reload page
  location = location;
});

//reset
reset.addEventListener("click", function() {
  location = location;
});

//play again button
playAgain.addEventListener("click", function() {
  modal.style.display = "none";
  location = location;
});
