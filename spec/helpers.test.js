/* global expect*/
import { checkFourMatching, rotateMatrix, getLongestArrLength } from '../src/logic/helpers';

describe('checkFourMatching', function () {
 test('returns the player with four matching adjascent counters', function () {
        let col = [2, 2, 2, 2, 1, 1];
        expect(checkFourMatching(6, col)).toBe(2);
        col = [1, 2, 2, 2, 2, 1];
        expect(checkFourMatching(6, col)).toBe(2);
        col = [1, 1, 2, 2, 2, 2];
        expect(checkFourMatching(6, col)).toBe(2);
    });
    test('returns false if nobody is winning', function () {
        let col = [];
        expect(checkFourMatching(6, col)).toBe(false);
        col = [1, 2, 1, 2, 1];
        expect(checkFourMatching(6, col)).toBe(false);
        col = [1, 1, 1, 2, 2, 2, 1];
        expect(checkFourMatching(6, col)).toBe(false);
    });
    test('can work with a column of any height', function () {
        let col = [1, 1, 2, 2, 2, 2, 1, 1];
        expect(checkFourMatching(8, col)).toBe(2);
        col = [];
        expect(checkFourMatching(8, col)).toBe(false);
    });
});

describe('getLongestArrLength', function () {
    test('should return the longest array in a matrix', function () {
        const matrix = [
            ['Player 1'],
            ['Player 2', 'Player 1'],
            ['Player 2', 'Player 2', 'Player 1'],
            ['Player 1', 'Player 2', 'Player 2', 'Player 1'],
            ['Player 1'],
            [],
            []];
        expect(getLongestArrLength(matrix)).toBe(4);
    });
});

describe('rotateMatrix', function () {
    test('can rotate a simple matrix in a clockwise direction', function () {
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
        expect(rotateMatrix(matrix)).toEqual(expected);
    });
    test('can rotate a more complex matrix in a clockwise direction', function () {
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
        expect(rotateMatrix(matrix)).toEqual(expected);
    });
    test('can rotate a matrix with undefined spaces', function () {
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
        expect(res).toEqual(expected);

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
        expect(rotateMatrix(matrix)).toEqual(expected);
    });
    test('can rotate a non-square matrix in a clockwise direction', function () {
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
        expect(rotateMatrix(matrix)).toEqual(expected);
    });
});