import { assert } from "chai";
import {
	OutOfBoundsError
} from "../lib/errors";
import {
	Matrix,
} from "../lib/index";

const randomInt = (n: number): number => Math.floor(Math.random() * n);

describe("Matrix", () => {
	describe("#new", () => {
		it ("creates a new matrix instance and assigns empty data", () => {
			const mat = new Matrix(4, 4);
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

	describe("#size", () => {
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

		describe("#fill", () => {
			it ("populates all elems with value", () => {
				const mat = new Matrix(2,3).fill(0);
				assert.isTrue(mat.data.every(e => e === 0));
			});
		});

		describe("#map", () => {
			it ("generates a new matrix by iterating over every i and j", () => {
				const mat = new Matrix<string>(2, 3).map((i, j) => {
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

	describe("#iRow", () => {
		it ("returns i'th row", () => {
			const mat = new Matrix(3,4).map(i => i);
			assert.deepEqual(mat.iRow(0), [0,0,0,0]);
			assert.deepEqual(mat.iRow(1), [1,1,1,1]);
			assert.deepEqual(mat.iRow(2), [2,2,2,2]);
		});
		it ("throws if i is out of range", () => {
			const mat = new Matrix(2,2);
			assert.throws(() => {
				mat.iRow(2);
			}, RangeError);
			assert.throws(() => {
				mat.iRow(-1);
			}, RangeError);
		});
	});

	describe("#jCol", () => {
		it ("returns j'th row", () => {
			const mat = new Matrix(3,4).map(i => i);
			assert.deepEqual(mat.jCol(0), [0,1,2]);
			assert.deepEqual(mat.jCol(1), [0,1,2]);
			assert.deepEqual(mat.jCol(2), [0,1,2]);
		});
		it ("throws if j is out of range", () => {
			const mat = new Matrix(2,2);
			assert.throws(() => {
				mat.jCol(2);
			}, RangeError);
			assert.throws(() => {
				mat.jCol(-1);
			}, RangeError);
		});
	});

	describe("#rows", () => {
		it ("returns an array of rows", () => {
			const m = new Matrix(3,3).map(i => i);
			const expected = [
				[0,0,0],
				[1,1,1],
				[2,2,2],
			];
			assert.deepEqual(m.rows, expected);
		});
	});

	describe("#columns", () => {
		it ("returns an array of columns", () => {
			const m = new Matrix(2,5).map(i => i);
			const expected = [
				[0,1],
				[0,1],
				[0,1],
				[0,1],
				[0,1],
			];
			assert.deepEqual(m.columns, expected);
		});
	});

	describe("#get", () => {
		let mat: Matrix<string>;

		beforeEach(() => {
			mat = new Matrix<string>(5, 4).map((i, j) => `${i},${j}`);
		});

		it ("retrieves the right value from a matrix given i and j", () => {
			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 4; j++) {
					assert.equal(mat.get(i,j), `${i},${j}`);
				}
			}
		});

		it ("throws if i out of bounds", () => {
			assert.throws(() => {
				mat.get(5,2);
			}, RangeError);
			assert.throws(() => {
				mat.get(-1,2);
			}, RangeError);
		});

		it ("throws if j out of bounds", () => {
			assert.throws(() => {
				mat.get(2,4);
			}, RangeError);
			assert.throws(() => {
				mat.get(2,-1);
			}, RangeError);
		});
	});

	describe("#transpose", () => {
		it ("returns transpose of a matrix", () => {
			// 0,0 0,1 0,2
			// 1,0 1,1 1,2
			// 
			// => is transposed to
			// 0,0 1,0
			// 0,1 1,1 
			// 0,2 1,2
			const m1 = new Matrix(2,3).map((i, j) => `${i},${j}`);
			assert.deepEqual(m1.transpose.rows, [
				["0,0", "1,0"],
				["0,1", "1,1"],
				["0,2", "1,2"],
			]);
		});
	});

	describe("toString", () => {
		it ("renders matrix as string", () => {
			const m = new Matrix(2,3).map((i, j) => Math.pow(10, j) + i);
			assert.equal(m.toString(), [
				["  1  10 100"],
				["  2  11 101"],
			].join("\n"))
		});
	});

	describe("forEach", () => {
		it ("iterates over every elem in order (i =0 ...m, left to right)", () => {
			const m = new Matrix<string>(3,3).map((i, j) => `${i},${j}`);
			const elems: string[] = [];
			const is: number[] = [];
			const js: number[] = [];
			m.forEach((elem, i, j) => {
				elems.push(elem);
				is.push(i);
				js.push(j);
			});
			assert.deepEqual(elems, [
				"0,0","0,1","0,2",
				"1,0","1,1","1,2",
				"2,0","2,1","2,2",
			]);
			assert.deepEqual(is, [0,0,0,1,1,1,2,2,2]);
			assert.deepEqual(js, [0,1,2,0,1,2,0,1,2]);
		});
	});
});
