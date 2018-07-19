import { DimensionsNotEqualError } from "./errors";
import { Matrix } from "./index";

/**
 * Adds two matrices
 * @type {[type]}
 */
export const add = (A: Matrix<number>, B: Matrix<number>): Matrix<number> => {
	assertEqualDimensions(A, B);
	return new Matrix<number>(A.m, A.n)
		.map((i, j) => A.get(i, j) + B.get(i, j));
};

/**
 * Compares two matrices
 * @type {[type]}
 */
export const equals = <T>(A: Matrix<T>, B: Matrix<T>): boolean => {
	assertEqualDimensions(A, B);
	return A.matrix.every((elem, i) => elem === B.matrix[i]);
};

/**
 * Throws if matrices do not have equal dimensions
 * @type {[type]}
 */
const assertEqualDimensions = <T>(A: Matrix<T>, B: Matrix<T>): void => {
	if (A.m !== B.m) throw new DimensionsNotEqualError({ A, B });
	if (A.n !== B.n) throw new DimensionsNotEqualError({ A, B });
};
