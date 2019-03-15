import { assert } from 'chai';

import { Matrix } from '../src';

import { matrix } from './constants';
const m = new Matrix(matrix);

describe('Class Matrix from src/Matrix.js', () => {
    it('Method getColumns() returns the requested columns', () => {
        assert.sameDeepOrderedMembers(
            m.getColumns(),
            [
                ['a1', 'b1', 'c1'],
                ['a2', 'b2', 'c2'],
                ['a3', 'b3', 'c3'],
                ['a4', 'b4', 'c4'],
            ]
        );
    });

    it('Method getColumn() returns the requested column', () => {
        assert.sameDeepOrderedMembers(
            m.getColumn(2),
            ['a3', 'b3', 'c3']
        );
    });

    it('Method getRows() returns the requested rows', () => {
        assert.sameDeepOrderedMembers(
            m.getRows(),
            [
                ['a1', 'a2', 'a3', 'a4'],
                ['b1', 'b2', 'b3', 'b4'],
                ['c1', 'c2', 'c3', 'c4'],
            ]
        );
    });

    it('Method getRow() returns the requested row', () => {
        assert.sameDeepOrderedMembers(
            m.getRow(2),
            ['c1', 'c2', 'c3', 'c4']
        );
    });

    it('Method getMajorDiagonals() returns the requested diagonals', () => {
        assert.sameDeepOrderedMembers(
            m.getMajorDiagonals(),
            [
                ['a4'],
                ['a3', 'b4'],
                ['a2', 'b3', 'c4'],
                ['a1', 'b2', 'c3'],
                ['b1', 'c2'],
                ['c1'],
            ]
        );
    });

    it('Method getMajorDiagonal() returns the major diagonal', () => {
        assert.sameDeepOrderedMembers(
            m.getMajorDiagonal(),
            ['a1', 'b2', 'c3']
        );
    });

    it('Method getMinorDiagonals() returns the requested diagonals', () => {
        assert.sameDeepOrderedMembers(
            m.getMinorDiagonals(),
            [
                ['a1'],
                ['a2', 'b1'],
                ['a3', 'b2', 'c1'],
                ['a4', 'b3', 'c2'],
                ['b4', 'c3'],
                ['c4'],
            ]
        );
    });

    it('Method getMinorDiagonal() returns the minor diagonal', () => {
        assert.sameDeepOrderedMembers(
            m.getMinorDiagonal(),
            ['a4', 'b3', 'c2']
        );
    });

    it('Method getElements() returns the requested elements', () => {
        assert.sameDeepOrderedMembers(
            m.getElements(),
            ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4'],
            'Failure with no options.'
        );

        assert.sameDeepOrderedMembers(
            m.getElements({ startX: 1, startY: 1 }),
            ['b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4'],
            'Failure with option { startX: 1, startY: 1 }.'
        );
        assert.sameDeepOrderedMembers(
            m.getElements({ startX: -2, startY: -1 }),
            ['c3', 'c4'],
            'Failure with option { startX: -2, startY: -1 }.'
        );
        assert.sameDeepOrderedMembers(
            m.getElements({ startX: 2, startY: 2, endX: 1, direction: Matrix.COLLECTION_TYPE_COLUMN }),
            ['c3', 'b3', 'a3', 'c2'],
            'Failure with option { startX: 2, startY: 2, endX: 1, direction: Matrix.COLLECTION_TYPE_COLUMN }.'
        );

        assert.sameDeepOrderedMembers(
            m.getElements({ direction: Matrix.COLLECTION_TYPE_COLUMN }),
            ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3', 'a4', 'b4', 'c4'],
            'Failure with option { direction: Matrix.COLLECTION_TYPE_COLUMN }'
        );
        assert.sameDeepOrderedMembers(
            m.getElements({ direction: Matrix.COLLECTION_TYPE_MAJOR_DIAGONAL }),
            ['a4', 'a3', 'b4', 'a2', 'b3', 'c4', 'a1', 'b2', 'c3', 'b1', 'c2', 'c1'],
            'Failure with option { direction: Matrix.COLLECTION_TYPE_MAJOR_DIAGONAL }'
        );
        assert.sameDeepOrderedMembers(
            m.getElements({ direction: Matrix.COLLECTION_TYPE_MINOR_DIAGONAL }),
            ['a1', 'a2', 'b1', 'a3', 'b2', 'c1', 'a4', 'b3', 'c2', 'b4', 'c3', 'c4'],
            'Failure with option { direction: Matrix.COLLECTION_TYPE_MINOR_DIAGONAL }'
        );
        assert.sameDeepOrderedMembers(
            m.getElements({ direction: Matrix.COLLECTION_TYPE_ROW }),
            ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4'],
            'Failure with option { direction: Matrix.COLLECTION_TYPE_ROW }'
        );

        assert.sameDeepOrderedMembers(
            m.getElements({ direction: 'blah-blah-blah' }),
            ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4'],
            'Failure with option { direction: \'blah-blah-blah\' }'
        );
    });

    it('Method getElement() returns the requested element', () => {
        assert.strictEqual(
            m.getElement(2, 1),
            'b3'
        );
    });

    it('Method getSubMatrix() returns the requested matrix', () => {
        assert.sameDeepOrderedMembers(
            m.getSubMatrix({ from: [1, 1], to: [2, 2] }),
            [
                ['b2', 'b3'],
                ['c2', 'c3'],
            ],
            'With parameters { from: [1, 1], to: [2, 2] }'
        );
        assert.sameDeepOrderedMembers(
            m.getSubMatrix({ from: [-2, -1], to: [1, 1] }),
            [
                ['a1', 'a2', 'a3', 'a4'],
                ['b1', 'b2', 'b3', 'b4'],
                ['c1', 'c2', 'c3', 'c4'],

                ['c3', 'c2'],
                ['b3', 'b2'],
            ],
            'With parameters { from: [-2, -1], to: [1, 1] }'
        );
        assert.sameDeepOrderedMembers(
            m.getSubMatrix({ adjoinedTo: [1, 1] }),
            [
                ['b2', 'c2'],
                ['b3', 'c3'],
            ]
        );
        assert.sameDeepOrderedMembers(
            m.getSubMatrix({ adjoinedTo: [1, 1], distances: [1, 0] }),
            [
                ['b1', 'b2', 'b3'],
            ]
        );
    });
});
