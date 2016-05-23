'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.should();

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
