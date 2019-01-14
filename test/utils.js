import { assert } from 'chai';

import {
    flattenArray,
    normalizeCoordinate,
} from '../src/utils';

describe('Utils from src/utils.js', () => {
    it('Function flattenArray()', () => {
        assert.sameDeepOrderedMembers(
            flattenArray([
                ['a1'],
                [
                    ['b1', 'b2'],
                ],
            ]),
            ['a1', 'b1', 'b2']
        );
    });

    it('Function normalizeCoordinate()', () => {
        assert.strictEqual(
            normalizeCoordinate(2, 4),
            2
        );
        assert.strictEqual(
            normalizeCoordinate(-2, 4),
            3
        );
        assert.strictEqual(
            normalizeCoordinate(6, 4),
            4
        );
        assert.strictEqual(
            normalizeCoordinate(-6, 4),
            0
        );
        assert.strictEqual(
            normalizeCoordinate(6, 4, { isStrict: true }),
            undefined
        );
        assert.strictEqual(
            normalizeCoordinate(-6, 4, { isStrict: true }),
            undefined
        );
    });
});
