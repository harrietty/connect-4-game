export function fillWithNull (matrix, l) {
    return matrix.map(function (row) {
        const res = [];
        for (let i = 0; i < l; i++) {
            row[i] === undefined ? res.push(null) : res.push(row[i]);
        }
        return res;
    });
}

export function rotateMatrix (matrix) {
    const height = getLongestArrLength(matrix);
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

export function getLongestArrLength (matrix) {
    return matrix.reduce(function (l, row) {
        return row.length > l ? row.length : l;
    }, 0);
}