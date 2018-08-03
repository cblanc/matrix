import {
	DimensionsIncompatibleError,
	DimensionsNotEqualError,
} from "./errors";
import {
	ColumnVector,
	GenericMatrix,
	Matrix,
	RowVector,
} from "./index";

/**
 * Adds two matrices
 */
export const add = (A: Matrix, B: Matrix): Matrix => {
	assertEqualDimensions(A, B);
	return A.map((elem, i, j) => elem + B.get(i, j));
};

/**
 * Subtracts Matrix B from Matrix A
 */
export const subtract = (A: Matrix, B: Matrix): Matrix => {
	assertEqualDimensions(A, B);
	return add(A, scalarProduct(B, -1));
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
export const scalarProduct = (A: Matrix, n: number): Matrix => A.map(e => e*n);

const assertProductDimentions = (A: Matrix, B: Matrix): void => {
	if (A.m !== B.n) throw new DimensionsIncompatibleError({ A, B });
	if (A.n !== B.m) throw new DimensionsIncompatibleError({ A, B });
};

/**
 * dot products two vectors
 */
export const dotProduct = (R: RowVector, C: ColumnVector): number => {
	assertProductDimentions(R, C);
	const cData = C.data;
	return R.data.reduce((prev: number, r: number, i) => prev + r * cData[i], 0);
};
