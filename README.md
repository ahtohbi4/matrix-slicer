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

> JavaScript utility for slicing a matrix into elements, columns, rows, diagonals and submatrices.

Installation
--

```bash
$ npm install matrix-slicer --save
```

Usage
--

#### Javascript

Put [script](https://raw.githubusercontent.com/ahtohbi4/matrix-slicer/master/index.js) in your project.

```html
<script src="/lib/matrix-slicer/index.js"></script>
<script>
    var m = new Matrix([
        [1, 2],
        [3, 4]
    ]);
</script>
```

#### AMD

Put [script](https://raw.githubusercontent.com/ahtohbi4/matrix-slicer/master/index.js) in your project.

```javascript
require([
    'matrix-slicer'
], function(Matrix) {
    // your code here
});
```

#### Node.js

Install npm package and use it.

```javascript
var Matrix = require('matrix-slicer');

var m = new Matrix([
    [1, 2],
    [3, 4]
]);
```

Methods
--

#### Creating instance of the Matrix

Pass a regular matrix.

```javascript
const m = new Matrix([
    ['bird', 'dog'],
    ['cat', 'elephant']
]);
```

Pass dimensions of matrix by "<width>, <height>".

``javascript
const m = new Matrix(3, 2); // => [[0, 0, 0], [0, 0, 0]]
```

Pass dimensions of matrix and element by "<width>, <height>, <element>".

``javascript
const m = new Matrix(2, 2, 'Foo'); // => [['Foo', 'Foo'], ['Foo', 'Foo']]
```

Pass dimensions of matrix and callback function to generation of each element by "<width>, <height>, <callback>".

``javascript
const m = new Matrix(2, 2, function (i, j, m, n, matrix) {
    return i * j;
}); // => [[0, 0], [0, 2]]
```

where:
 * {number} i - columns number of current element;
 * {number} j - rows number of current element;
 * {number} m - width of matrix;
 * {number} n - height of matrix;
 * {array} matrix - matrix, created till current element;

#### Getting an elements of the MAtrix
```javascript
const m = new Matrix([
    [2, 35, -4, 11],
    [0,  3, 21,  6],
    [7, -1,  8, -5]
]);

// Get matrix
m.get(); // => [[2, 35, -4, 11], [0, 3, 21, 6], [7, -1, 8, -5]]

// Get an Element by coordinates (zero-based)
m.getElem(2, 1); // => 21

// Get set of Elements
m.getElems(1, 1, 2, 2); // => [3, 21, 6, 7, -1]

// Get a Row by index (zero-based)
m.getRow(1); // => [0, 3, 21, 6]

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

// Get a Submatrix
m.getSubmatrix(1, 1, 3); // => [[3, 21], [-1, 8]]
```

For more details see [description of tests](https://github.com/ahtohbi4/matrix-slicer/blob/master/test/index.test.js#L43).

Test
--

```bash
$ git clone https://github.com/ahtohbi4/matrix-slicer.git
$ cd matrix-slicer
$ npm install
$ npm test
```

License
--

MIT © Alexander Antonov <alexandr-post@yandex.ru>
