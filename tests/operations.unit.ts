import { assert } from "chai";
import {
	DimensionsIncompatibleError,
	DimensionsNotEqualError,
} from "../lib/errors";
import {
	ColumnVector,
	GenericMatrix,
	Matrix,
	RowVector,
} from "../lib/index";
import {
	add,
	dotProduct,
	equals,
	multiply,
	subtract,
	scalarProduct,
} from "../lib/operations";

describe("Matrix operations", () => {
	describe("equals", () => {
		it ("returns true if matrices are equal", () => {
			const A = new GenericMatrix(4,2).fill(0);
			const B = new GenericMatrix(4,2).fill(0);
			assert.isTrue(equals(A, B));
		});
		it ("returns false if matrices are not equal", () => {
			const A = new GenericMatrix(4,2).fill(0);
			const B = new GenericMatrix(4,2).fill(1);
			assert.isFalse(equals(A, B));
		});
		it ("throws an error if matrices are invalidly sized", () => {
			const A = new GenericMatrix(4,2).fill(0);
			const B = new GenericMatrix(1,2).fill(0);
			const C = new GenericMatrix(4,1).fill(0);
			assert.throws(() => equals(A, B), DimensionsNotEqualError);
			assert.throws(() => equals(A, C), DimensionsNotEqualError);
		});
	});

	describe("add", () => {
		it ("adds two matrices", () => {
			const A = new Matrix(2,3).fill(1);
			const B = new Matrix(2,3).fill(2);
			const C = new Matrix(2,3).fill(3);
			const R = add(A, B);
			assert.isTrue(R.equals(C));
		});
		it ("throws an error if matrices are invalidly size", () => {
			const A = new Matrix(2,3).fill(0);
			const B = new Matrix(1,3).fill(0);
			const C = new Matrix(2,1).fill(0);
			assert.throws(() => add(A, B), DimensionsNotEqualError);
			assert.throws(() => add(A, C), DimensionsNotEqualError);
		});
	});

	describe("subtract", () => {
		it ("subracts two matrices", () => {
			const A = new Matrix(2,3).fill(3);
			const B = new Matrix(2,3).fill(2);
			const C = new Matrix(2,3).fill(1);
			const R = subtract(A, B);
			assert.isTrue(R.equals(C));
		});
		it ("throws an error if matrices are invalidly size", () => {
			const A = new Matrix(2,3).fill(0);
			const B = new Matrix(1,3).fill(0);
			const C = new Matrix(2,1).fill(0);
			assert.throws(() => subtract(A, B), DimensionsNotEqualError);
			assert.throws(() => subtract(A, C), DimensionsNotEqualError);
		});
	});

	describe("scalarProduct", () => {
		it ("scales a matrix", () => {
			const A = new Matrix(2,3).fill(1);
			const B = new Matrix(2,3).fill(3);
			const C = new Matrix(2,3).fill(6);
			const D = new Matrix(2,3).fill(0);
			const R1 = scalarProduct(A, 3);
			assert.isTrue(equals(B, R1));

			const R2 = scalarProduct(B, 2);
			assert.isTrue(equals(C, R2));

			const R3 = scalarProduct(C, 0);
			assert.isTrue(equals(D, R3));
		});
	});

	describe("dotProduct", () => {
		it ("throws if R.n !== C.m", () => {
			assert.throws(() => {
				const R = new RowVector(3);
				const C = new ColumnVector(4);
				dotProduct(R, C);
			}, DimensionsIncompatibleError);	
		});
		it ("dot products two vectors", () => {
			const sum = (prev: number, curr: number) => prev + curr;
			const R = new RowVector(5).fromArray(   [1, -2, 2, 0, -2]);
			const C = new ColumnVector(5).fromArray([5, +3, 4, 9, -3]);
			assert.equal(dotProduct(R, C),          [5, -6, 8, 0, +6]
				.reduce(sum, 0));
		});
	});

	describe("multiply", () => {
		it ("throws if matrices are invalidly sized", () => {
			const A = new Matrix(3,2);
			const B = new Matrix(8,8);
			assert.throws(() => multiply(A, B), DimensionsIncompatibleError);
		});

		it ("multiplies two matrices", () => {
			const A = new Matrix(3,2).fromArray([
				0,7,
				1,8,
				2,9,
			]);
			const B = new Matrix(2,3).fromArray([
				3,2,4,
				9,0,1,
			]);
			const expected = [
				0*3+7*9, 0*2+7*0, 0*4+7*1,
				1*3+8*9, 1*2+8*0, 1*4+8*1,
				2*3+9*9, 2*2+9*0, 2*4+9*1,
			];
			const E = new Matrix(3, 3).fromArray(expected);
			const R = multiply(A, B);
			assert.isTrue(R.equals(E));
		});
	});
});
