[![CircleCI](https://circleci.com/gh/cblanc/matrix.svg?style=svg)](https://circleci.com/gh/cblanc/matrix) [![Coverage Status](https://coveralls.io/repos/github/cblanc/matrix/badge.svg?branch=master)](https://coveralls.io/github/cblanc/matrix?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/cblanc/matrix.svg)](https://greenkeeper.io/)

# Matrix

- No mutations, every accessor returns a fresh copy

## Instantiation

```javascript
import { matrix } from "@cablanchard/matrix";

const m = new Matrix(2,3, [default]); // Create 2x3 matrix

// [
// 	undefined, undefined, undefined,
//   undefined, undefined, undefined,
// ]

const m = new Matrix(2, 2, 0);

// [
// 	0, 0,
//  0, 0,
// ]

Matrix(2, 2).fill((i, j) => i)

// [
// 	0, 0,
//  1, 1,
// ]
```

## Accessors

```javascript
m.rows         // Returns an array of 1D matrices representing rows
m.columns      // Returns an array of 1D matrices representing columns
m.diagonal     // Returns main diagonal
m.antiDiagonal // Returns main antidiagonal
m.transpose    // Returns a new matrix which is a transpose of m
```

## Methods

Throws if 2 matrices are incompatible

```javascript
m.add()
m.subtract
m.mutiply()
m.resize(m, n)
```

## Utils

```
m.toString()
m.toJSON()
```
