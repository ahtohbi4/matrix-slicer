'use strict';

/**
 * @class
 */
class Matrix {
    /**
     * @param {array} matrix
     */
    constructor(matrix) {
        if (Array.isArray(matrix) && matrix.every((row, i, m) => {
            return Array.isArray(row) && m[0].length === row.length;
        })) {
            this.matrix = matrix;
        } else {
            throw new Error(`"${matrix}" is not correct matrix.`);
        }
    }

    /**
     * @param {number} number
     * @returns {array}
     */
    getRow(number) {
        return this.matrix[number];
    }

    /**
     * @param {number} number
     * @returns {array}
     */
    getColumn(number) {
        let result;

        if (typeof this.matrix[0][number] !== 'undefined') {
            result = this.matrix.map((row) => {
                return row[number];
            });
        }

        return result;
    }
}

module.exports = Matrix;
