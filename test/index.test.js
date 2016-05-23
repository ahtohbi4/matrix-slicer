const chai = require('chai');
chai.should();

const Matrix = require('../index');

describe('Description', () => {
    it('unit', () => {
        const m = new Matrix([[1, 2], [3, 4]]);
        m.matrix.should.be.eql([[1, 2], [3, 4]]);
    });
});
