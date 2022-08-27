// RANGE ELEMENT

const betsNumberEl = document.getElementById('betsNumber');
const betsNumberTag = document.querySelector('#betsNumberTag');
betsNumberTag.innerHTML = betsNumberEl.value;
betsNumberEl.addEventListener(
  'input',
  function () {
    betsNumberTag.innerHTML = betsNumberEl.value;
  },
  false
);

// START

let bets = [];

function Start() {
  const initialSetUpEl = document.getElementById('initialSetUp');
  const betsEl = document.getElementById('bets');
  initialSetUpEl.style.display = 'none';
  const betsNumber = betsNumberEl.value;
  console.log(`betsNumber: ${betsNumber}`);
  betsEl.style.display = 'flex';
  bets = new Array(Number(betsNumber));
  console.log(bets);
  for (let i = 0; i < bets.length; i++) {
    bets[i] = [];
    console.log(`bets[i] where i: ${i}`);
  }
  CreateBoard();
}

const startButtonEl = document.getElementById('startButton');
startButtonEl.addEventListener('click', Start);

// BETS BOARD CREATION

function CreateBoard() {
  let codeA, block, titleHeading, tiles, unit, codeN;
  const boardEl = document.getElementById('board');
  for (let i = 1; i <= bets.length; i++) {
    codeA = 'a' + i;

    block = document.createElement('div');
    block.setAttribute('id', codeA);

    titleHeading = document.createElement('h3');
    titleHeading.innerHTML = 'apuesta nº ' + i;
    block.appendChild(titleHeading);

    tiles = document.createElement('div');
    tiles.setAttribute('id', 'tiles');

    for (let j = 1; j <= 49; j++) {
      unit = document.createElement('span');
      if (j < 10) {
        unit.innerHTML = '0' + j;
      } else {
        unit.innerHTML = j;
      }
      codeN = codeA + 'n' + j;
      unit.setAttribute('id', codeN);
      const functionReference = `CheckCasilla( '${codeN}')`;
      unit.setAttribute('onclick', functionReference);
      tiles.appendChild(unit);
    }
    block.appendChild(tiles);
    boardEl.appendChild(block);
  }
}

// USER CLICKS A NUMBER

function CheckCasilla(id) {
  console.log(`id: ${id}`);
  const clickedEl = document.getElementById(id);
  console.log(`clickedEl: ${clickedEl}`);
  const clickedElId = clickedEl.getAttribute('id');
  // this position is the character of the id meaning the bet number, then extract the index
  const betClicked = clickedElId.charAt(1);
  const betClickedIndex = Number(betClicked - 1);

  console.log(`clickedElId: ${clickedElId}`);
  const numberClicked = Number(clickedElId.substring(3));
  console.log(`betClicked: ${betClicked}`);
  console.log(`numberClicked: ${numberClicked}`);
  console.log(`betClickedIndex: ${betClickedIndex}`);

  const have = bets[betClickedIndex].includes(numberClicked);
  console.log(`have: ${have}`);

  const fullBlock = bets[betClickedIndex].length === 6;
  console.log(`fullBlock: ${fullBlock}`);

  if (!have && !fullBlock) {
    clickedEl.classList.toggle('checked');
    bets[betClickedIndex].push(numberClicked);
    console.log(
      `bets[${betClickedIndex}].length: ${bets[betClickedIndex].length}`
    );
  } else if (!have && fullBlock) {
    alert('Ese bloque está completo, quita otro número antes de añadir');
  } else {
    clickedEl.classList.toggle('checked');
    const numberClickedToRemove = bets[betClickedIndex].indexOf(clickedElId);
    bets[betClickedIndex].splice(numberClickedToRemove, 1);
    console.log(
      `bets[${betClickedIndex}].length: ${bets[betClickedIndex].length}`
    );
  }
}

// PLAY PRIMITIVA

let betsFilledCount = 0;
let prize = [];

const playGameEl = document.getElementById('playGame');
playGameEl.addEventListener('click', PlayGame);

function PlayGame() {
  for (let i = 0; i < bets.length; i++) {
    if (bets[i].length == 6) {
      betsFilledCount++;
    }
  }

  console.log(`betsFilledCount: ${betsFilledCount}`);

  if (betsFilledCount !== Number(bets.length)) {
    console.log('betsFilledCount !== Number(betsNumber)');
    alert('debe rellenar todas las bets (6 números cada una)');
    betsFilledCount = 0;
  } else if (betsFilledCount === Number(bets.length)) {
    console.log('betsFilledCount === Number(betsNumber)');
    prize = CreateWinnerBet(1, 49, 6);
    const initialSetUpEl = document.getElementById('bets');
    const betsEl = document.getElementById('results');
    initialSetUpEl.style.display = 'none';
    betsEl.style.display = 'flex';
    const prizeEl = document.getElementById('prize');
    prizeEl.innerHTML = 'prize = ' + prize;
    CheckBet(bets, prize);
  }
}

function CreateWinnerBet(min, max, arrayLength) {
  let winnerBet = new Array(arrayLength);
  let randomNumber;
  for (let i = 0; i < winnerBet.length; i++) {
    do {
      randomNumber = Math.floor(Math.randomNumber() * (min - max) + max);
    } while (winnerBet.includes(randomNumber));
    winnerBet[i] = randomNumber;
  }
  return array;
}

function CheckBet(bets, prize) {
  let hits = 0;
  let box, titleHeading, numbersParagraph, hitsParagraph;
  const boardEl = document.getElementById('rank');

  for (let j = 0; j < bets.length; j++) {
    box = document.createElement('div');

    titleHeading = document.createElement('h3');
    titleHeading.innerHTML = '*** APUESTA ' + (j + 1) + ' ***';
    box.appendChild(titleHeading);

    numbersParagraph = document.createElement('p');
    numbersParagraph.innerHTML = 'números = ' + bets[j];
    box.appendChild(numbersParagraph);

    for (let k = 0; k < bets[j].length; k++) {
      for (let l = 0; l < prize.length; l++) {
        if (bets[j][k] == prize[l]) {
          hits++;
        }
      }
    }
    hitsParagraph = document.createElement('p');
    hitsParagraph.innerHTML = 'hits = ' + hits;
    box.appendChild(hitsParagraph);
    hits = 0;

    boardEl.appendChild(box);
  }
}
