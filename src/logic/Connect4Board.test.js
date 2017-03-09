/* global expect */
import { genNewBoard } from './Connect4Board';

describe('genNewBoard', function () {
    test('returns a new board', function () {
        expect(genNewBoard(2, 4)).toEqual([
            [{player: null, position: [0, 0]}, {player: null, position: [0, 1]}, {player: null, position: [0, 2]}, {player: null, position: [0, 3]}],
            [{player: null, position: [1, 0]}, {player: null, position: [1, 1]}, {player: null, position: [1, 2]}, {player: null, position: [1, 3]}]
        ]);
    });
});