'use strict';

(function () {
    function PropertyError(property) {
        this.name = 'PropertyError';

        this.property = property;
        this.message = `Ошибка в свойстве ${property}`;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PropertyError);
        } else {
            this.stack = (new Error()).stack;
        }
    }

    PropertyError.prototype = Object.create(Error.prototype);

    /**
     * @class
     */
    class Matrix {
        /**
         * @param {array} matrix
         */
        constructor() {
            if (arguments.length === 1) {
                // Matrix is passed
                const matrix = arguments[0];

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
                    throw new PropertyError(matrix);
                }
            } else if (arguments.length === 2 || arguments.length === 3) {
                // Generation of the Matrix
                try {
                    const element = arguments[2] || 0;

                    this.size = {
                        width: arguments[0],
                        height: arguments[1],
                        diagonal: arguments[0] + arguments[1] - 1
                    };

                    this.matrix = [];

                    for (let j = 0; j < this.size.height; j++) {
                        let row = [];

                        for (let i = 0; i < this.size.width; i++) {
                            let elem = (typeof element !== 'function') ? element : 0;

                            row.push(elem);
                        }

                        this.matrix.push(row);
                    }

                    if (typeof element === 'function') {
                        for (let j = 0; j < this.size.height; j++) {
                            for (let i = 0; i < this.size.width; i++) {
                                const matrix = this.matrix;

                                this.matrix[j][i] = element.call(this, i, j, this.size.width, this.size.height, matrix);
                            }
                        }
                    }
                } catch (e) {
                    throw new Error(e);
                }
            } else {
                throw new Error('Expected "<matrix> || <m> , <n>[, <element> || <callback function>]".');
            }
        }

        /**
         * @returns {array}
         */
        get() {
            return this.matrix;
        }

        /**
         * @param {number} value
         * @param {number} valueMax
         * @returns {number}
         * @privet
         */
        _normalize(value, valueMax) {
            if (typeof value !== 'number') {
                return 0;
            }
            
            if (value < 0) {
                return (valueMax + value);
            }
            
            return value;
        }

        /**
         * @param {number} x
         * @returns {number}
         * @privet
         */
        _normalizeX(x) {
            return this._normalize(x, this.size.width);
        }

        /**
         * @param {number} y
         * @returns {number}
         * @privet
         */
        _normalizeY(y) {
            return this._normalize(y, this.size.height);
        }

        /**
         * @param {number} d
         * @returns {number}
         * @privet
         */
        _normalizeD(d) {
            return this._normalize(d, this.size.diagonal);
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
         * @param {number} [beginX=0]
         * @param {number} [beginY=0]
         * @param {number} [endX=<columns amount>]
         * @param {number} [endY=<rows amount>]
         * @returns {array}
         */
        getElems(beginX, beginY, endX, endY) {
            let result;

            beginX = this._normalizeX(beginX);
            beginY = this._normalizeY(beginY);
            endX = this._normalizeX(endX || this.size.width);
            endY = this._normalizeY(endY || this.size.height - 1);

            let i = beginX;

            for (let j = beginY; j <= endY; j++) {
                result = result || [];

                while (j === endY && i < endX || j < endY && i < this.size.width) {
                    result.push(this.getElem(i, j));

                    i++;
                }

                i = 0;
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

            begin = this._normalizeY(begin);
            end = this._normalizeY(end || this.size.height);

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
                result = this.matrix.map((row) => row[number]);
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

            begin = this._normalizeX(begin);
            end = this._normalizeX(end || this.size.width);

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

            if (typeof number === 'number' && number >= 0 && number < this.size.diagonal) {
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

            begin = this._normalizeD(begin);
            end = this._normalizeD(end || this.size.diagonal);

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

            if (typeof number === 'number' && number >= 0 && number < this.size.diagonal) {
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

            begin = this._normalizeD(begin);
            end = this._normalizeD(end || this.size.diagonal);

            for (let i = begin; i < end; i++) {
                result = result || [];
                result.push(this.getDiagonalMin(i));
            }

            return result;
        }

        /**
         * @param {number} [beginX=0]
         * @param {number} [beginY=0]
         * @param {number} [endX=<columns amount>]
         * @param {number} [endY=<rows amount>]
         * @returns {array}
         */
        getSubmatrix(beginX, beginY, endX, endY) {
            let result;

            beginX = this._normalizeX(beginX);
            beginY = this._normalizeY(beginY);
            endX = this._normalizeX(endX || this.size.width);
            endY = this._normalizeY(endY || this.size.height);

            const filterRow = (row) => {
                return row.filter((item, j) => {
                    return (j >= beginX && j < endX);
                });
            };

            for (let i = beginY; i < endY; i++) {
                result = result || [];

                result.push(filterRow(this.matrix[i]));
            }

            return result;
        }
    }

    if (typeof define === 'function') {
        // Define Matrix for AMD loaders
        define(function () {
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
