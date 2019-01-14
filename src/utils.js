export const flattenArray = (collection) => collection.reduce((result, item) => {
    if (Array.isArray(item)) {
        return [
            ...result,
            ...flattenArray(item),
        ];
    }

    return [
        ...result,
        item,
    ];
}, []);

export const normalizeCoordinate = (value, maxValue, options = {}) => {
    const { isStrict = false } = options;
    const nextValue = (value >= 0) ? value : ((maxValue + 1) + value);

    if (nextValue < 0) {
        return (isStrict ? undefined : 0);
    }

    if (nextValue > maxValue) {
        return (isStrict ? undefined : maxValue);
    }

    return nextValue;
};
