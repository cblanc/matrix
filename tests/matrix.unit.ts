import { assert } from "chai";
import {
	Matrix,
} from "../lib/index";

describe("Matrix", () => {
	describe("#new", () => {
		it ("creates a new matrix instance and assigns empty data", () => {
			const mat = new Matrix(4, 4, 8);
			const mat2 = mat.new;
			assert.equal(mat.n, mat2.n);
			assert.equal(mat.m, mat2.m);
			assert.notEqual(mat, mat2);
		});
	});

	describe("matrix getter", () => {
		it ("returns copy of underlying data structure", () => {
			const mat = new Matrix(2,2);
			const _m = mat.matrix;
			assert.deepEqual(_m, mat.matrix);
			assert.notEqual(_m, mat.matrix);
		});
	});

	describe("matrix setter", () => {
		it ("assigns matrix", () => {
			const mat = new Matrix(2,2);
			mat.matrix.forEach(assert.isUndefined.bind(assert));
			const n = 1;
			mat.matrix = new Array(4).fill(n);
			mat.matrix.forEach(e => assert.equal(e, n));
		});
		it ("throws if invalid size", () => {
			const mat = new Matrix(3,2);
			assert.throws(() => {
				mat.matrix = [1,2];
			}, Error)
		});
	});

	describe("size", () => {
		it ("returns size of matrix", () => {
			const mat = new Matrix(8, 7);
			assert.equal(mat.size, 56);
		});
	});

	describe("instantiation", () => {
		it ("creates a matrix initialised to undefined", () => {
			const mat = new Matrix(2,3);
			assert.isTrue(mat.data.every(e => e === undefined));
			assert.equal(mat.data.length, 6);
			assert.equal(mat.m, 2);
			assert.equal(mat.n, 3);
		});

		it ("accepts an optional fill argument", () => {
			const mat = new Matrix(2,3, 0);
			assert.isTrue(mat.data.every(e => e === 0));
		});

		describe("fill", () => {
			it ("generates a new matrix by iterating over every i and j", () => {
				const mat = new Matrix<string>(2, 3).fill((i, j) => {
					return `${i},${j}`;
				});
				const expected = [
					"0,0","0,1","0,2",
					"1,0","1,1","1,2",
				];
				assert.deepEqual(mat.data, expected);
			});
		});
	});

	describe("iRow", () => {
		it ("returns i'th row", () => {
			const mat = new Matrix(3,4).fill(i => i);
			assert.deepEqual(mat.iRow(0), [0,0,0,0]);
			assert.deepEqual(mat.iRow(1), [1,1,1,1]);
			assert.deepEqual(mat.iRow(2), [2,2,2,2]);
		});
	});

	describe("jCol", () => {
		it ("returns j'th row", () => {
			const mat = new Matrix(3,4).fill(i => i);
			assert.deepEqual(mat.jCol(0), [0,1,2]);
			assert.deepEqual(mat.jCol(1), [0,1,2]);
			assert.deepEqual(mat.jCol(2), [0,1,2]);
		});
	});

	// describe("rows", () => {
	// 	it ("returns an array of rows", () => {
	// 		const m = new Matrix(3,3).fill(i => i);
	// 		const expected = [
	// 			[0,0,0],
	// 			[1,1,1],
	// 			[2,2,2],
	// 		];
	// 		assert.deepEqual(m.rows, expected);
	// 	});
	// });
});
