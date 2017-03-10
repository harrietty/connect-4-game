/* global expect */
import { genNewBoard, checkFourMatching, checkForWinner, checkDiagonalWinner, checkAllDiagonals, checkForSpace, takeTurn } from './Connect4Board';

describe('genNewBoard', function () {
    test('returns a new board', function () {
        expect(genNewBoard(2, 4)).toEqual([
            [{ player: null, position: [0, 0] }, { player: null, position: [0, 1] }, { player: null, position: [0, 2] }, { player: null, position: [0, 3] }],
            [{ player: null, position: [1, 0] }, { player: null, position: [1, 1] }, { player: null, position: [1, 2] }, { player: null, position: [1, 3] }]
        ]);
    });
});

describe('checkFourMatching', function () {
    test('returns the player with four matching adjascent counters', function () {
        let col = [{ player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 1' }];
        expect(checkFourMatching(col)).toBe('Player 1');
        col = [{ player: 'Player 1' }, { player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 2' }];
        expect(checkFourMatching(col)).toBe('Player 2');
    });
    test('returns false if nobody is winning', function () {
        let col = [];
        expect(checkFourMatching(col)).toBe(false);
        col = [{ player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 1' }];
        expect(checkFourMatching(col)).toBe(false);
        col = [{ player: 'Player 1' }, { player: 'Player 1' }, { player: null }, { player: null }];
        expect(checkFourMatching(6, col)).toBe(false);
    });
    test('can work with a column of any height', function () {
        let col = [{ player: 'Player 1' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 1' }];
        expect(checkFourMatching(col)).toBe('Player 1');
        col = [{ player: 'Player 1' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 2' }];
        expect(checkFourMatching(col)).toBe(false);
    });
});

describe('checkDiagonalWinner', function () {
    test('can check for a diagonal winner from a single corner', function () {
        let sampleBoard = [
            [{ player: 'Player 1' }, { player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 2' }],
            [{ player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 3' }, { player: 'Player 4' }, { player: 'Player 5' }],
            [{ player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 7' }, { player: 'Player 7' }],
            [{ player: 'Player 4' }, { player: 'Player 5' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 3' }],
            [{ player: 'Player 8' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 9' }]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe('Player 1');
    });
    test('returns false for a diagnonal winner if there is none', function () {
        let sampleBoard = [
            [{ player: 'Player 5' }, { player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 2' }],
            [{ player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 3' }, { player: 'Player 4' }, { player: 'Player 5' }],
            [{ player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 7' }, { player: 'Player 7' }],
            [{ player: 'Player 4' }, { player: 'Player 5' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 3' }],
            [{ player: 'Player 8' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 9' }]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe(false);
    });
    test('can check for diagonal wins in all directions', function () {
        let sampleBoard = [
            [{ player: 'Player 5' }, { player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 2' }],
            [{ player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 3' }, { player: 'Player 4' }, { player: 'Player 5' }],
            [{ player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 7' }, { player: 'Player 7' }],
            [{ player: 'Player 4' }, { player: 'Player 5' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 3' }],
            [{ player: 'Player 8' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 1' }]
        ];
        expect(checkAllDiagonals(sampleBoard)).toBe('Player 1');
        sampleBoard = [
            [{ player: 'Player 5' }, { player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 2' }],
            [{ player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 3' }, { player: 'Player 2' }, { player: 'Player 5' }],
            [{ player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 2' }, { player: 'Player 7' }, { player: 'Player 7' }],
            [{ player: 'Player 4' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 3' }],
            [{ player: 'Player 8' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 4' }]
        ];
        expect(checkAllDiagonals(sampleBoard)).toBe('Player 2');
        sampleBoard = [
            [{ player: 'Player 5' }, { player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 6' }],
            [{ player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 3' }, { player: 'Player 8' }, { player: 'Player 5' }],
            [{ player: 'Player 2' }, { player: 'Player 1' }, { player: 'Player 8' }, { player: 'Player 7' }, { player: 'Player 7' }],
            [{ player: 'Player 4' }, { player: 'Player 8' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 3' }],
            [{ player: 'Player 8' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 4' }]
        ];
        expect(checkAllDiagonals(sampleBoard)).toBe('Player 8');
    });
});

describe('checkForWinner', function () {
    test('can check for a winner in any direction', function () {
        let board = [
            [{player: 'Player 1'}, {player: 'Player 1'}, {player: 'Player 1'}, {player: 'Player 1'}],
            [{player: 'Player 1'}, {player: 'Player 2'}, {player: 'Player 1'}, {player: 'Player 1'}]
        ];
        expect(checkForWinner(board)).toBe('Player 1');

        board = [
            [{ player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 6' }, { player: 'Player 2' }, { player: 'Player 2' }],
            [{ player: 'Player 1' }, { player: 'Player 8' }, { player: 'Player 3' }, { player: 'Player 4' }, { player: 'Player 5' }],
            [{ player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 8' }, { player: 'Player 7' }, { player: 'Player 7' }],
            [{ player: 'Player 1' }, { player: 'Player 8' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 3' }],
            [{ player: 'Player 1' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 1' }, { player: 'Player 9' }]
        ];
        expect(checkForWinner(board)).toBe('Player 1');

        board = [
            [{ player: 'Player 2' }, { player: 'Player 2' }, { player: 'Player 6' }, { player: 'Player 2' }, { player: 'Player 2' }],
            [{ player: 'Player 1' }, { player: 'Player 8' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 5' }],
            [{ player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 8' }, { player: 'Player 2' }, { player: 'Player 7' }],
            [{ player: 'Player 1' }, { player: 'Player 8' }, { player: 'Player 1' }, { player: 'Player 1' }, { player: 'Player 2' }],
            [{ player: 'Player 0' }, { player: 'Player 2' }, { player: 'Player 4' }, { player: 'Player 8' }, { player: 'Player 2' }]
        ];
        expect(checkForWinner(board)).toBe('Player 2');
    });
});

describe('checkForSpace', function () {
    test('checks for space in a given column', function () {
        let board = [
            [{ player: null, position: [0, 0] }, { player: null, position: [0, 1] }, { player: null, position: [0, 2] }, { player: null, position: [0, 3] }],
            [{ player: null, position: [1, 0] }, { player: null, position: [1, 1] }, { player: null, position: [1, 2] }, { player: null, position: [1, 3] }]
        ];
        board = [
            [{ player: null, position: [0, 0] }, { player: null, position: [0, 1] }, { player: null, position: [0, 2] }, { player: null, position: [0, 3] }],
            [{ player: 'Player 1', position: [1, 0] }, { player: 'Player 1', position: [1, 1] }, { player: 'Player 2', position: [1, 2] }, { player: null, position: [1, 3] }]
        ];
        expect(checkForSpace(board, 1, 4)).toBe(true);
        board = [
            [{ player: 'Player 1', position: [0, 0] }, { player: 'Player 2', position: [0, 1] }, { player: 'Player 2', position: [0, 2] }, { player: 'Player 1', position: [0, 3] }],
            [{ player: null, position: [1, 0] }, { player: null, position: [1, 1] }, { player: null, position: [1, 2] }, { player: null, position: [1, 3] }]
        ];
        expect(checkForSpace(board, 0, 4)).toBe(false);
        board = [
            [{ player: 'Player 1', position: [0, 0] }, { player: 'Player 2', position: [0, 1] }, { player: 'Player 2', position: [0, 2] }, { player: 'Player 1', position: [0, 3] }],
            [{ player: null, position: [1, 0] }, { player: null, position: [1, 1] }, { player: null, position: [1, 2] }, { player: null, position: [1, 3] }]
        ];
        expect(checkForSpace(board, 0, 5)).toBe(false);
    });
});

describe('takeTurn', function () {
    test('returns a new board array', function () {
        const board = [
            [{ player: 'Player 1', position: [0, 0] }, { player: 'Player 2', position: [0, 1] }, { player: 'Player 2', position: [0, 2] }, { player: 'Player 1', position: [0, 3] }],
            [{ player: null, position: [1, 0] }, { player: null, position: [1, 1] }, { player: null, position: [1, 2] }, { player: null, position: [1, 3] }]
        ];
        expect(takeTurn(board, 1, 'Player 1')).not.toBe(board);
    });
    test('updates the next available slot in the specified column', function () {
        const board = [
            [{ player: 'Player 1', position: [0, 0] }, { player: 'Player 2', position: [0, 1] }, { player: 'Player 2', position: [0, 2] }, { player: null, position: [0, 3] }],
            [{ player: null, position: [1, 0] }, { player: null, position: [1, 1] }, { player: null, position: [1, 2] }, { player: null, position: [1, 3] }]
        ];
        const res = takeTurn(board, 0, 'Player 1');
        expect(res[0][3]).toEqual({ player: 'Player 1', position: [0, 3] });
    });
});