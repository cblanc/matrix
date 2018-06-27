import { assert } from "chai";
import {
	Matrix,
} from "../lib/index";

describe("Matrix", () => {
	describe("#new", () => {
		it ("creates a new matrix instance and assigns empty _matrix", () => {
			const m = new Matrix(4, 4, 8);
			const n = m.new;
			assert.equal(n.rows, m.rows);
			assert.equal(n.columns, m.columns);
			assert.notEqual(m, n);
		});
	});

	describe("matrix getter", () => {
		it ("returns copy of underlying data structure", () => {
			const m = new Matrix(2,2);
			const _m = m.matrix;
			assert.deepEqual(_m, m.matrix);
			assert.notEqual(_m, m.matrix);
		});
	});

	describe("matrix setter", () => {
		it ("assigns matrix", () => {
			const m = new Matrix(2,2);
			m.matrix.forEach(assert.isUndefined.bind(assert));
			const n = 1;
			m.matrix = new Array(4).fill(n);
			m.matrix.forEach(e => assert.equal(e, n));
		});
		it ("throws if invalid size", () => {
			const m = new Matrix(3,2);
			assert.throws(() => {
				m.matrix = [1,2];
			}, Error)
		});
	});

	describe("size", () => {
		it ("returns size of matrix", () => {
			const m = new Matrix(8, 7);
			assert.equal(m.size, 56);
		});
	});

	describe("instantiation", () => {
		it ("creates a matrix initialised to undefined", () => {
			const m = new Matrix(2,3);
			assert.isTrue(m._matrix.every(e => e === undefined));
			assert.equal(m._matrix.length, 6);
			assert.equal(m.rows, 2);
			assert.equal(m.columns, 3);
		});

		it ("accepts an optional fill argument", () => {
			const m = new Matrix(2,3, 0);
			assert.isTrue(m._matrix.every(e => e === 0));
		});
	});
});
