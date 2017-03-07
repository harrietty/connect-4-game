const path = require('path');
const expect = require('chai').expect;

const {Connect4, Connect4Board} = require(path.join(__dirname, '..', './main.js'));

describe('Connect4Board', function () {
  let board;
  beforeEach(() => {
    board = new Connect4Board();
  });
  it('is a function', function () {
    expect(Connect4Board).to.be.a('function');
  });
  it('returns a new board', function () {
    expect(board.board).to.eql([[], [], [], [], [], [], []]);
  });
  it('can add a counter to the board', function () {
    board.addPlayer(0, 'Player 1');
    board.addPlayer(1, 'Player 2');
    expect(board.board[0]).to.eql(['Player 1']);
    expect(board.board[1]).to.eql(['Player 2']);
    board.addPlayer(0, 'Player 1');
    board.addPlayer(1, 'Player 2');
    expect(board.board[0]).to.eql(['Player 1', 'Player 1']);
    expect(board.board[1]).to.eql(['Player 2', 'Player 2']);
  });
  it('can check if there is space in a column to place a counter', function () {
    expect(board.checkForSpace()).to.equal('Please select a column');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    expect(board.checkForSpace(0)).to.equal(true);
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    expect(board.checkForSpace(0)).to.equal(false);
  });
  it('can check for a vertical winner', function () {
    expect(board.checkVerticalWinner()).to.equal(false);
    board.board[0] = ['Player 1', 'Player 1', 'Player 1', 'Player 1'];
    let res = board.checkVerticalWinner();
    expect(res).to.equal('Player 1');
    board.board[3] = ['Player 2', 'Player 1', 'Player 1', 'Player 1', 'Player 1', 'Player 2'];
    res = board.checkVerticalWinner();
    expect(res).to.equal('Player 1');
    board.board[2] = ['Player 2', 'Player 2', 'Player 1', 'Player 1', 'Player 1', 'Player 1'];
    res = board.checkVerticalWinner();
    expect(res).to.equal('Player 1');
  });
  it('can check for a horizontal winner', function () {
    expect(board.checkHorizontalWinner()).to.equal(false);
    board.board = [
      [1, 1, 2],
      [1, 1, 2],
      [2, 1],
      [2, 2],
      [2],
      [2],
      [2, 1]
    ];
    expect(board.checkHorizontalWinner()).to.equal(2);
    board.board = [
      [2, 1, 2],
      [1, 1, 2],
      [2, 1],
      [2, 1],
      [2],
      [1],
      [2, 1]
    ];
    expect(board.checkHorizontalWinner()).to.equal(1);
  });
});

describe('Connect4()', function () {
  let game;
  beforeEach(() => {
    game = new Connect4();
  });

  it('exists', function () {
    expect(Connect4).to.be.a('function');
  });

  it('returns "Please select a column" if no column given', function () {
    expect(game.play()).to.equal('Please select a column');
  });

  it('changes the player when you call the play method', function () {
    let res = game.play(0);
    expect(game.player).to.equal('Player 2');
    expect(res).to.equal('Player 2\'s turn');
    res = game.play(0);
    expect(res).to.equal('Player 1\'s turn');
  });

  it('returns "This column is full" if you try to play in a full column', function () {
    game.play(0);
    game.play(0);
    game.play(0);
    game.play(0);
    game.play(0);
    game.play(0);
    let res = game.play(0);
    expect(res).to.equal('This column is full');
  });

  it('can returns a horizontal winner if there is one', function () {
    game.play(0);
    game.play(1);
    game.play(0);
    game.play(1);
    game.play(0);
    game.play(2);
    game.play(0);
    game.play(6);
    game.play(0);
    const res = game.play(6);
    expect(res).to.equal('Player 1 wins!');
  });

  it('returns a vertical winner if there is one', function () {
    game.play(0);
    game.play(1);
    game.play(0);
    game.play(1);
    game.play(0);
    game.play(2);
    game.play(0);
    game.play(6);
    game.play(0);
    game.play(6);
    let res = game.play(0);
    expect(res).to.equal('Player 1 wins!');
  });
});
