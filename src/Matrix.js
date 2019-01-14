import {
    flattenArray,
    normalizeCoordinate,
} from './utils';

export default class Matrix {
    static COLLECTION_TYPE_COLUMN = 'column';

    static COLLECTION_TYPE_MAJOR_DIAGONAL = 'majorDiagonal';

    static COLLECTION_TYPE_MINOR_DIAGONAL = 'minorDiagonal';

    static COLLECTION_TYPE_ROW = 'row';

    static groupByCollectionType(collection, type) {
        const normalizedType = ([
            Matrix.COLLECTION_TYPE_COLUMN,
            Matrix.COLLECTION_TYPE_MAJOR_DIAGONAL,
            Matrix.COLLECTION_TYPE_MINOR_DIAGONAL,
            Matrix.COLLECTION_TYPE_ROW,
        ]).includes(type) ? type : Matrix.COLLECTION_TYPE_ROW;

        return collection.reduce((result, cell) => {
            const { [normalizedType]: index } = cell;

            result[index] = [
                ...(result[index] || []),
                cell,
            ];

            return result;
        }, []);
    }

    static parse(source) {
        const maxX = (source[0].length - 1);

        return source.reduce((result, row, y) => {
            return [
                ...result,
                ...row.map((value, x) => ({
                    column: x,
                    row: y,

                    majorDiagonal: (maxX - (x - y)),
                    minorDiagonal: (x + y),

                    value,
                })),
            ];
        }, []);
    }

    static toValues(collection) {
        if (Array.isArray(collection)) {
            return collection.map((item) => Matrix.toValues(item));
        }

        return collection.value;
    }

    constructor(source) {
        this.source = source;
        this.parsed = Matrix.parse(this.source);

        this.width = this.source[0].length;
        this.height = this.source.length;

        this.maxX = (this.width - 1);
        this.maxY = (this.height - 1);
    }

    normalizeX(x, options = {}) {
        return normalizeCoordinate(x, this.maxX, options);
    }

    normalizeY(y, options = {}) {
        return normalizeCoordinate(y, this.maxY, options);
    }

    getMajorDiagonals() {
        return Matrix.toValues(
            Matrix.groupByCollectionType(this.parsed, 'majorDiagonal')
        );
    }

    getMajorDiagonal() {
        return Matrix.toValues(
            Matrix.groupByCollectionType(this.parsed, 'majorDiagonal')
                .find(([{ column, row }]) => (column === 0 && row === 0))
        );
    }

    getMinorDiagonals() {
        return Matrix.toValues(
            Matrix.groupByCollectionType(this.parsed, 'minorDiagonal')
        );
    }

    getMinorDiagonal() {
        return Matrix.toValues(
            Matrix.groupByCollectionType(this.parsed, 'minorDiagonal')
                .find(([{ column, row }]) => (column === this.maxX && row === 0))
        );
    }

    getElement(x, y) {
        return Matrix.toValues(this.parsed.find(({ column, row }) => (column === x && row === y)));
    }

    getElements(options = {}) {
        const {
            direction,

            startX: startUX = 0,
            startY: startUY = 0,
            endX: endUX = this.maxX,
            endY: endUY = this.maxY,
        } = options;
        const startX = this.normalizeX(startUX);
        const startY = this.normalizeY(startUY);
        const endX = this.normalizeX(endUX);
        const endY = this.normalizeY(endUY);

        const collection = flattenArray(Matrix.groupByCollectionType(this.parsed, direction));
        const { indexEnd, indexStart } = collection.reduce((result, { column, row }, index) => {
            if (column === startX && row === startY) {
                return {
                    ...result,
                    indexStart: index,
                };
            }

            if (column === endX && row === endY) {
                return {
                    ...result,
                    indexEnd: index,
                };
            }

            return result;
        }, {});

        if (indexStart < indexEnd) {
            return Matrix.toValues(
                collection.slice(indexStart, indexEnd)
            );
        }
        const formatter = (indexStart < indexEnd) ? Array.prototype.reduce : Array.prototype.reduceRight;

        return Matrix.toValues(
            formatter.call(collection, (result, item, index) => {

            }, [])
        );
    }

    getColumns() {
        return Matrix.toValues(
            Matrix.groupByCollectionType(this.parsed, 'column')
        );
    }

    getColumn(index) {
        return this.getColumns()[index];
    }

    getRows() {
        return Matrix.toValues(
            Matrix.groupByCollectionType(this.parsed, 'row')
        );
    }

    getRow(index) {
        return this.getRows()[index];
    }
}
