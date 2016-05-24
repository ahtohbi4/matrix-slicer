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
    // Single row by index
    describe('getRow(number)', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4]
        ]);

        it('getRow() throws exception', () => {
            expect(() => {
                m.getRow();
            }).to.throw(/is not correct rows index/i);
        });

        it('getRow(6) throws exception', () => {
            expect(() => {
                m.getRow(6);
            }).to.throw(/Could not get "6" row from the matrix/i);
        });

        it('getRow(1) returns row with index 1 (zero-based)', () => {
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

        it('getRows(2) returns rows beginning from index 2 (zero-based) to the last one', () => {
            expect(m.getRows(2)).to.eql([[5, 6], [7, 8]]);
        });

        it('getRows(-3) returns rows beginning from index=(<rows amount> + begin) to the last one', () => {
            expect(m.getRows(-3)).to.eql([[3, 4], [5, 6], [7, 8]]);
        });

        it('getRows(1, 2) returns rows beginning from index 1 to index 2 (zero-based)', () => {
            expect(m.getRows(1, 2)).to.eql([[3, 4], [5, 6]]);
        });

        it('getRows(1, -2) returns rows beginning from index 1 (zero-based) to index=(<rows amount> + end)', () => {
            expect(m.getRows(1, -2)).to.eql([[3, 4], [5, 6]]);
        });
    });

    // Single column by index
    describe('getColumn(number)', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4]
        ]);

        it('getColumn() throws exception', () => {
            expect(() => {
                m.getColumn();
            }).to.throw(/is not correct columns index/i);
        });

        it('getColumn(6) throws exception', () => {
            expect(() => {
                m.getColumn(6);
            }).to.throw(/Could not get "6" column from the matrix/i);
        });

        it('getColumn(1) returns column with index 1 (zero-based)', () => {
            expect(m.getColumn(1)).to.eql([2, 4]);
        });
    });

    // Columns by indices range
    describe('getColumns(begin[, end])', () => {
        const m = new Matrix([
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ]);

        it('getColumns(2) returns columns beginning from index 2 (zero-based) to the last one', () => {
            expect(m.getColumns(2)).to.eql([[3, 7], [4, 8]]);
        });

        it('getColumns(-3) returns columns beginning from index=(<columns amount> + begin) to the last one', () => {
            expect(m.getColumns(-3)).to.eql([[2, 6], [3, 7], [4, 8]]);
        });

        it('getColumns(1, 2) returns columns beginning from index 1 to index 2 (zero-based)', () => {
            expect(m.getColumns(1, 2)).to.eql([[2, 6], [3, 7]]);
        });

        it('getColumns(1, -2) returns columns beginning from index 1 (zero-based) to index=(<columns amount> + end)', () => {
            expect(m.getColumns(1, -2)).to.eql([[2, 6], [3, 7]]);
        });
    });

    // Single major diagonal by index
    describe('getDiagonalMaj(number)', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);

        it('getDiagonalMaj() throws exception', () => {
            expect(() => {
                m.getDiagonalMaj();
            }).to.throw(/is not correct diagonals index/i);
        });

        it('getDiagonalMaj(6) throws exception', () => {
            expect(() => {
                m.getDiagonalMaj(6);
            }).to.throw(/Could not get "6" diagonal from the matrix/i);
        });

        it('getDiagonalMaj(1) returns diagonal with index 1 (zero-based)', () => {
            expect(m.getDiagonalMaj(1)).to.eql([3, 6]);
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

        it('getDiagonalsMaj(2) returns diagonals beginning from index 2 (zero-based) to the last one', () => {
            expect(m.getDiagonalsMaj(2)).to.eql([[3, 6], [1, 4], [2]]);
        });

        it('getDiagonalsMaj(-3) returns diagonals beginning from index=(<diagonals amount> + begin) to the last one', () => {
            expect(m.getDiagonalsMaj(-3)).to.eql([[3, 6], [1, 4], [2]]);
        });

        it('getDiagonalsMaj(1, 2) returns diagonals beginning from index 1 to index 2 (zero-based)', () => {
            expect(m.getDiagonalsMaj(1, 2)).to.eql([[5, 8], [3, 6]]);
        });

        it('getDiagonalsMaj(1, -2) returns diagonals beginning from index 1 (zero-based) to index=(<diagonals amount> + end)', () => {
            expect(m.getDiagonalsMaj(1, -2)).to.eql([[5, 8], [3, 6], [1, 4]]);
        });
    });
});
