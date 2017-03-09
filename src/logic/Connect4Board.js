export function genNewBoard (cols, rows) {
  const board = [];

  for (let i = 0; i < cols; i++) {
    const newRow = [];
    for (let j = 0; j < rows; j++) {
      newRow.push({player: null, position: [i, j]});
    }
    board.push(newRow);
  }
  return board;
}