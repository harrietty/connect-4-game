/* global expect */
import { genNewBoard } from './Connect4Board';

describe('genNewBoard', function () {
    test('returns a new board', function () {
        expect(genNewBoard()).toEqual([[], [], [], [], [], [], []]);
    });
});