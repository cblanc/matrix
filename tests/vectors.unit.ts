import { assert } from "chai";
import { ColumnVector, RowVector } from "../lib/index";

describe("Vectors", () => {
	describe("RowVector", () => {
		describe("instantiation", () => {
			it ("creates a row vector", () => {
				const V = new RowVector(4).fill(2);
				assert.equal(V.size, 4);
				assert.equal(V.m, 1);
				assert.equal(V.n, 4);
			});
		});
	});

	describe("ColumnVector", () => {
		describe("instantiation", () => {
			it ("creates a column vector", () => {
				const V = new ColumnVector(3).fill(1);
				assert.equal(V.size, 3);
				assert.equal(V.m, 3);
				assert.equal(V.n, 1);
			});
		});
	});
});
