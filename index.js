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
     * @param {number} [begin=0]
     * @param {number} [end=<rows amount>]
     * @returns {array}
     */
    getRows(begin, end) {
        let result;

        begin = begin || 0;
        begin = (begin >= 0) ? begin : this.matrix.length + begin;

        end = end || this.matrix.length - 1;
        end = (end >= 0) ? end : this.matrix.length + end;

        result = this.matrix.filter((row, i) => {
            return (begin <= i && i <= end);
        });

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
        begin = (begin >= 0) ? begin : this.matrix[0].length + begin;

        end = end || this.matrix[0].length - 1;
        end = (end >= 0) ? end : this.matrix[0].length + end;

        for (let i = begin; i <= end; i++) {
            let column = this.matrix.map((row) => {
                return row[i];
            });

            result = result || [];
            result.push(column);
        }

        return result;
    }
}

module.exports = Matrix;
