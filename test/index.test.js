'use strict';

const chai = require('chai');
const expect = chai.expect;

const Matrix = require('../index');

describe('Initialization a new instance with', () => {
    it('matrix "" throws exception', () => {
        expect(() => {
            const m = new Matrix();
        }).to.throw(/is not correct matrix/i);
    });

    it('matrix "someString" throws exception', () => {
        expect(() => {
            const m = new Matrix('someString');
        }).to.throw(/is not correct matrix/i);
    });

    it('matrix "[1, 2, 3]" throws exception', () => {
        expect(() => {
            const m = new Matrix([1, 2, 3]);
        }).to.throw(/is not correct matrix/i);
    });

    it('matrix "[[1, 2], [3]]" throws exception', () => {
        expect(() => {
            const m = new Matrix([1, 2, 3]);
        }).to.throw(/is not correct matrix/i);
    });

    it('matrix "[[1, 2], [3, 4]]" not throws exception', () => {
        expect(() => {
            const m = new Matrix([
                [1, 2],
                [3, 4]
            ]);
        }).to.not.throw();
    });
});

describe('Get matrix items:', () => {
    // Matrix
    describe('get()', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);

        it('get() returns matrix', () => {
            expect(m.get()).to.eql([[1, 2], [3, 4], [5, 6]]);
        });
    });

    // Single row by index
    describe('getRow(number)', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4]
        ]);

        it('getRow(6) returns undefined', () => {
            expect(m.getRow(6)).to.equal(undefined);
        });

        it('getRow(1) returns row with zero-based index 1', () => {
            expect(m.getRow(1)).to.eql([3, 4]);
        });
    });

    // Rows by indices range
    describe('getRows(begin[, end])', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8]
        ]);

        it('getRows(2) returns rows beginning from zero-based index 2 to the last one', () => {
            expect(m.getRows(2)).to.eql([[5, 6], [7, 8]]);
        });

        it('getRows(-3) returns rows beginning from zero-based index=(<rows amount> + begin) to the last one', () => {
            expect(m.getRows(-3)).to.eql([[3, 4], [5, 6], [7, 8]]);
        });

        it('getRows(1, 3) returns rows beginning from zero-based index 1 to index 2', () => {
            expect(m.getRows(1, 3)).to.eql([[3, 4], [5, 6]]);
        });

        it('getRows(1, -1) returns rows beginning from zero-based index 1 to index=(<rows amount> + end)', () => {
            expect(m.getRows(1, -1)).to.eql([[3, 4], [5, 6]]);
        });
    });

    // Single column by index
    describe('getColumn(number)', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4]
        ]);

        it('getColumn(6) returns undefined', () => {
            expect(m.getColumn(6)).to.equal(undefined);
        });

        it('getColumn(1) returns column with zero-based index 1', () => {
            expect(m.getColumn(1)).to.eql([2, 4]);
        });
    });

    // Columns by indices range
    describe('getColumns(begin[, end])', () => {
        const m = new Matrix([
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ]);

        it('getColumns(2) returns columns beginning from zero-based index 2 to the last one', () => {
            expect(m.getColumns(2)).to.eql([[3, 7], [4, 8]]);
        });

        it('getColumns(-3) returns columns beginning from zero-based index=(<columns amount> + begin) to the last one', () => {
            expect(m.getColumns(-3)).to.eql([[2, 6], [3, 7], [4, 8]]);
        });

        it('getColumns(1, 3) returns columns beginning from zero-based index 1 to index 3', () => {
            expect(m.getColumns(1, 3)).to.eql([[2, 6], [3, 7]]);
        });

        it('getColumns(1, -1) returns columns beginning from zero-based index 1 to index=(<columns amount> + end)', () => {
            expect(m.getColumns(1, -1)).to.eql([[2, 6], [3, 7]]);
        });
    });

    // Single major diagonal by index
    describe('getDiagonalMaj(number)', () => {
        const m = new Matrix([
            [1,  2,  3,  4],
            [5,  6,  7,  8],
            [9, 10, 11, 12]
        ]);

        it('getDiagonalMaj(6) returns undefined', () => {
            expect(m.getDiagonalMaj(6)).to.equal(undefined);
        });

        it('getDiagonalMaj(2) returns major diagonal with zero-based index 2', () => {
            expect(m.getDiagonalMaj(2)).to.eql([2, 7, 12]);
        });

        it('getDiagonalMaj(4) returns major diagonal with zero-based index 4', () => {
            expect(m.getDiagonalMaj(4)).to.eql([5, 10]);
        });
    });

    // Major diagonals by indices range
    describe('getDiagonalsMaj(begin[, end])', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8]
        ]);

        it('getDiagonalsMaj(2) returns major diagonals beginning from zero-based index 2 to the last one', () => {
            expect(m.getDiagonalsMaj(2)).to.eql([[3, 6], [5, 8], [7]]);
        });

        it('getDiagonalsMaj(-3) returns major diagonals beginning from zero-based index=(<diagonals amount> + begin) to the last one', () => {
            expect(m.getDiagonalsMaj(-3)).to.eql([[3, 6], [5, 8], [7]]);
        });

        it('getDiagonalsMaj(1, 3) returns major diagonals beginning from zero-based index 1 to index 2', () => {
            expect(m.getDiagonalsMaj(1, 3)).to.eql([[1, 4], [3, 6]]);
        });

        it('getDiagonalsMaj(1, -1) returns major diagonals beginning from zero-based index 1 to index=(<diagonals amount> + end)', () => {
            expect(m.getDiagonalsMaj(1, -1)).to.eql([[1, 4], [3, 6], [5, 8]]);
        });
    });

    // Single minor diagonal by index
    describe('getDiagonalMin(number)', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);

        it('getDiagonalMin(6) returns undefined', () => {
            expect(m.getDiagonalMin(6)).to.equal(undefined);
        });

        it('getDiagonalMin(1) returns minor diagonal with zero-based index 1', () => {
            expect(m.getDiagonalMin(1)).to.eql([2, 3]);
        });

        it('getDiagonalMin(2) returns minor diagonal with zero-based index 2', () => {
            expect(m.getDiagonalMin(2)).to.eql([4, 5]);
        });
    });

    // Minor diagonals by indices range
    describe('getDiagonalsMin(begin[, end])', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8]
        ]);

        it('getDiagonalsMin(2) returns minor diagonals beginning from zero-based index 2 to the last one', () => {
            expect(m.getDiagonalsMin(2)).to.eql([[4, 5], [6, 7], [8]]);
        });

        it('getDiagonalsMin(-3) returns minor diagonals beginning from zero-based index=(<diagonals amount> + begin) to the last one', () => {
            expect(m.getDiagonalsMin(-3)).to.eql([[4, 5], [6, 7], [8]]);
        });

        it('getDiagonalsMin(1, 3) returns minor diagonals beginning from zero-based index 1 to index 3', () => {
            expect(m.getDiagonalsMin(1, 3)).to.eql([[2, 3], [4, 5]]);
        });

        it('getDiagonalsMin(1, -1) returns minor diagonals beginning from zero-based index 1 to index=(<diagonals amount> + end)', () => {
            expect(m.getDiagonalsMin(1, -1)).to.eql([[2, 3], [4, 5], [6, 7]]);
        });
    });
});
