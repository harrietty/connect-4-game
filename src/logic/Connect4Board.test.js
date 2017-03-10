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

describe('checkDiagonalWinner', function () {
    test('can check for a diagonal winner from a single corner', function () {
        let sampleBoard = [
            [1, 2, 1, 2, 1, 2],
            [1, 1, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 1, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe(1);
        sampleBoard = [
            [1, 2, 1, 2, 1, 2],
            [1, 1, 2, 2, 1, 2],
            [1, 2, 2, 2, 1, 2],
            [1, 2, 1, 1, 2, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe(2);
        sampleBoard = [
            [1, 2, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 2, 1, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe(2);
        sampleBoard = [
            [1, 2, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2],
            [1, 1, 1, 2, 1, 2],
            [1, 2, 1, 1, 1, 2],
            [1, 2, 1, 1, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe(1);
        sampleBoard = [
            [1, 2, 1, 2, 1, 2],
            [2, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 1, 1, 2],
            [1, 1, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 1, 1, 2]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe(1);
    });
    test('returns false for a diagnonal winner if there is none', function () {
        let sampleBoard = [
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 2, 1, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkDiagonalWinner(sampleBoard)).toBe(false);
    });
    test('can check for diagonal wins in all directions', function () {
        let board = [
            [1, 2, 1, 2, 1, 2],
            [1, 1, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 2, 1, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkAllDiagonals(board)).toBe(1);
        board = [
            [1, 2, 1, 2, 1, 2],
            [1, 2, 2, 2, 1, 2],
            [1, 2, 2, 2, 1, 2],
            [1, 2, 2, 1, 1, 2],
            [1, 2, 1, 2, 1, 2],
            [1, 1, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkAllDiagonals(board)).toBe(1);
        board = [
            [1, 2, 1, 2, 1, 2],
            [1, 2, 2, 2, 1, 2],
            [1, 4, 2, 2, 1, 2],
            [1, 2, 2, 1, 1, 2],
            [1, 2, 3, 2, 1, 2],
            [1, 1, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkAllDiagonals(board)).toBe(2);
        board = [
            [1, 2, 1, 2, 7, 2],
            [1, 2, 2, 7, 1, 2],
            [1, 4, 7, 2, 1, 2],
            [1, 7, 2, 1, 1, 2],
            [1, 2, 3, 5, 1, 2],
            [1, 1, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkAllDiagonals(board)).toBe(7);
        board = [
            [1, 2, 1, 2, 1, 2],
            [1, 2, 2, 7, 1, 2],
            [1, 4, 2, 2, 1, 2],
            [1, 2, 5, 1, 1, 2],
            [1, 2, 3, 2, 1, 2],
            [1, 1, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 2]
        ];
    });
    test('can check diagonals in a board with empty spaces', function () {
        const board = [['Player 1'],
        ['Player 2', 'Player 1'],
        ['Player 2', 'Player 2', 'Player 1'],
        ['Player 1', 'Player 2', 'Player 2', 'Player 1'],
        ['Player 1'],
        [],
        []];
        expect(checkAllDiagonals(board)).toBe('Player 1');
    });
});

describe('checkForWinner', function () {
    test('can check for a winner in any direction', function () {
        const board = [
            [1, 2, 1, 2, 1, 2],
            [1, 2, 2, 7, 1, 2],
            [1, 4, 2, 2, 1, 2],
            [5, 2, 5, 1, 1, 5],
            [1, 2, 3, 2, 1, 2],
            [1, 1, 1, 2, 2, 2],
            [1, 2, 1, 2, 1, 2]
        ];
        expect(checkForWinner(board)).toBe(1);
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

describe.only('takeTurn', function () {
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