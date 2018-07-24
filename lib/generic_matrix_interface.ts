interface MapFunction<T> {
	(fn: MapIterator<T>): GenericMatrixInterface<T>;
}

interface MatrixFillFunction<T> {
	(value: T): GenericMatrixInterface<T>;
}

interface VectorFunction<T> {
	(n: number): T[];
}

export interface MapIterator<T> {
	(i: number, j: number): T;
}

interface ElementFunction<T> {
	(i: number, j: number): T;
}

interface StringifyFuntion {
	(): string;
}

interface ForEachFunction<T> {
	(fn: ForEachIterator<T>): void;
}

export interface ForEachIterator<T> {
	(elem: T, i: number, j: number): void;
}

interface KDiagonalFunction<T> {
	(k: number): T[];
}

interface CloneFunction<T> {
	(): GenericMatrixInterface<T>;
}

interface Initialisers<T> {
	clone: CloneFunction<T>;
	map: MapFunction<T>;
	fill: MatrixFillFunction<T>;
}

interface Accessors<T> {
	size: number;
	matrix: T[];
	rows: T[][];
	columns: T[][];
	diagonal: T[];
	transpose: GenericMatrixInterface<T>;
}

interface Methods<T> {
	kDiagonal: KDiagonalFunction<T>;
	iRow: VectorFunction<T>;
	jCol: VectorFunction<T>;
	get: ElementFunction<T>;
	toString: StringifyFuntion;
	forEach: ForEachFunction<T>;
}

export interface GenericMatrixInterface<T> extends Initialisers<T>, Accessors<T>, Methods<T> { };
