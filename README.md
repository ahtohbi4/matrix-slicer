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

1. [Installation](#installation)
2. [Methods](#methods)
3. [Test](#Test)
4. [License](#License)

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

#### 1. Creating instance of the Matrix

**Syntax**

> new Matrix(_matrix_ | _width_, _height_[, _element_ = 0 | _callback_])

Where:
 * _matrix_ - regular matrix (an array of arrays with similar lengths);
 * _width_ - number of columns;
 * _height_ - number of rows;
 * _element_ - an element with which the matrix will be filled. By default, this is 0;
 * _callback_ - function that produces an element of the matrix, taking three arguments:
  * _i_ - index (zero-based) of the column of generated the element;
  * _j_ - index (zero-based) of the row of generated the element;
  * _m_ - the _width_ of generated matrix was passed earlier;
  * _n_ - the _height_ of generated matrix was passed earlier;
  * _matrix_ - the matrix with previously generated elements.

**Example**

```javascript
// Regular matrix
const m = new Matrix([
    ['bird', 'dog'],
    ['cat', 'elephant']
]); // => instance of matrix [['bird', 'dog'], ['cat', 'elephant']]

// By dimensions
const m = new Matrix(3, 2); // => instance of matrix [[0, 0, 0], [0, 0, 0]]

// By dimensions and filler
const m = new Matrix(2, 2, 'Foo'); // => instance of matrix [['Foo', 'Foo'], ['Foo', 'Foo']]

// By dimensions and callback function to generate elements
const m = new Matrix(2, 2, function (i, j, m, n, matrix) {
    return i + j;
}); // => instance of matrix [[0, 1], [1, 2]]
```

#### 2. Get Matrix

**Syntax**

> _m_.get()

**Example**

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_matrix.svg">

```javascript
m.get(); // => [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']]
```

#### 3. Get Element(s)

**Syntax**

> _m_.getElem(_x_, _y_)

Where:
 * _x_ - index (zero-based) of the column. If it is negative, the coordinate calculated from the end (_width_ + _x_).
 * _y_ - index (zero-based) of the row. If it is negative, the coordinate calculated from the end (_height_ + _y_).

> _m_.getElems(_fromX_, _fromY_[, _toX_ = \<width\>, _toY_ = \<height\>])

Where:
 * _fromX_ - index (zero-based) of the column of start element. If it is negative, the coordinate calculated from the end (_width_ + _fromX_).
 * _fromY_ - index (zero-based) of the row of start element. If it is negative, the coordinate calculated from the end (_height_ + _fromY_).
 * _toX_ - index (zero-based) of the column till which extraction will be going. If it is negative, the coordinate calculated from the end (_width_ + _toX_).
 * _toY_ - index (zero-based) of the row till which extraction will be going. If it is negative, the coordinate calculated from the end (_height_ + _toY_).

**Example**

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_elem.svg">

```javascript
// Get an Element by coordinates (zero-based)
m.getElem(0, 1); // => 'D'

// Get a set of Elements
m.getElems(1, 0, 2, 1); // => ['B', 'C', 'D', 'E', 'F']
```

#### 4. Get Row(s)

**Syntax**

> _m_.getRow(_y_)

Where:
 * _y_ - index (zero-based) of the row. If it is negative, the coordinate calculated from the end (_height_ + _y_).

> _m_.getRows(_fromY_[, _toY_ = \<height\>])

Where:
 * _fromY_ - index (zero-based) of the start row. If it is negative, the coordinate calculated from the end (_height_ + _fromY_).
 * _toY_ - index (zero-based) of the row till which extraction will be going. If it is negative, the coordinate calculated from the end (_height_ + _toY_).

**Example**

<img width="250" height="150" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_row.svg">

```javascript
// Get a Row by index (zero-based)
m.getRow(1); // => ['D', 'E', 'F']

// Get a set of Rows
m.getRows(0, 2); // => [['A', 'B', 'C'], ['D', 'E', 'F']]
```

#### 5. Get Column(s)

**Syntax**

> _m_.getColumn(_x_)

Where:
 * _x_ - index (zero-based) of the column. If it is negative, the coordinate calculated from the end (_width_ + _x_).

> _m_.getColumns(_fromX_[, _toX_ = \<width\>])

Where:
 * _fromX_ - index (zero-based) of the start column. If it is negative, the coordinate calculated from the end (_width_ + _fromX_).
 * _toX_ - index (zero-based) of the column till which extraction will be going. If it is negative, the coordinate calculated from the end (_width_ + _toX_).

**Example**

<img width="200" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_col.svg">

```javascript
// Get a Column by index (zero-based)
m.getColumn(2); // => ['C', 'F', 'I']

// Get a set of Columns
m.getColumns(1, 3); // => [['B', 'E', 'H'], ['C', 'F', 'I']]
```

#### 6. Get Major Diagonal(s)

**Syntax**

> _m_.getDiagonalMaj(_index_)

Where:
 * _index_ - index (zero-based) of the diagonal. If it is negative, the coordinate calculated from the end (_diagonals\_amount_ + _index_).

> _m_.getDiagonalsMaj(_fromIndex_[, _toIndex_ = \<diagonals\_ammount\>])

Where:
 * _fromIndex_ - index (zero-based) of the start major diagonal. If it is negative, the value calculated from the end (_diagonals\_amount_ + _fromIndex_).
 * _toIndex_ - index (zero-based) of the major diagonal till which extraction will be going. If it is negative, the value calculated from the end (_diagonals\_amount_ + _toIndex_).

**Example**

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_major_diagonal.svg">

```javascript
// Get a major Diagonal by index (zero-based)
m.getDiagonalMaj(1); // => ['B', 'F']

// Get a set of major Diagonals
m.getDiagonalsMaj(2, 4); // => [['A', 'E', 'I'], ['D', 'H']]
```

#### 7. Get Minor Diagonal(s)

**Syntax**

> _m_.getDiagonalMin(_index_)

Where:
 * _index_ - index (zero-based) of the diagonal. If it is negative, the coordinate calculated from the end (_diagonals\_amount_ + _index_).

> _m_.getDiagonalsMin(_fromIndex_[, _toIndex_ = \<diagonals\_ammount\>])

Where:
 * _fromIndex_ - index (zero-based) of the start minor diagonal. If it is negative, the value calculated from the end (_diagonals\_amount_ + _fromIndex_).
 * _toIndex_ - index (zero-based) of the minor diagonal till which extraction will be going. If it is negative, the value calculated from the end (_diagonals\_amount_ + _toIndex_).

**Example**

<img width="220" height="200" src="https://cdn.rawgit.com/ahtohbi4/matrix-slicer/master/img/matrix_get_minor_diagonal.svg">

```javascript
// Get a minor Diagonal by index (zero-based)
m.getDiagonalMin(4); // => ['I']

// Get a set of major Diagonals
m.getDiagonalsMin(-3, -1); // => [['B', 'D'], ['C', 'E', 'G']]
```

#### 8. Get Submatrix

**Syntax**

> _m_.getSubmatrix(_fromX_, _fromY_[, _toX_ = \<width\>, _toY_ = \<height\>])

Where:
 * _fromX_ - index (zero-based) of the column of start element. If it is negative, the coordinate calculated from the end (_width_ + _fromX_).
 * _fromY_ - index (zero-based) of the row of start element. If it is negative, the coordinate calculated from the end (_height_ + _fromY_).
 * _toX_ - index (zero-based) of the column till which extraction will be going. If it is negative, the coordinate calculated from the end (_width_ + _toX_).
 * _toY_ - index (zero-based) of the row till which extraction will be going. If it is negative, the coordinate calculated from the end (_height_ + _toY_).

**Example**

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
