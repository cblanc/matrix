[![CircleCI](https://circleci.com/gh/cblanc/matrix.svg?style=svg)](https://circleci.com/gh/cblanc/matrix) [![Coverage Status](https://coveralls.io/repos/github/cblanc/matrix/badge.svg?branch=master)](https://coveralls.io/github/cblanc/matrix?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/cblanc/matrix.svg)](https://greenkeeper.io/)

# Matrix

- No mutations (eats up memory)
- Simple, readable implementation > performance
- Familiar nomenclature for operations and matrix math

## Instantiation

```javascript
import { GenericMatrix, Matrix } from "@cablanchard/matrix";

const M = new Matrix(2,3); // Create 2x3 numeric matrix

// [
// 	0, 0, 0,
//  0, 0, 0,
// ]

const M = new Matrix(2, 2).fill(1);

// [
// 	1, 1,
//  1, 1,
// ]

Matrix(2, 2).map((i, j) => i)

// [
// 	0, 0,
//  1, 1,
// ]

const M = new GenericMatrix(2,3); // In case a generic solution is required

// [
// 	undefined, undefined, undefined,
//   undefined, undefined, undefined,
// ]
```

## Accessors

```javascript
M.rows         // Returns an array of 1D matrices representing rows
M.columns      // Returns an array of 1D matrices representing columns
M.diagonal     // Returns main diagonal
M.antiDiagonal // Returns main antidiagonal
M.transpose    // Returns a new matrix which is a transpose of m
```

## Methods

Throws if elems are out of bounds

```javascript
M.iRow(i)         			// Returns i'th row
M.jCol(j)         			// Returns j'th column
M.kDiagonal(k)  			  // Returns k'th diagonal
M.get(i, j)			     		// Gets value at position i, j
M.forEach((n, i, j))		// Iterates over all values n of matrix in positions i, j
```

Throws if 2 matrices are incompatible

```javascript
M.add(N)
M.subtract(N) // Subtracts N from M
M.mutiply(N)
M.resize(m, n)
```

## Utils

```javascript
M.toString()
```
