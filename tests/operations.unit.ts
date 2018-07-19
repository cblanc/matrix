import { assert } from "chai";
import { DimensionsNotEqualError } from "../lib/errors";
import { Matrix } from "../lib/index";
import { equals } from "../lib/operations";

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
});
