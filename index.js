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

        end = end || this.height;
        end = (end >= 0) ? end : this.height + end;

        for (let i = begin; i < end; i++) {
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

        end = end || this.width;
        end = (end >= 0) ? end : this.width + end;

        for (let i = begin; i < end; i++) {
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
        let diagonalsAmount = this.width + this.height - 1;

        if (number >= 0 && number < diagonalsAmount) {
            result = [];
            let i, j;

            if (number < this.width) {
                // Above major diagonal
                i = this.width - number - 1;
                j = 0;
            } else {
                // Below major diagonal
                i = 0;
                j = number - this.width + 1;
            }

            while (i < this.width && j < this.height) {
                result.push(this.matrix[j][i]);
                i++; j++;
            }
        }

        return result;
    }

    /**
     * @param {number} [begin=0]
     * @param {number} [end=<parallel diagonals amount>]
     * @returns {array}
     */
    getDiagonalsMaj(begin, end) {
        let result;
        let diagonalsAmount = this.width + this.height - 1;

        begin = begin || 0;
        begin = (begin >= 0) ? begin : diagonalsAmount + begin;

        end = end || diagonalsAmount;
        end = (end >= 0) ? end : diagonalsAmount + end;

        for (let i = begin; i < end; i++) {
            result = result || [];
            result.push(this.getDiagonalMaj(i));
        }

        return result;
    }

    /**
     * @param {number} number
     * @returns {array}
     */
    getDiagonalMin(number) {
        let result;
        let diagonalsAmount = this.width + this.height - 1;

        if (number >= 0 && number < diagonalsAmount) {
            result = [];
            let i, j;

            if (number < this.width) {
                // Above minor diagonal
                i = number;
                j = 0;
            } else {
                // Below minor diagonal
                i = this.width - 1;
                j = number - this.width + 1;
            }

            while (i >= 0 && j < this.height) {
                result.push(this.matrix[j][i]);
                i--; j++;
            }
        }

        return result;
    }

    /**
     * @param {number} [begin=0]
     * @param {number} [end=<parallel diagonals amount>]
     * @returns {array}
     */
    getDiagonalsMin(begin, end) {
        let result;
        let diagonalsAmount = this.width + this.height - 1;

        begin = begin || 0;
        begin = (begin >= 0) ? begin : diagonalsAmount + begin;

        end = end || diagonalsAmount;
        end = (end >= 0) ? end : diagonalsAmount + end;

        for (let i = begin; i < end; i++) {
            result = result || [];
            result.push(this.getDiagonalMin(i));
        }

        return result;
    }
}

module.exports = Matrix;
