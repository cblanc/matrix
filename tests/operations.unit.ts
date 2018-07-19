import { assert } from "chai";
import { DimensionsNotEqualError } from "../lib/errors";
import { Matrix } from "../lib/index";
import { equals, add, subtract } from "../lib/operations";

describe("Matrix operations", () => {
	describe("equals", () => {
		it ("returns true if matrices are equal", () => {
			const A = new Matrix(4,2).fill(0);
			const B = new Matrix(4,2).fill(0);
			assert.isTrue(equals(A, B));
		});
		it ("returns false if matrices are not equal", () => {
			const A = new Matrix(4,2).fill(0);
			const B = new Matrix(4,2).fill(1);
			assert.isFalse(equals(A, B));
		});
		it ("throws an error if matrices are invalidly sized", () => {
			const A = new Matrix(4,2).fill(0);
			const B = new Matrix(0,2).fill(0);
			const C = new Matrix(4,0).fill(0);
			assert.throws(() => equals(A, B), DimensionsNotEqualError);
			assert.throws(() => equals(A, C), DimensionsNotEqualError);
		});
	});

	describe("add", () => {
		it ("adds two matrices", () => {
			const A = new Matrix<number>(2,3).fill(1);
			const B = new Matrix<number>(2,3).fill(2);
			const C = new Matrix<number>(2,3).fill(3);
			const R = add(A, B);
			assert.isTrue(R.equals(C));
		});
		it ("throws an error if matrices are invalidly size", () => {
			const A = new Matrix<number>(2,3).fill(0);
			const B = new Matrix<number>(0,3).fill(0);
			const C = new Matrix<number>(2,0).fill(0);
			assert.throws(() => add(A, B), DimensionsNotEqualError);
			assert.throws(() => add(A, C), DimensionsNotEqualError);
		});
	});

	describe("subtract", () => {
		it ("subracts two matrices", () => {
			const A = new Matrix<number>(2,3).fill(3);
			const B = new Matrix<number>(2,3).fill(2);
			const C = new Matrix<number>(2,3).fill(1);
			const R = subtract(A, B);
			assert.isTrue(R.equals(C));
		});
		it ("throws an error if matrices are invalidly size", () => {
			const A = new Matrix<number>(2,3).fill(0);
			const B = new Matrix<number>(0,3).fill(0);
			const C = new Matrix<number>(2,0).fill(0);
			assert.throws(() => subtract(A, B), DimensionsNotEqualError);
			assert.throws(() => subtract(A, C), DimensionsNotEqualError);
		});
	});
});
