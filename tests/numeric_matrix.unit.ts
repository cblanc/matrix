import { assert } from "chai";
import { Matrix } from "../lib/numeric_matrix";

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
});
