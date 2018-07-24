interface MatrixMapFunction<T> {
	(fn: MatrixMapIterator<T>): GenericMatrixInterface<T>;
}

interface MatrixFillFunction<T> {
	(value: T): GenericMatrixInterface<T>;
}

interface VectorFunction<T> {
	(n: number): T[];
}

export interface MatrixMapIterator<T> {
	(i: number, j: number): T;
}

interface ElementFunction<T> {
	(i: number, j: number): T;
}

interface StringifyFuntion {
	(): string;
}

interface MatrixForEachFunction<T> {
	(fn: MatrixForEachIterator<T>): void;
}

export interface MatrixForEachIterator<T> {
	(elem: T, i: number, j: number): void;
}

interface KDiagonalFunction<T> {
	(k: number): T[];
}

interface CloneFunction<T> {
	(): GenericMatrixInterface<T>;
}

export interface GenericMatrixInterface<T> {
	size: number;
	clone: CloneFunction<T>;
	matrix: T[];
	map: MatrixMapFunction<T>;
	fill: MatrixFillFunction<T>;
	iRow: VectorFunction<T>;
	jCol: VectorFunction<T>;
	rows: T[][];
	columns: T[][];
	get: ElementFunction<T>;
	transpose: GenericMatrixInterface<T>;
	toString: StringifyFuntion;
	diagonal: T[];
	kDiagonal: KDiagonalFunction<T>;
	forEach: MatrixForEachFunction<T>;
}