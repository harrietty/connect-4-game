/* global expect */
import {fillWithNull} from './helpers';

describe('fillWithNull', function () {
    test('fills empty values in a nested array', function () {
        expect(fillWithNull([[1, 2], [1, 2, 3], [1]], 3)).toEqual([[1, 2, null], [1, 2, 3], [1, null, null]]);
    });
});