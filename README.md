[![CircleCI](https://circleci.com/gh/cblanc/matrix.svg?style=svg)](https://circleci.com/gh/cblanc/matrix) [![Coverage Status](https://coveralls.io/repos/github/cblanc/matrix/badge.svg?branch=master)](https://coveralls.io/github/cblanc/matrix?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/cblanc/matrix.svg)](https://greenkeeper.io/)

# Matrix

- No mutations (eats up memory)
- Simple, readable implementation > performance
- Familiar nomenclature for operations and matrix math

## Instantiation

```javascript
import { matrix } from "@cablanchard/matrix";

const m = new Matrix(2,3); // Create 2x3 matrix

// [
// 	undefined, undefined, undefined,
//   undefined, undefined, undefined,
// ]

const m = new Matrix(2, 2).fill(0);

// [
// 	0, 0,
//  0, 0,
// ]

Matrix(2, 2).map((i, j) => i)

// [
// 	0, 0,
//  1, 1,
// ]
```

## Accessors

```javascript
m.iRow         // Returns i'th row
m.jCol         // Returns j'th row
m.rows         // Returns an array of 1D matrices representing rows
m.columns      // Returns an array of 1D matrices representing columns
m.kDiagonal    // Returns k'th diagonal
m.diagonal     // Returns main diagonal
m.antiDiagonal // Returns main antidiagonal
m.transpose    // Returns a new matrix which is a transpose of m
```

## Methods

```
m.get(i, j)			     		// Gets value at position i, j
m.forEach((n, i, j))		// Iterates over all values n of matrix in positions i, j
```

Throws if 2 matrices are incompatible

```javascript
m.add()
m.subtract()
m.mutiply()
m.resize(m, n)
```

## Utils

```
m.toString()
m.toJSON()
```
