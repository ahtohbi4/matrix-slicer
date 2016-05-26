matrix-slicer
==

[![npm version][version-img]][version] [![devDependency Status][dependency-img]][dependency] [![Travis Build Status][travis-img]][travis] [![Appveyor Build Status][appveyor-img]][appveyor]

[dependency-img]: https://david-dm.org/ahtohbi4/matrix-slicer/dev-status.svg
[dependency]: https://david-dm.org/ahtohbi4/matrix-slicer#info=devDependencies
[version-img]: https://badge.fury.io/js/matrix-slicer.svg
[version]: https://badge.fury.io/js/matrix-slicer
[travis-img]: https://travis-ci.org/ahtohbi4/matrix-slicer.svg?branch=master
[travis]: https://travis-ci.org/ahtohbi4/matrix-slicer
[appveyor-img]: https://ci.appveyor.com/api/projects/status/37l04qmn2ae7ccjf/branch/master?svg=true
[appveyor]: https://ci.appveyor.com/project/ahtohbi4/matrix-slicer/branch/master

> JavaScript utility for slicing a matrix into columns, rows and diagonals.

Installation
--

```bash
$ npm install matrix-slicer --save
```

Usage
--

```javascript
// Creating an instance
const m = new Matrix([
    [2, 35, -4, 11],
    [0,  3, 21,  6],
    [7, -1,  8, -5]
]);

// Get a Row by index (zero-based)
m.getRow(1); // => [0,  3, 21,  6]

// Get set of Rows
m.getRows(0, 2); // => [[2, 35, -4, 11], [0, 3, 21, 6]]

// Get a Column by index (zero-based)
m.getColumn(2); // => [-4, 21, 8]

// Get set of Columns
m.getColumns(1, 3); // => [[35, 3, -1], [-4, 21, 8]]

// Get a major Diagonal by index (zero-based)
m.getDiagonalMaj(2); // => [35, 21, -5]

// Get set of major Diagonals
m.getDiagonalsMaj(2, -1); // => [[35, 21, -5], [2, 3, 8], [0, -1]]

// Get a minor Diagonal by index (zero-based)
m.getDiagonalMin(4); // => [6, 8]

// Get set of major Diagonals
m.getDiagonalsMin(-2, -1); // => [[11, 21, -1], [6, 8]]
```

For more details see [description of tests](https://github.com/ahtohbi4/matrix-slicer/blob/master/test/index.test.js#L43).

Test
--

```bash
$ npm test
```

License
--

MIT © Alexander Antonov <alexandr-post@yandex.ru>
