'use strict';

const chai = require('chai');
const expect = chai.expect;

const Matrix = require('../index');

describe('Initialization a new instance with', () => {
    it('matrix "" throws exception', () => {
        expect(() => {
            const m = new Matrix();
        }).to.throw(/is not correct matrix./i);
    });

    it('matrix "someString" throws exception', () => {
        expect(() => {
            const m = new Matrix('someString');
        }).to.throw(/is not correct matrix./i);
    });

    it('matrix "[1, 2, 3]" throws exception', () => {
        expect(() => {
            const m = new Matrix([1, 2, 3]);
        }).to.throw(/is not correct matrix./i);
    });

    it('matrix "[[1, 2], [3]]" throws exception', () => {
        expect(() => {
            const m = new Matrix([1, 2, 3]);
        }).to.throw(/is not correct matrix./i);
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
    describe('getRow(number)', () => {
        it('getRow() throws exception', () => {
            expect(() => {
                const m = new Matrix([
                    [1, 2],
                    [3, 4]
                ]);
            }).to.throw(/is not correct rows identifier./i);
        });

        it('getRow(6) throws exception', () => {
            expect(() => {
                const m = new Matrix([
                    [1, 2],
                    [3, 4]
                ]);
            }).to.throw(/Could not get "6" row from the matrix/i);
        });

        it('getRow(1) returns ', () => {
            expect(() => {
                const m = new Matrix([
                    [1, 2],
                    [3, 4]
                ]);
            }).to.eql([3, 4]);
        });
    });

    describe('getRows(begin[, end])', () => {
        it('getRows(2) returns rows from 2nd to the end', () => {
            const m = new Matrix([
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8]
            ]);

            expect(m.getRows(2)).to.eql([[5, 6], [7, 8]]);
        });

        it('getRows(-3) returns rows from (<rows amount> + begin) to the end', () => {
            const m = new Matrix([
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8]
            ]);

            expect(m.getRows(-3)).to.eql([[3, 4], [5, 6], [7, 8]]);
        });

        it('getRows(1, 2) returns rows from 1st to 2nd', () => {
            const m = new Matrix([
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8]
            ]);

            expect(m.getRows(1, 2)).to.eql([[3, 4], [5, 6]]);
        });

        it('getRows(1, -2) returns rows from 1st to (<rows amount> + end)', () => {
            const m = new Matrix([
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8]
            ]);

            expect(m.getRows(1, -2)).to.eql([[3, 4], [5, 6]]);
        });
    });
});
