import {rotateMatrix} from './helpers';

export function genNewBoard (cols, rows) {
  const board = [];

  for (let i = 0; i < cols; i++) {
    const newRow = [];
    for (let j = 0; j < rows; j++) {
      newRow.push({ player: null, position: [i, j] });
    }
    board.push(newRow);
  }
  return board;
}

export function checkFourMatching (col) {
    let player;
    for (let i = 0; i < col.length - 3; i++) {
        player = col[i].player;
        if (player) {
            if (col[i + 1].player === player &&
                col[i + 2].player === player &&
                col[i + 3].player === player) {
                return player;
            }
        }
    }
    return false;
}

export function checkVerticalWinner (board) {
  return checkWinner(board);
}

export function checkHorizontalWinner (board) {
  const rotatedBoard = rotateMatrix(board);
  return checkWinner(rotatedBoard);
}

export function checkWinner (board) {
  return board.map(checkFourMatching).reduce((acc, winner) => {
    if (!acc && !winner) return false;
    if (winner) return winner;
    return acc;
  }, false);
}

export function checkAllDiagonals (board) {
  const rotate90 = rotateMatrix(board);
  const rotate180 = rotateMatrix(rotate90);
  const rotate270 = rotateMatrix(rotate180);

  return checkDiagonalWinner(board) || checkDiagonalWinner(rotate90) || checkDiagonalWinner(rotate180) || checkDiagonalWinner(rotate270);
}

export function checkDiagonalWinner (board) {
  const rowsToCheck = board.slice(0, board.length - 3);

  return rowsToCheck.map(function (row, rowI) {
    // will return the winner if there is a win in the given row
    const maxWidth = row.length - 3;
    for (let i = 0; i < maxWidth; i++) {
      const player = board[rowI][i].player;
      if ((board[rowI + 1] && board[rowI + 1][i + 1].player === player) &&
        (board[rowI + 2] && board[rowI + 2][i + 2].player === player) &&
        (board[rowI + 3] && board[rowI + 3][i + 3].player === player)) {
        return player;
      }
    }
    return false;
  }).reduce(function (acc, val) {
    if (!acc && !val) return false;
    if (val) return val;
    return acc;
  }, false);
}

export function checkForWinner (board) {
  return checkVerticalWinner(board) || checkHorizontalWinner(board) || checkAllDiagonals(board);
}

export function checkForSpace (board, col, maxColHeight) {
  if (col === undefined || board[col][maxColHeight - 1] === undefined) return false;
  return board[col][maxColHeight - 1].player === null;
}

export function takeTurn (board, col, player) {
  const nextBoard = board.slice();
  const nextSpace = findNextSpace(nextBoard, col);

  if (nextSpace !== -1) nextBoard[col][nextSpace].player = player;

  function findNextSpace (board, col) {
    for (let i = 0; i < board[col].length; i++) {
      if (board[col][i].player === null) return i;
    }
    return -1;
  }
  return nextBoard;
}