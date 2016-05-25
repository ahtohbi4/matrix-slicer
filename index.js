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
            this.width = this.matrix[0].length;
            this.height = this.matrix.length;
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
     * @param {number} [begin=0]
     * @param {number} [end=<rows amount>]
     * @returns {array}
     */
    getRows(begin, end) {
        let result;

        begin = begin || 0;
        begin = (begin >= 0) ? begin : this.height + begin;

        end = end || this.height - 1;
        end = (end >= 0) ? end : this.height + end;

        for (let i = begin; i <= end; i++) {
            result = result || [];
            result.push(this.getRow(i));
        }

        return result;
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

    /**
     * @param {number} [begin=0]
     * @param {number} [end=<columns amount>]
     * @returns {array}
     */
    getColumns(begin, end) {
        let result;

        begin = begin || 0;
        begin = (begin >= 0) ? begin : this.width + begin;

        end = end || this.width - 1;
        end = (end >= 0) ? end : this.width + end;

        for (let i = begin; i <= end; i++) {
            result = result || [];
            result.push(this.getColumn(i));
        }

        return result;
    }

    /**
     * @param {number} number
     * @returns {array}
     */
    getDiagonalMaj(number) {
        let result;

        if (number >= 0) {
            if (number < this.width) {
                // Above major diagonal
                let j = 0;
                result = [];

                for (let i = this.width - number - 1; i < this.width; i++) {
                    result.push(this.matrix[j][i]);
                    j++;
                }
            } else if (number < this.width + this.height - 1) {
                // Below major diagonal
                let j = 0;
                result = [];

                for (let i = number - this.width + 1; i < this.height; i++) {
                    result.push(this.matrix[i][j]);
                    j++;
                }
            }
        }

        return result;
    }
}

module.exports = Matrix;
