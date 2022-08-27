export class PrimitivaLogic {
  constructor() {
    this.bets = null;
    this.winnerBet = null;
    this.numberOfHits = null;
  }

  setBets(bets) {
    this.bets = bets;
  }

  getWinnerBet() {
    if (!this.winnerBet) {
      this.winnerBet = this._createWinnerBet(1, 49, 6);
    }
    return this.winnerBet;
  }

  _createWinnerBet(min, max, length) {
    let winnerBet = new Array(length);
    let randomNumber;
    for (let i = 0; i < winnerBet.length; i++) {
      do {
        randomNumber = Math.floor(Math.random() * (min - max) + max);
      } while (winnerBet.includes(randomNumber));
      winnerBet[i] = randomNumber;
    }
    return winnerBet;
  }

  getNumberOfHits(bet) {
    if (!this.numberOfHits) {
      this.numberOfHits = Array.from({ length: this.bets.length }, () => 0);
      for (let i = 0; i < this.bets.length; i++) {
        for (let j = 0; j < this.bets[i].length; j++) {
          const currentBetNumber = this.bets[i][j];
          if (this.winnerBet.includes(currentBetNumber)) {
            this.numberOfHits[i]++;
          }
        }
      }
    }
    return this.numberOfHits[bet];
  }
}
