// RANGE ELEMENT

const betsNumberEl = document.getElementById('betsNumber');

if (betsNumberEl) {
  const betsNumberTag = document.querySelector('#betsNumberTag');

  if (betsNumberTag) {
    betsNumberTag.innerHTML = betsNumberEl.value;

    betsNumberEl.addEventListener(
      'input',
      function () {
        betsNumberTag.innerHTML = betsNumberEl.value;
      },
      false
    );
  }
}

// START

let betsNumber;
let bets = [];

function Start() {
  const containerToRemove = document.getElementById('initialSetUp');
  const containerToAdd = document.getElementById('bets');
  containerToRemove.style.display = 'none';
  betsNumber = betsNumberEl.value;
  console.log(`betsNumber: ${betsNumber}`);
  containerToAdd.style.display = 'flex';
  CreateBoard();
  bets = new Array(Number(betsNumber));
  for (let i = 0; i < bets.length; i++) {
    bets[i] = [];
    console.log(`bets[i] where i: ${i}`);
  }
}

const startButtonEl = document.getElementById('startButton');
startButtonEl.addEventListener('click', Start);

// BETS BOARD CREATION

function CreateBoard() {
  let codeA, block, titleHeading, tiles, unit, codeN;
  const boardEl = document.getElementById('board');

  for (let i = 1; i <= betsNumber; i++) {
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

const playGameButtonEl = document.getElementById('playGameButton');

function PlayGame() {
  for (let i = 0; i < betsNumber; i++) {
    if (bets[i].length == 6) {
      betsFilledCount++;
    }
  }

  console.log(`betsNumber: ${betsNumber}`);
  console.log(`betsFilledCount: ${betsFilledCount}`);

  if (betsFilledCount !== Number(betsNumber)) {
    console.log('betsFilledCount !== Number(betsNumber)');
    alert('debe rellenar todas las bets (6 números cada una)');
    betsFilledCount = 0;
  } else if (betsFilledCount === Number(betsNumber)) {
    console.log('betsFilledCount === Number(betsNumber)');
    prize = CreateArrayWithRandomNumbersBetween(1, 49, 6);
    const containerToRemove = document.getElementById('bets');
    const containerToAdd = document.getElementById('results');
    containerToRemove.style.display = 'none';
    containerToAdd.style.display = 'flex';
    const prizeEl = document.getElementById('prize');
    prizeEl.innerHTML = 'prize = ' + prize;
    CheckBet(bets, prize);
  }
}

function CreateArrayWithRandomNumbersBetween(min, max, arrayLength) {
  let array = [];
  for (let i = 0; i < arrayLength; i++) {
    array.push(-1);
  }

  let random;

  for (let j = 0; j < array.length; j++) {
    do {
      random = Math.floor(Math.random() * (min - max) + max);
    } while (
      random == array[0] ||
      random == array[1] ||
      random == array[2] ||
      random == array[3] ||
      random == array[4] ||
      random == array[5]
    );

    array[j] = random;
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
