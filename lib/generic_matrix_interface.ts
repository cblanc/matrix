interface MapFunction<T> {
	(fn: MapIterator<T>): GenericMatrixInterface<T>;
}

interface FillFunction<T> {
	(value: T): GenericMatrixInterface<T>;
}

interface FromArrayFunction<T> {
	(arr: T[]): GenericMatrixInterface<T>;
}

interface GetVectorFunction<T> {
	(n: number): T[];
}

export interface MapIterator<T> {
	(elem: T, i: number, j: number): T;
}

interface GetElementFunction<T> {
	(i: number, j: number): T;
}

interface StringifyFunction {
	(): string;
}

interface ForEachFunction<T> {
	(fn: ForEachIterator<T>): void;
}

export interface ForEachIterator<T> {
	(elem: T, i: number, j: number): void;
}

interface GetDiagonalFunction<T> {
	(k: number): T[];
}

interface CloneFunction<T> {
	(): GenericMatrixInterface<T>;
}

interface Initialisers<T> {
	clone: CloneFunction<T>;
	map: MapFunction<T>;
	fill: FillFunction<T>;
	fromArray: FromArrayFunction<T>;
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
	kDiagonal: GetDiagonalFunction<T>;
	iRow: GetVectorFunction<T>;
	jCol: GetVectorFunction<T>;
	get: GetElementFunction<T>;
	toString: StringifyFunction;
	forEach: ForEachFunction<T>;
}

export interface GenericMatrixInterface<T> extends Initialisers<T>, Accessors<T>, Methods<T> { };
