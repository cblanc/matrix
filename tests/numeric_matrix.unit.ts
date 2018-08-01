import { assert } from "chai";
import { Matrix, RowVector, ColumnVector } from "../lib/numeric_matrix";
import { mapIncrementer } from "./helper/util";

describe("Matrix", () => {
	describe("#new", () => {
		it ("creates a new Matrix instance and assigns 0s", () => {
			const M = new Matrix(4, 4);
			M.forEach(elem => assert.equal(elem, 0));
		});
	});

	describe("#add", () => {
		it ("adds with matrix", () => {
			const A = new Matrix(2,3).fill(1);
			const B = new Matrix(2,3).fill(2);
			const C = new Matrix(2,3).fill(3);
			assert.isTrue(A.add(B).equals(C));
		});
	});

	describe("#subtract", () => {
		it ("subtracts with matrix", () => {
			const A = new Matrix(2,3).fill(3);
			const B = new Matrix(2,3).fill(2);
			const C = new Matrix(2,3).fill(1);
			assert.isTrue(A.subtract(B).equals(C));
		});
	});

	describe("#scale", () => {
		it ("scales matrix", () => {
			const A = new Matrix(8,2).fill(3)
			const B = new Matrix(8,2).fill(12)
			assert.isTrue(A.scale(4).equals(B));
		});
	});

	describe("iVector", () => {
		it ("returns row vector", () => {
			const A = new Matrix(2,2).map((elem, i) => i);
			const Expected0 = new RowVector(2).fill(0);
			const Expected1 = new RowVector(2).fill(1);
			const V0 = A.iVector(0);
			const V1 = A.iVector(1);
			assert.isTrue(V0.equals(Expected0));
			assert.isTrue(V1.equals(Expected1));
		});
	});
});
