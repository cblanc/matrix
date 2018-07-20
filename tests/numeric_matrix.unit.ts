import { assert } from "chai";
import { Matrix } from "../lib/numeric_matrix";

describe("Matrix", () => {
	describe("#new", () => {
		it ("creates a new Matrix instance and assigns 0s", () => {
			const M = new Matrix(4, 4);
			M.forEach(elem => assert.equal(elem, 0));
		});
	});
});
