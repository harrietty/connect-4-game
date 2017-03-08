/* global expect */
const path = require('path');

const { Connect4, Connect4Board } = require(path.join(__dirname, '..', './main.js'));

describe('Connect4Board', function () {
  let board;
  beforeEach(() => {
    board = new Connect4Board();
  });
  it('returns a new board', function () {
    expect(board.board).toEqual([[], [], [], [], [], [], []]);
  });
  it('can add a counter to the board', function () {
    board.addPlayer(0, 'Player 1');
    board.addPlayer(1, 'Player 2');
    expect(board.board[0]).toEqual(['Player 1']);
    expect(board.board[1]).toEqual(['Player 2']);
    board.addPlayer(0, 'Player 1');
    board.addPlayer(1, 'Player 2');
    expect(board.board[0]).toEqual(['Player 1', 'Player 1']);
    expect(board.board[1]).toEqual(['Player 2', 'Player 2']);
  });
  it('can check if there is space in a column to place a counter', function () {
    expect(board.checkForSpace()).toBe('Please select a column');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    expect(board.checkForSpace(0)).toBe(true);
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    board.addPlayer(0, 'Player 2');
    board.addPlayer(0, 'Player 1');
    expect(board.checkForSpace(0)).toBe(false);
  });
  it('can check for a vertical winner', function () {
    expect(board.checkVerticalWinner()).toBe(false);
    board.board[0] = ['Player 1', 'Player 1', 'Player 1', 'Player 1'];
    let res = board.checkVerticalWinner();
    expect(res).toBe('Player 1');
    board.board[3] = ['Player 2', 'Player 1', 'Player 1', 'Player 1', 'Player 1', 'Player 2'];
    res = board.checkVerticalWinner();
    expect(res).toBe('Player 1');
    board.board[2] = ['Player 2', 'Player 2', 'Player 1', 'Player 1', 'Player 1', 'Player 1'];
    res = board.checkVerticalWinner();
    expect(res).toBe('Player 1');
  });
  it('can check for a horizontal winner', function () {
    board.board = [
      [1, 1, 2],
      [1, 1, 2],
      [2, 1],
      [2, 2],
      [2],
      [2],
      [2, 1]
    ];
    expect(board.checkHorizontalWinner()).toBe(2);
    board.board = [
      [2, 1, 2],
      [1, 1, 2],
      [2, 1],
      [2, 1],
      [2],
      [1],
      [2, 1]
    ];
    expect(board.checkHorizontalWinner()).toBe(1);
  });
  it('can check for a diagonal winner from a single corner', function () {
    let sampleBoard = [
      [1, 2, 1, 2, 1, 2],
      [1, 1, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkDiagonalWinner(sampleBoard)).toBe(1);
    sampleBoard = [
      [1, 2, 1, 2, 1, 2],
      [1, 1, 2, 2, 1, 2],
      [1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkDiagonalWinner(sampleBoard)).toBe(2);
    sampleBoard = [
      [1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkDiagonalWinner(sampleBoard)).toBe(2);
    sampleBoard = [
      [1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2],
      [1, 1, 1, 2, 1, 2],
      [1, 2, 1, 1, 1, 2],
      [1, 2, 1, 1, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkDiagonalWinner(sampleBoard)).toBe(1);
    sampleBoard = [
      [1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 1, 2],
      [1, 1, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 1, 2]
    ];
    expect(board.checkDiagonalWinner(sampleBoard)).toBe(1);
  });
  it('returns false for a diagnonal winner if there is none', function () {
    let sampleBoard = [
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkDiagonalWinner(sampleBoard)).toBe(false);
  });
  it('can check for diagonal wins in all directions', function () {
    board.board = [
      [1, 2, 1, 2, 1, 2],
      [1, 1, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkAllDiagonals()).toBe(1);
    board.board = [
      [1, 2, 1, 2, 1, 2],
      [1, 2, 2, 2, 1, 2],
      [1, 2, 2, 2, 1, 2],
      [1, 2, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 1, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkAllDiagonals()).toBe(1);
    board.board = [
      [1, 2, 1, 2, 1, 2],
      [1, 2, 2, 2, 1, 2],
      [1, 4, 2, 2, 1, 2],
      [1, 2, 2, 1, 1, 2],
      [1, 2, 3, 2, 1, 2],
      [1, 1, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkAllDiagonals()).toBe(2);
    board.board = [
      [1, 2, 1, 2, 7, 2],
      [1, 2, 2, 7, 1, 2],
      [1, 4, 7, 2, 1, 2],
      [1, 7, 2, 1, 1, 2],
      [1, 2, 3, 5, 1, 2],
      [1, 1, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 2]
    ];
    expect(board.checkAllDiagonals()).toBe(7);
    board.board = [
      [1, 2, 1, 2, 1, 2],
      [1, 2, 2, 7, 1, 2],
      [1, 4, 2, 2, 1, 2],
      [1, 2, 5, 1, 1, 2],
      [1, 2, 3, 2, 1, 2],
      [1, 1, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 2]
    ];
  });
  it('can check diagonals in a board with empty spaces', function () {
    board.board = [['Player 1'],
    ['Player 2', 'Player 1'],
    ['Player 2', 'Player 2', 'Player 1'],
    ['Player 1', 'Player 2', 'Player 2', 'Player 1'],
    ['Player 1'],
    [],
    []];
    expect(board.checkAllDiagonals()).toBe('Player 1');
  });
});

describe('Connect4()', function () {
  let game;
  beforeEach(() => {
    game = new Connect4();
  });

  it('returns "Please select a column" if no column given', function () {
    expect(game.play()).toBe('Please select a column');
  });

  it('changes the player when you call the play method', function () {
    let res = game.play(0);
    expect(game.player).toBe('Player 2');
    expect(res).toBe('Player 2\'s turn');
    res = game.play(0);
    expect(res).toBe('Player 1\'s turn');
  });

  it('returns "This column is full" if you try to play in a full column', function () {
    game.play(0);
    game.play(0);
    game.play(0);
    game.play(0);
    game.play(0);
    game.play(0);
    let res = game.play(0);
    expect(res).toBe('This column is full');
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
    expect(res).toBe('Player 1 wins!');
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
    expect(res).toBe('Player 1 wins!');
  });

  it('returns a diagonal winner if there is one', function () {
    game.play(0);
    game.play(1);
    game.play(1);
    game.play(2);
    game.play(3);
    game.play(2);
    game.play(2);
    game.play(3);
    game.play(4);
    game.play(3);
    let res = game.play(3);
    expect(res).toBe('Player 1 wins!');
  });

  it('can reset the board', function () {
    const res = game.reset();
    expect(res).toBe('Board reset, Player 1\'s turn');
    expect(game.board.board).toEqual([[], [], [], [], [], [], []]);
  });
});
