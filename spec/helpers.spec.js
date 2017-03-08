const path = require('path');
const expect = require('chai').expect;

const { checkFourMatching, rotateMatrix, getLongestArrLength } = require(path.join(__dirname, '..', 'helpers'));

describe('checkFourMatching', function () {
    it('is a function', function () {
        expect(checkFourMatching).to.be.a('function');
    });
    it('returns the player with four matching adjascent counters', function () {
        let col = [2, 2, 2, 2, 1, 1];
        expect(checkFourMatching(6, col)).to.equal(2);
        col = [1, 2, 2, 2, 2, 1];
        expect(checkFourMatching(6, col)).to.equal(2);
        col = [1, 1, 2, 2, 2, 2];
        expect(checkFourMatching(6, col)).to.equal(2);
    });
    it('returns false if nobody is winning', function () {
        let col = [];
        expect(checkFourMatching(6, col)).to.equal(false);
        col = [1, 2, 1, 2, 1];
        expect(checkFourMatching(6, col)).to.equal(false);
        col = [1, 1, 1, 2, 2, 2, 1];
        expect(checkFourMatching(6, col)).to.equal(false);
    });
    it('can work with a column of any height', function () {
        let col = [1, 1, 2, 2, 2, 2, 1, 1];
        expect(checkFourMatching(8, col)).to.equal(2);
        col = [];
        expect(checkFourMatching(8, col)).to.equal(false);
    });
});

describe('getLongestArrLength', function () {
    it('should exist', function () {
        expect(getLongestArrLength).to.be.a('function');
    });
    it('should return the longest array in a matrix', function () {
        const matrix = [
            ['Player 1'],
            ['Player 2', 'Player 1'],
            ['Player 2', 'Player 2', 'Player 1'],
            ['Player 1', 'Player 2', 'Player 2', 'Player 1'],
            ['Player 1'],
            [],
            []];
        expect(getLongestArrLength(matrix)).to.equal(4);
    });
});

describe('rotateMatrix', function () {
    it('is a function', function () {
        expect(rotateMatrix).to.be.a('function');
    });
    it('can rotate a simple matrix in a clockwise direction', function () {
        const matrix = [
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3]
        ];
        const expected = [
            [1, 1, 1],
            [2, 2, 2],
            [3, 3, 3]
        ];
        expect(rotateMatrix(matrix)).to.eql(expected);
    });
    it('can rotate a more complex matrix in a clockwise direction', function () {
        const matrix = [
            [1, 2, 3, 4],
            [1, 5, 3, 3],
            [1, 6, 3, 1]
        ];
        const expected = [
            [1, 1, 1],
            [6, 5, 2],
            [3, 3, 3],
            [1, 3, 4]
        ];
        expect(rotateMatrix(matrix)).to.eql(expected);
    });
    it('can rotate a matrix with undefined spaces', function () {
        let matrix = [
            [1, 2, 3, undefined],
            [1, 5, undefined, 3],
            [1, 6, 3],
            []
        ];
        let expected = [
            [undefined, 1, 1, 1],
            [undefined, 6, 5, 2],
            [undefined, 3, undefined, 3],
            [undefined, undefined, 3, undefined]
        ];
        const res = rotateMatrix(matrix);
        expect(res).to.eql(expected);

        matrix = [
            ['Player 1'],
            ['Player 2', 'Player 1'],
            ['Player 2', 'Player 2', 'Player 1'],
            ['Player 1', 'Player 2', 'Player 2', 'Player 1'],
            ['Player 1'],
            [],
            []];
        expected = [
            [undefined, undefined, 'Player 1', 'Player 1', 'Player 2', 'Player 2', 'Player 1'],
            [undefined, undefined, undefined, 'Player 2', 'Player 2', 'Player 1', undefined],
            [undefined, undefined, undefined, 'Player 2', 'Player 1', undefined, undefined],
            [undefined, undefined, undefined, 'Player 1', undefined, undefined, undefined]
        ];
        expect(rotateMatrix(matrix)).to.eql(expected);
    });
    it('can rotate a non-square matrix in a clockwise direction', function () {
        const matrix = [
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3]
        ];
        const expected = [
            [1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3]
        ];
        expect(rotateMatrix(matrix)).to.eql(expected);
    });
});