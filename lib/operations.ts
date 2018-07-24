import { DimensionsNotEqualError } from "./errors";
import { GenericMatrix, Matrix } from "./index";

/**
 * Adds two matrices
 */
export const add = (A: Matrix, B: Matrix): Matrix => {
	assertEqualDimensions(A, B);
	return new Matrix(A.m, A.n)
		.map((i, j) => A.get(i, j) + B.get(i, j));
};

/**
 * Subtracts Matrix B from Matrix A
 */
export const subtract = (A: Matrix, B: Matrix): Matrix => {
	assertEqualDimensions(A, B);
	return new Matrix(A.m, A.n)
		.map((i, j) => A.get(i, j) - B.get(i, j));
};

/**
 * Compares two matrices
 */
export const equals = <T>(A: GenericMatrix<T>, B: GenericMatrix<T>): boolean => {
	assertEqualDimensions(A, B);
	return A.matrix.every((elem, i) => elem === B.matrix[i]);
};

/**
 * Throws if matrices do not have equal dimensions
 */
const assertEqualDimensions = <T>(A: GenericMatrix<T>, B: GenericMatrix<T>): void => {
	if (A.m !== B.m) throw new DimensionsNotEqualError({ A, B });
	if (A.n !== B.n) throw new DimensionsNotEqualError({ A, B });
};

/**
 * Scales matrix by factor n
 */
export const scalarProduct = (A: Matrix, n: number): Matrix => A.map(e => e * n);
