import { assert } from "chai";
import { Matrix } from "../lib/numeric_matrix";

describe("GenericMatrix", () => {
	describe("#new", () => {
		it ("creates a new GenericMatrix instance and assigns 0s", () => {
			const M = new Matrix(4, 4);
			M.forEach(elem => assert.equal(elem, 0));
		});
	});
});
