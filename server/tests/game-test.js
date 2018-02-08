const assert = require('assert');
const Game = require('../game.js');

describe('Game', function () {
  describe('#getRoundResult()', function () {
    it('should return trump card when there is only one trump', function () {
      const game = new Game();
      game.playCard({
        player: 1,
        info: { "suit": "A", "point": 1, "value": 1 }
      });
      game.playCard({
        player: 2,
        info: { "suit": "B", "point": 2, "value": 5 }
      });
      game.playCard({
        player: 3,
        info: { "suit": "C", "point": 3, "value": 7 }
      });
      game.playCard({
        player: 4,
        info: { "suit": "A", "point": 4, "value": 10 }
      });
      game.playCard({
        player: 5,
        info: { "suit": "A", "point": 5, "value": 11 }
      });
      game.trump = 'B';

      assert.deepEqual(game.getRoundResult(), {
        player: 2,
        info: { "suit": "B", "point": 2, "value": 5 }
      }, 'Player 2 is the winner of the round');
      assert.deepEqual(game.scores, [0, 15, 0, 0, 0], 'Each player has the correct score');
    });

    it('should return largest card of the leading suit', function () {
      const game = new Game();
      game.playCard({
        player: 1,
        info: { "suit": "A", "point": 1, "value": 1 }
      });
      game.playCard({
        player: 2,
        info: { "suit": "C", "point": 2, "value": 5 }
      });
      game.playCard({
        player: 3,
        info: { "suit": "C", "point": 3, "value": 7 }
      });
      game.playCard({
        player: 4,
        info: { "suit": "A", "point": 4, "value": 10 }
      });
      game.playCard({
        player: 5,
        info: { "suit": "A", "point": 5, "value": 11 }
      });
      game.trump = 'B';

      assert.deepEqual(game.getRoundResult(), {
        player: 5,
        info: { "suit": "A", "point": 5, "value": 11 }
      }, 'Player 5 is the winner of the round');
    });

    it('should return largest trump', function () {
      const game = new Game();
      game.playCard({
        player: 1,
        info: { "suit": "A", "point": 1, "value": 1 }
      });
      game.playCard({
        player: 2,
        info: { "suit": "C", "point": 2, "value": 5 }
      });
      game.playCard({
        player: 3,
        info: { "suit": "C", "point": 3, "value": 7 }
      });
      game.playCard({
        player: 4,
        info: { "suit": "A", "point": 4, "value": 10 }
      });
      game.playCard({
        player: 5,
        info: { "suit": "A", "point": 5, "value": 11 }
      });
      game.trump = 'A';

      assert.deepEqual(game.getRoundResult(), {
        player: 5,
        info: { "suit": "A", "point": 5, "value": 11 }
      }, 'Player 5 is the winner of the round');
    });
  });

  describe('#setCalledCard()', function () {
    it('should set properties correctly', function () {
      const game = new Game();
      const calledCard = { name: 'Ace', suit: 'Sun' };
      game.playerHands = [
        [{ name: 'Three', suit: 'Sword' }],
        [{ name: 'Ace', suit: 'Sun' }],
        [{ name: 'Seven', suit: 'Feather' }],
        [{ name: 'Two', suit: 'Sword' }],
        [{ name: 'Ace', suit: 'Cup' }],
      ]
      game.setCalledCard(0, calledCard);

      assert.equal(game.calledCard, calledCard, 'called card is set');
      assert.equal(game.trump, calledCard.suit, 'trump is set');
      assert.equal(game.caller, 0, 'caller is set');
      assert.equal(game.guiltyPlayer, 1, 'guilty player is set');
    });
  });
});