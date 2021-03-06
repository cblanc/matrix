[![CircleCI](https://circleci.com/gh/cblanc/matrix.svg?style=svg)](https://circleci.com/gh/cblanc/matrix) [![Coverage Status](https://coveralls.io/repos/github/cblanc/matrix/badge.svg?branch=master)](https://coveralls.io/github/cblanc/matrix?branch=master)

# Matrix

## Instantiation

```javascript
import { Matrix } from "@cablanchard/matrix";

new Matrix(2,3); // Create 2x3 numeric matrix
// [
//  0, 0, 0,
//  0, 0, 0,
// ]

new Matrix(2, 2).fill(1);
// [
//  1, 1,
//  1, 1,
// ]

new Matrix(2, 2).map((elem, i, j) => i)
// [
//  0, 0,
//  1, 1,
// ]

new Matrix(2,2).fromArray([0,1,2,3]);
// [
//  0, 1,
//  2, 3,
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
M.iRow(i)               // Returns i'th row
M.jCol(j)               // Returns j'th column
M.kDiagonal(k)          // Returns k'th diagonal
M.get(i, j)             // Gets value at position i, j
M.forEach((elem, i, j)) // Iterates over all values n of matrix in positions i, j
```

Throws if 2 matrices are incompatible

```javascript
M.equals(N)   // Compares M and N
M.eq(N)       // Shorthand for equals
M.add(N)
M.subtract(N) // Subtracts N from M
M.multiply(N) // Multiplies M (LHS) by N (RHS)
M.x(N)        // Shorthand for multiply
M.scale(n)    // Scale by factor n
```

## Utils

```javascript
M.toString()
```

## Licence

MIT
