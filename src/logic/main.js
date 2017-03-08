import {checkFourMatching, rotateMatrix} from './helpers';

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
  return board.map(checkFourMatching.bind(null, board[0].length)).reduce((acc, winner) => {
    if (!acc && !winner) return false;
    if (winner) return winner;
    return acc;
  }, false);
};

Connect4Board.prototype.checkAllDiagonals = function () {
  const rotate90 = rotateMatrix(this.board);
  const rotate180 = rotateMatrix(rotate90);
  const rotate270 = rotateMatrix(rotate180);

  return this.checkDiagonalWinner(this.board) || this.checkDiagonalWinner(rotate90) || this.checkDiagonalWinner(rotate180) || this.checkDiagonalWinner(rotate270);
};

Connect4Board.prototype.checkDiagonalWinner = function (board) {
  const rowsToCheck = board.slice(0, board.length - 3);

  return rowsToCheck.map(function (row, rowI) {
    // will return the winner if there is a win in the given row
    const maxWidth = row.length - 3;
    for (var i = 0; i < maxWidth; i++) {
      const counter = board[rowI][i];
      if ((board[rowI + 1] && board[rowI + 1][i + 1] === counter) &&
        (board[rowI + 2] && board[rowI + 2][i + 2] === counter) &&
        (board[rowI + 3] && board[rowI + 3][i + 3] === counter)) {
        return counter;
      }
    }
    return false;
  }).reduce(function (acc, val) {
    if (!acc && !val) return false;
    if (val) return val;
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

  const winner = this.board.checkHorizontalWinner() || this.board.checkVerticalWinner() || this.board.checkAllDiagonals();

  if (winner) return `${winner} wins!`;

  if (this.player === 'Player 1') {
    this.player = 'Player 2';
    return 'Player 2\'s turn';
  } else {
    this.player = 'Player 1';
    return 'Player 1\'s turn';
  }
};

Connect4.prototype.reset = function () {
  this.board = new Connect4Board();
  this.player = 'Player 1';
  return 'Board reset, Player 1\'s turn';
};

export {
  Connect4,
  Connect4Board
};
