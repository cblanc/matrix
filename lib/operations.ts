import { DimensionsNotEqualError } from "./errors";
import { GenericMatrix, Matrix } from "./index";

/**
 * Adds two matrices
 * @type {[type]}
 */
export const add = (A: Matrix, B: Matrix): Matrix => {
	assertEqualDimensions(A, B);
	return new Matrix(A.m, A.n)
		.map((i, j) => A.get(i, j) + B.get(i, j));
};

/**
 * Subtracts Matrix B from Matrix A
 * @type {[type]}
 */
export const subtract = (A: Matrix, B: Matrix): Matrix => {
	assertEqualDimensions(A, B);
	return new Matrix(A.m, A.n)
		.map((i, j) => A.get(i, j) - B.get(i, j));
};

/**
 * Compares two matrices
 * @type {[type]}
 */
export const equals = <T>(A: GenericMatrix<T>, B: GenericMatrix<T>): boolean => {
	assertEqualDimensions(A, B);
	return A.matrix.every((elem, i) => elem === B.matrix[i]);
};

/**
 * Throws if matrices do not have equal dimensions
 * @type {[type]}
 */
const assertEqualDimensions = <T>(A: GenericMatrix<T>, B: GenericMatrix<T>): void => {
	if (A.m !== B.m) throw new DimensionsNotEqualError({ A, B });
	if (A.n !== B.n) throw new DimensionsNotEqualError({ A, B });
};