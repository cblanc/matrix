import { assert } from "chai";
import { randomInt } from "./helper/util";
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

		it ("appears to be commutative", () => {
			const M = new Matrix(2,3).fill(1);
			const N = new Matrix(2,3).fill(2);
			assert.isTrue(
				M.add(N).eq(N.add(M))
			);
		});

		it ("produces equivalent results for sum of transpose and transpose of sum", () => {
			const M = new Matrix(2,3).fill(1);
			const N = new Matrix(2,3).fill(2);
			assert.isTrue(
				M.add(N).transpose.eq(M.transpose.add(N.transpose))
			);
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

		it ("produces equivalent result for scalar of tranpose and tranpose of scalar product", () => {
			const A = new Matrix(8,2).fill(3)
			assert.isTrue(
				A.scale(10).transpose.eq(A.transpose.scale(10))
			);
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

	describe("iVectors", () => {
		it ("returns all row vectors", () => {
			const A = new Matrix(2,2).map((elem, i) => i);
			const Expected0 = new RowVector(2).fill(0);
			const Expected1 = new RowVector(2).fill(1);
			const iVectors = A.iVectors;
			assert.isTrue(iVectors[0].equals(Expected0));
			assert.isTrue(iVectors[1].equals(Expected1));
		});
	});

	describe("jVector", () => {
		it ("returns column vector", () => {
			const A = new Matrix(2,2).map((elem, i, j) => j);
			const Expected0 = new ColumnVector(2).fill(0);
			const Expected1 = new ColumnVector(2).fill(1);
			const V0 = A.jVector(0);
			const V1 = A.jVector(1);
			assert.isTrue(V0.equals(Expected0));
			assert.isTrue(V1.equals(Expected1));
		});
	});

	describe("iVectorss", () => {
		it ("returns all row vectors", () => {
			const A = new Matrix(2,2).map((elem, i, j) => j);
			const Expected0 = new ColumnVector(2).fill(0);
			const Expected1 = new ColumnVector(2).fill(1);
			const jVectors = A.jVectors;
			assert.isTrue(jVectors[0].equals(Expected0));
			assert.isTrue(jVectors[1].equals(Expected1));
		});
	});

	describe("multiply", () => {
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
			assert.isTrue(A.multiply(B).equals(E));
		});

		it ("appears to satisfy associativity", () => {
			const rand = () => randomInt(10) + 1;
			const A = new Matrix(3, 3).map(rand);
			const B = new Matrix(3, 3).map(rand);
			const C = new Matrix(3, 3).map(rand);
			const LHS = A.multiply(B).multiply(C);
			const RHS = A.multiply(B.multiply(C));
			assert.isTrue(LHS.eq(RHS));
		});
	});

	describe("x", () => {
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
			assert.isTrue(A.x(B).equals(E));
		});
	});
});
