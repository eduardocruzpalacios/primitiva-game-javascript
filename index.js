import { primitivaLogic } from './primitivaLogic/primitivaLogic.js';

const Start = () => {
  const initialSetUpEl = document.getElementById('initialSetUp');
  initialSetUpEl.style.display = 'none';
  const betsEl = document.getElementById('bets');
  betsEl.style.display = 'flex';
  const betsNumber = betsNumberEl.value;
  bets = Array.from({ length: betsNumber }, () => []);
  // BOARD RENDERS
  let codeA, block, titleHeading, tiles, unit, codeN;
  const boardEl = document.getElementById('board');
  for (let i = 1; i <= bets.length; i++) {
    codeA = `b${i}`;
    block = document.createElement('div');
    block.setAttribute('id', codeA);
    titleHeading = document.createElement('h3');
    titleHeading.innerHTML = `apuesta nº ${i}`;
    block.appendChild(titleHeading);
    tiles = document.createElement('div');
    tiles.setAttribute('id', 'tiles');
    for (let j = 1; j <= 49; j++) {
      unit = document.createElement('span');
      if (j < 10) {
        unit.innerHTML = `0${j}`;
      } else {
        unit.innerHTML = j;
      }
      codeN = `${codeA}n${j}`;
      unit.setAttribute('id', codeN);
      // CHECK NUMBER
      unit.addEventListener('click', (event) => {
        const clickedEl = event.target;
        const clickedElId = clickedEl.getAttribute('id');
        const betClicked = clickedElId.charAt(1);
        const betClickedIndex = Number(betClicked - 1);
        const numberClicked = Number(clickedElId.substring(3));
        const have = bets[betClickedIndex].includes(numberClicked);
        const fullBlock = bets[betClickedIndex].length === 6;
        if (!have && !fullBlock) {
          clickedEl.classList.add('checked');
          bets[betClickedIndex].push(numberClicked);
        } else if (!have && fullBlock) {
          alert('Ese bloque está completo, quita otro número antes de añadir');
        } else {
          clickedEl.classList.remove('checked');
          const numberClickedToRemove =
            bets[betClickedIndex].indexOf(clickedElId);
          bets[betClickedIndex].splice(numberClickedToRemove, 1);
        }
      });
      tiles.appendChild(unit);
    }
    block.appendChild(tiles);
    boardEl.appendChild(block);
  }
};

const PlaceBets = () => {
  if (bets.some((element) => element.length < 6)) {
    alert('debe rellenar todas las bets (6 números cada una)');
  } else {
    primitivaLogic.setBets(bets);
    const prize = primitivaLogic.getWinnerBet();
    const initialSetUpEl = document.getElementById('bets');
    const betsEl = document.getElementById('results');
    initialSetUpEl.style.display = 'none';
    betsEl.style.display = 'flex';
    const prizeEl = document.getElementById('prize');
    prizeEl.innerHTML = `prize = ${prize}`;
    // CHECK AND RENDER HITS
    let box, titleHeading, numbersParagraph, hitsParagraph;
    const boardEl = document.getElementById('hits');
    for (let i = 0; i < bets.length; i++) {
      box = document.createElement('div');
      titleHeading = document.createElement('h3');
      titleHeading.innerHTML = `*** APUESTA ${i + 1} ***`;
      box.appendChild(titleHeading);
      numbersParagraph = document.createElement('p');
      numbersParagraph.innerHTML = `números = ${bets[i]}`;
      box.appendChild(numbersParagraph);
      const hits = primitivaLogic.getNumberOfHits(i);
      hitsParagraph = document.createElement('p');
      hitsParagraph.innerHTML = `hits = ${hits}`;
      box.appendChild(hitsParagraph);
      boardEl.appendChild(box);
    }
  }
};

// MEMBERS & EVENTS
const betsNumberTag = document.querySelector('#betsNumberTag');
const betsNumberEl = document.getElementById('betsNumber');
betsNumberTag.innerHTML = betsNumberEl.value;
betsNumberEl.addEventListener(
  'input',
  function () {
    betsNumberTag.innerHTML = betsNumberEl.value;
  },
  false
);

let bets = [];

const startButtonEl = document.getElementById('start');
startButtonEl.addEventListener('click', Start);

const placeBetsEl = document.getElementById('placeBets');
placeBetsEl.addEventListener('click', PlaceBets);
