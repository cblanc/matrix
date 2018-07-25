import { assert } from "chai";
import { ColumnVector, RowVector } from "../lib/index";

describe("RowVector", () => {
	describe("instantiation", () => {
		it ("creates a row vector", () => {
			const V = new RowVector(5).fill(1);
			assert.equal(V.size, 5);
			assert.equal(V.m, 5);
			assert.equal(V.n, 1);
		});
	});
});

describe("ColumnVector", () => {
	describe("instantiation", () => {
		it ("creates a column vector", () => {
			const V = new RowVector(3).fill(1);
			assert.equal(V.size, 3);
			assert.equal(V.m, 1);
			assert.equal(V.n, 3);
		});
	});
});