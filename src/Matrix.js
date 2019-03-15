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

            startX: startUX,
            startY: startUY,
            endX: endUX,
            endY: endUY,
        } = options;
        const collection = flattenArray(Matrix.groupByCollectionType(this.parsed, direction));
        const { column: startXDefault, row: startYDefault } = collection[0];
        const { column: endXDefault, row: endYDefault } = collection[collection.length - 1];
        const startX = (startUX !== undefined) ? this.normalizeX(startUX) : startXDefault;
        const startY = (startUY !== undefined) ? this.normalizeY(startUY) : startYDefault;
        const endX = (endUX !== undefined) ? this.normalizeX(endUX) : endXDefault;
        const endY = (endUY !== undefined) ? this.normalizeY(endUY) : endYDefault;

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
                collection.slice(indexStart, indexEnd + 1)
            );
        }

        const revertedIndexStart = ((collection.length - 1) - indexStart);
        const revertedIndexEnd = ((collection.length - 1) - indexEnd + 1);

        return Matrix.toValues(
            collection
                .reduceRight((result, item) => ([ ...result, item ]), [])
                .slice(revertedIndexStart, revertedIndexEnd)
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

    getSubMatrix(params) {
        const {
            from,
            to,

            adjoinedTo,
            distances,
        } = params;

        if (Array.isArray(from) || Array.isArray(to)) {
            const [
                startUX = 0,
                startUY = 0,
            ] = from;
            const [
                endUX = this.maxX,
                endUY = this.maxY,
            ] = to;
            const startX = this.normalizeX(startUX);
            const startY = this.normalizeY(startUY);
            const endX = this.normalizeX(endUX);
            const endY = this.normalizeY(endUY);
            const isReversed = (startX > endX || (startX === endX && startY > endY));
            const formatter = isReversed ? Array.prototype.reduceRight : Array.prototype.reduce;
            const collection = formatter.call(this.parsed, (result, cell) => {
                const { column, row } = cell;
                const minX = Math.min(startX, endX);
                const minY = Math.min(startY, endY);
                const maxX = Math.max(startX, endX);
                const maxY = Math.max(startY, endY);

                if (column >= minX && column <= maxX && row >= minY && row <= maxY) {
                    const index = (row - minY);

                    result[index] = [
                        ...(result[index] || []),
                        cell,
                    ];

                    return result;
                }

                return result;
            }, []);

            return Matrix.toValues(collection);
        }

        return [];
    }
}
