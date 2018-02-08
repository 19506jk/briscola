const _ = require('lodash');
const deck = require('./assets/deck.json');

/**
 * Phases
 * 0 - Waiting for Players to join
 * 1 - Distribute cards to players
 * 2 - Bid
 * 3 - In game
 * 4 - Game end
 */

class Game {
  constructor() {
    this.playerCount = 0;
    this.phase = 0;

    this.currentRound = [];
    this.largestBid = 0;
    this.calledCard = null;
    this.caller = 0;
    this.playerHands = [];
    this.trump = null;
    this.scores = [0, 0, 0, 0, 0];
    this.bid = null;
    this.passedBidPlayers = 0;

    this.init();
  }

  init() {
    const cards = [];
    deck.suits.forEach((suit) => {
      deck.ranks.forEach((rank) => {
        cards.push(_.assign({}, rank, {suit}));
      });
    });
    this.deck = _.shuffle(cards);
  }

  addPlayer() {
    this.playerCount += 1;
  }

  getCards(player) {
    const cards = this.deck.splice(0, 8);
    this.playerHands.push(cards);
    return cards;
  }

  playCard(cardInfo) {
    this.currentRound.push(cardInfo);
  }

  setCalledCard(player, card) {
    this.calledCard = card;
    this.trump = card.suit;
    this.caller = player;

    for (let i = 0; i < 5; i++) {
      if (_.find(this.playerHands[i], { name: card.name, suit: card.suit })) {
        this.guiltyPlayer = i;
      }
    }
  }

  getRoundResult() {
    let largest = this.currentRound.shift();
    let leadingSuit = largest.info.suit;
    let point = largest.info.point;

    let i;
    for (i = 0; i < this.currentRound.length; i++) {
      const card = this.currentRound[i];
      const cardValue = card.info.value;
      const cardSuit = card.info.suit;
      const trump = this.trump;
      const largestValue = largest.info.value;
      const largestTrump = largest.info.trump;

      /**
       * Largest card should be replaced in the following cases:
       * - Current card has the leading suit and largest card is not trump; current card has larger value
       * - Current card is trump and largest card is not trump
       * - Current card is trump and largest card is trump; current card has larger value
       */
      if ((cardSuit === leadingSuit && largestTrump !== trump)
        || (cardSuit === trump && largestTrump === trump)) {
        if (cardValue > largestValue) {
          largest = card;
        }
      } else if (cardSuit === trump && largestTrump !== trump) {
        largest = card;
        leadingSuit = trump;
      }

      point += card.info.point;
    }

    this.scores[largest.player - 1] += point;
    return largest;
  }

  submitBid(bid) {
    if (!this.bid || bid.amount > this.bid.amount) {
      this.bid = bid;
    }
  }

  submitBidPass() {
    this.passedBidPlayers += 1;
  }

  getScores() {
    return this.scores;
  }
};

module.exports = Game;