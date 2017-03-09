/* global expect */
import {rotateMatrix} from './helpers';

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