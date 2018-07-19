import { assert } from "chai";
import { GenericMatrix } from "../lib/index";
import { OutOfBoundsError } from "../lib/errors";

describe("Errors", () => {
	describe("OutOfBoundsError", () => {
		it ("handles case where no i or j provided", () => {
			const M = new GenericMatrix(2,2).fill(0);
			const error = new OutOfBoundsError({ M });
			assert.equal(error.message, "Attempted to access an out of bounds element on a 2x2 matrix");
		});
	});
});
