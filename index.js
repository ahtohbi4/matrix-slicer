'use strict';

class Matrix {
    constructor(matrix) {
        if (Array.isArray(matrix) && matrix.every((row, i, m) => {
            return Array.isArray(row) && m[0].length === row.length;
        })) {
            this.matrix = matrix;
        } else {
            throw new Error(`"${matrix}" is not correct matrix.`);
        }
    }
}

module.exports = Matrix;
