(() => {
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

                this.size = {
                    width: this.matrix[0].length,
                    height: this.matrix.length,
                    diagonal: this.matrix[0].length + this.matrix.length - 1
                };
            } else {
                throw new Error(`"${matrix}" is not correct matrix.`);
            }
        }

        /**
         * @returns {array}
         */
        get() {
            return this.matrix;
        }

        /**
         * @param {number} x
         * @param {number} y
         * @returns {<matrix item>}
         */
        getElem(x, y) {
            let result;

            if (x < this.size.width && y < this.size.height) {
                result = this.matrix[y][x];
            }

            return result;
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
            begin = (begin >= 0) ? begin : this.size.height + begin;

            end = end || this.size.height;
            end = (end >= 0) ? end : this.size.height + end;

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
            begin = (begin >= 0) ? begin : this.size.width + begin;

            end = end || this.size.width;
            end = (end >= 0) ? end : this.size.width + end;

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

            if (number >= 0 && number < this.size.diagonal) {
                result = [];
                let i, j;

                if (number < this.size.width) {
                    // Above major diagonal
                    i = this.size.width - number - 1;
                    j = 0;
                } else {
                    // Below major diagonal
                    i = 0;
                    j = number - this.size.width + 1;
                }

                while (i < this.size.width && j < this.size.height) {
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

            begin = begin || 0;
            begin = (begin >= 0) ? begin : this.size.diagonal + begin;

            end = end || this.size.diagonal;
            end = (end >= 0) ? end : this.size.diagonal + end;

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

            if (number >= 0 && number < this.size.diagonal) {
                result = [];
                let i, j;

                if (number < this.size.width) {
                    // Above minor diagonal
                    i = number;
                    j = 0;
                } else {
                    // Below minor diagonal
                    i = this.size.width - 1;
                    j = number - this.size.width + 1;
                }

                while (i >= 0 && j < this.size.height) {
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

            begin = begin || 0;
            begin = (begin >= 0) ? begin : this.size.diagonal + begin;

            end = end || this.size.diagonal;
            end = (end >= 0) ? end : this.size.diagonal + end;

            for (let i = begin; i < end; i++) {
                result = result || [];
                result.push(this.getDiagonalMin(i));
            }

            return result;
        }
    }

    if (typeof define === 'function') {
        // Define Matrix for AMD loaders
        define(function() {
            return Matrix;
        });

    } else if (typeof module !== 'undefined' && module.exports) {
        // Expose Matrix for node
        module.exports = Matrix;

    } else {
        // Otherwise write to window
        window.Matrix = Matrix;
    }
})();
