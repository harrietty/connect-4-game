const {checkFourMatching, rotateMatrix} = require('./helpers');

function Connect4Board () {
  this.board = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
}

Connect4Board.prototype.checkVerticalWinner = function () {
  return this.checkWinner(this.board);
};

Connect4Board.prototype.checkHorizontalWinner = function () {
  const rotatedBoard = rotateMatrix(this.board);
  return this.checkWinner(rotatedBoard);
};

Connect4Board.prototype.checkWinner = function (board) {
  return board.map(checkFourMatching.bind(null, 6)).reduce((acc, winner) => {
    if (!acc && !winner) return false;
    if (winner) return winner;
    return acc;
  }, false);  
};

Connect4Board.prototype.addPlayer = function (col, player) {
  this.board[col].push(player);
};

Connect4Board.prototype.checkForSpace = function (col) {
  if (col === undefined) return 'Please select a column';
  return this.board[col].length < 6;
};

function Connect4 () {
  this.board = new Connect4Board();
  this.player = 'Player 1';
}

Connect4.prototype.play = function (col) {
  if (col === undefined) return 'Please select a column';

  if (this.board.checkForSpace(col)) this.board.addPlayer(col, this.player);
  else return 'This column is full';

  const winner = this.board.checkHorizontalWinner() || this.board.checkVerticalWinner();
  if (winner) return `${winner} wins!`;

  if (this.player === 'Player 1') {
    this.player = 'Player 2';
    return 'Player 2\'s turn';
  } else {
    this.player = 'Player 1';
    return 'Player 1\'s turn';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {Connect4, Connect4Board};
}
