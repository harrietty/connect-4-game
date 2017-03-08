function checkFourMatching (colHeight, col) {
    let player;
    for (let i = 0; i < colHeight - 3; i++) {
        player = col[i];
        if (player) {
            if (col[i] === player &&
                col[i + 1] === player &&
                col[i + 2] === player &&
                col[i + 3] === player) {
                return player;
            }
        }
    }
    return false;
}

function rotateMatrix (matrix) {
    const height = matrix[0].length;
    const res = [];
    for (var i = 0; i < height; i++) { // 0, 1, 2
        const newRow = [];
        for (var j = 0; j < matrix.length; j++) {
            newRow.unshift(matrix[j][i]);
        }
        res.push(newRow);
    }
    return res;
}

module.exports = {
    checkFourMatching,
    rotateMatrix
};