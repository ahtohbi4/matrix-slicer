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

Put [the script](https://raw.githubusercontent.com/ahtohbi4/matrix-slicer/master/index.js) in your project.

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

Put [the script](https://raw.githubusercontent.com/ahtohbi4/matrix-slicer/master/index.js) in your project.

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

1. Pass a regular matrix.

Syntax

> new Matrix(_matrix_);

Parameters

*matrix* - regular matrix (an array of arrays with similar lengths).

Example

```javascript
const m = new Matrix([
    ['bird', 'dog'],
    ['cat', 'elephant']
]); // => instance of matrix [['bird', 'dog'], ['cat', 'elephant']]
```

2. Pass dimensions of matrix.

Syntax

> new Matrix(_width_, _height_[, _element_ = 0 | _callback_])

Parameters

**width** - number of columns.<br>
**height** - number of rows.<br>
**element** - an element with which the matrix will be filled. By default, this is 0.<br>
**callback** - function that produces an element of the matrix, taking three arguments:<br>
&nbsp;&nbsp;&nbsp;&nbsp;**i** - index (zero-based) of the column of generated the element.<br>
&nbsp;&nbsp;&nbsp;&nbsp;**j** - index (zero-based) of the row of generated the element.<br>
&nbsp;&nbsp;&nbsp;&nbsp;**m** - the _width_ of generated matrix was passed earlier.<br>
&nbsp;&nbsp;&nbsp;&nbsp;**n** - the _height_ of generated matrix was passed earlier.<br>
&nbsp;&nbsp;&nbsp;&nbsp;**matrix** - the matrix with previously generated elements.

```javascript
const m = new Matrix(3, 2); // => instance of matrix [[0, 0, 0], [0, 0, 0]]
```

Pass dimensions of matrix and element by `"<width>, <height>, <element>"`.

```javascript
const m = new Matrix(2, 2, 'Foo'); // => instance of matrix [['Foo', 'Foo'], ['Foo', 'Foo']]
```

Pass dimensions of matrix and callback function to generation of each element by `"<width>, <height>, <callback>"`.

```javascript
const m = new Matrix(2, 2, function (i, j, m, n, matrix) {
    return i * j;
}); // => instance of matrix [[0, 0], [0, 1]]
```

where:
 * {number} i - columns number of current element;
 * {number} j - rows number of current element;
 * {number} m - width of matrix;
 * {number} n - height of matrix;
 * {array} matrix - matrix, created till current element;

#### Get Matrix

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_matrix.svg">

```javascript
m.get(); // => [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']]
```

#### Get Element(s)

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_elem.svg">

```javascript
// Get an Element by coordinates (zero-based)
m.getElem(0, 1); // => 'D'

// Get a set of Elements
m.getElems(1, 0, 2, 1); // => ['B', 'C', 'D', 'E', 'F']
```

#### Get Row(s)

<img width="250" height="150" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_row.svg">

```javascript
// Get a Row by index (zero-based)
m.getRow(1); // => ['D', 'E', 'F']

// Get a set of Rows
m.getRows(0, 2); // => [['A', 'B', 'C'], ['D', 'E', 'F']]
```

#### Get Column(s)

<img width="200" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_col.svg">

```javascript
// Get a Column by index (zero-based)
m.getColumn(2); // => ['C', 'F', 'I']

// Get a set of Columns
m.getColumns(1, 3); // => [['B', 'E', 'H'], ['C', 'F', 'I']]
```

#### Get Major Diagonal(s)

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_major_diagonal.svg">

```javascript
// Get a major Diagonal by index (zero-based)
m.getDiagonalMaj(1); // => ['B', 'F']

// Get a set of major Diagonals
m.getDiagonalsMaj(2, 4); // => [['A', 'E', 'I'], ['D', 'H']]
```

#### Get Minor Diagonal(s)

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_minor_diagonal.svg">

```javascript
// Get a minor Diagonal by index (zero-based)
m.getDiagonalMin(4); // => ['I']

// Get a set of major Diagonals
m.getDiagonalsMin(-3, -1); // => [['B', 'D'], ['C', 'E', 'G']]
```

#### Get Submatrix

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_submatrix.svg">

```javascript
// Get a Submatrix
m.getSubmatrix(1, 1, 3, 3); // => [['E', 'F'], ['H', 'I']]
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
