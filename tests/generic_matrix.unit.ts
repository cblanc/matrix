import { assert } from "chai";
import { OutOfBoundsError } from "../lib/errors";
import { GenericMatrix } from "../lib/generic_matrix";

const randomInt = (n: number): number => Math.floor(Math.random() * n);

const mapCoords = (i:number, j: number): string => `${i},${j}`;

describe("GenericMatrix", () => {
	describe("#clone", () => {
		it ("creates a new GenericMatrix instance and assigns empty data", () => {
			const mat = new GenericMatrix(4, 4);
			const mat2 = mat.clone();
			assert.equal(mat.n, mat2.n);
			assert.equal(mat.m, mat2.m);
			assert.notEqual(mat, mat2);
		});
	});

	describe("matrix getter", () => {
		it ("returns copy of underlying data structure", () => {
			const mat = new GenericMatrix(2,2);
			const _m = mat.matrix;
			assert.deepEqual(_m, mat.matrix);
			assert.notEqual(_m, mat.matrix);
		});
	});

	describe("matrix setter", () => {
		it ("assigns matrix", () => {
			const mat = new GenericMatrix(2,2);
			mat.matrix.forEach(assert.isUndefined.bind(assert));
			const n = 1;
			mat.matrix = new Array(4).fill(n);
			mat.matrix.forEach(e => assert.equal(e, n));
		});
		it ("throws if invalid size", () => {
			const mat = new GenericMatrix(3,2);
			assert.throws(() => {
				mat.matrix = [1,2];
			}, Error)
		});
	});

	describe("#size", () => {
		it ("returns size of matrix", () => {
			const mat = new GenericMatrix(8, 7);
			assert.equal(mat.size, 56);
		});
	});

	describe("instantiation", () => {
		it ("creates a matrix initialised to undefined", () => {
			const mat = new GenericMatrix(2,3);
			assert.isTrue(mat.data.every(e => e === undefined));
			assert.equal(mat.data.length, 6);
			assert.equal(mat.m, 2);
			assert.equal(mat.n, 3);
		});

		describe("#fill", () => {
			it ("populates all elems with value", () => {
				const mat = new GenericMatrix(2,3).fill(0);
				assert.isTrue(mat.data.every(e => e === 0));
			});
		});

		describe("#map", () => {
			it ("generates a new GenericMatrix by iterating over every i and j", () => {
				const mat = new GenericMatrix<string>(2, 3).map(mapCoords);
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
			const mat = new GenericMatrix(3,4).map(i => i);
			assert.deepEqual(mat.iRow(0), [0,0,0,0]);
			assert.deepEqual(mat.iRow(1), [1,1,1,1]);
			assert.deepEqual(mat.iRow(2), [2,2,2,2]);
		});
		it ("throws if i is out of range", () => {
			const mat = new GenericMatrix(2,2);
			assert.throws(() => {
				mat.iRow(2);
			}, OutOfBoundsError);
			assert.throws(() => {
				mat.iRow(-1);
			}, OutOfBoundsError);
		});
	});

	describe("#jCol", () => {
		it ("returns j'th row", () => {
			const mat = new GenericMatrix(3,4).map(i => i);
			assert.deepEqual(mat.jCol(0), [0,1,2]);
			assert.deepEqual(mat.jCol(1), [0,1,2]);
			assert.deepEqual(mat.jCol(2), [0,1,2]);
		});
		it ("throws if j is out of range", () => {
			const mat = new GenericMatrix(2,2);
			assert.throws(() => {
				mat.jCol(2);
			}, OutOfBoundsError);
			assert.throws(() => {
				mat.jCol(-1);
			}, OutOfBoundsError);
		});
	});

	describe("#rows", () => {
		it ("returns an array of rows", () => {
			const m = new GenericMatrix(3,3).map(i => i);
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
			const m = new GenericMatrix(2,5).map(i => i);
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
		let mat: GenericMatrix<string>;

		beforeEach(() => {
			mat = new GenericMatrix<string>(5, 4).map(mapCoords);
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
			}, OutOfBoundsError);
			assert.throws(() => {
				mat.get(-1,2);
			}, OutOfBoundsError);
		});

		it ("throws if j out of bounds", () => {
			assert.throws(() => {
				mat.get(2,4);
			}, OutOfBoundsError);
			assert.throws(() => {
				mat.get(2,-1);
			}, OutOfBoundsError);
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
			const m1 = new GenericMatrix(2,3).map(mapCoords);
			assert.deepEqual(m1.transpose.rows, [
				["0,0", "1,0"],
				["0,1", "1,1"],
				["0,2", "1,2"],
			]);
		});
	});

	describe("toString", () => {
		it ("renders matrix as string", () => {
			const m = new GenericMatrix(2,3).map((i, j) => Math.pow(10, j) + i);
			assert.equal(m.toString(), [
				["  1  10 100"],
				["  2  11 101"],
			].join("\n"))
		});
	});

	describe("forEach", () => {
		it ("iterates over every elem in order (i =0 ...m, left to right)", () => {
			const m = new GenericMatrix<string>(3,3).map(mapCoords);
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

	describe("kDiagonal", () => {
		let square: GenericMatrix<string>, tall: GenericMatrix<string>, wide: GenericMatrix<string>;

		beforeEach(() => {
			square = new GenericMatrix<string>(3,3).map(mapCoords);
			tall = new GenericMatrix<string>(3,2).map(mapCoords);
			wide = new GenericMatrix<string>(2,3).map(mapCoords);
		});

		it ("returns 0th diagonal", () => {
			assert.deepEqual(square.kDiagonal(0), [
				"0,0","1,1","2,2",
			]);
			assert.deepEqual(tall.kDiagonal(0), [
				"0,0","1,1",
			]);
			assert.deepEqual(wide.kDiagonal(0), [
				"0,0","1,1",
			]);
		});
		it ("returns 1st diagonal", () => {
			assert.deepEqual(square.kDiagonal(1), [
				"0,1","1,2",
			]);
			assert.deepEqual(tall.kDiagonal(1), [
				"0,1",
			]);
			assert.deepEqual(wide.kDiagonal(1), [
				"0,1","1,2",
			]);
		});
		it ("returns -1st diagonal", () => {
			assert.deepEqual(square.kDiagonal(-1), [
				"1,0","2,1",
			]);
			assert.deepEqual(tall.kDiagonal(-1), [
				"1,0","2,1",
			]);
			assert.deepEqual(wide.kDiagonal(-1), [
				"1,0",
			]);
		});
	});

	describe("diagonal", () => {
		it ("returns main diagonal", () => {
			const square = new GenericMatrix<string>(3,3).map(mapCoords);
			const tall = new GenericMatrix<string>(3,2).map(mapCoords);
			const wide = new GenericMatrix<string>(2,3).map(mapCoords);

			assert.deepEqual(square.diagonal, square.kDiagonal(0));
			assert.deepEqual(wide.diagonal, wide.kDiagonal(0));
			assert.deepEqual(tall.diagonal, tall.kDiagonal(0));
		});
	});

	describe("equals", () => {
		it ("aliases to equality method", () => {
			const A = new GenericMatrix(2,2).fill(0);
			const B = new GenericMatrix(2,2).fill(0);
			assert.isTrue(A.equals(B));
		});
	});
});
