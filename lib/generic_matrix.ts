import { OutOfBoundsError } from "./errors";
import { equals } from "./operations";
import { padder } from "./utils";

interface MatrixMapFunction<T> {
	(fn: MatrixMapIterator<T>): GenericMatrixInterface<T>;
}

interface MatrixFillFunction<T> {
	(value: T): GenericMatrixInterface<T>;
}

interface VectorFunction<T> {
	(n: number): T[];
}

interface MatrixMapIterator<T> {
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

interface MatrixForEachIterator<T> {
	(elem: T, i: number, j: number): void;
}

interface GenericMatrixInterface<T> {
	size: number;
	new: GenericMatrixInterface<T>;
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
	forEach: MatrixForEachFunction<T>;
}

export class GenericMatrix<T> implements GenericMatrixInterface<T> {
	public data: T[];
	public m: number; // Number of rows
	public n: number; // Number of columns

	constructor(m: number, n: number) {
		this.m = m;
		this.n = n;
		this.data = new Array(m * n).fill(undefined);
	}

	/**
	 * Returns m*n size of matrix
	 * @return {number}
	 */
	get size() {
		return this.m * this.n;
	}

	/**
	 * Creates an empty copy of matrix
	 * @return {GenericMatrix<T>}
	 */
	get new() {
		const m = new GenericMatrix<T>(this.m, this.n);
		m.matrix = this.data.slice(0);
		return m;
	}

	/**
	 * Returns a copy of internal datastructure
	 * @return {T[]}
	 */
	get matrix() {
		return this.data.slice(0);
	}

	/**
	 * Sets underlying data structure
	 * @param {T[]} data
	 */
	set matrix(data) {
		const { size } = this;
		if (data.length !== this.size) {
			const { m, n } = this;
			const msg = [
				`Invalid array size presented`,
				`Expecting ${size} for a ${m} by ${n} matrix`,
			].join(". ")
			throw new Error(msg);
		}
		this.data = data;
	}

	/**
	 * Returns i (row number) given position n of data
	 * @param  {number} n 
	 * @return {number}
	 */
	private i(n: number): number {
		return Math.floor(n / this.n);
	}

	/**
	 * Returns j (column number) given position n of data
	 * @param  {number} n 
	 * @return {number}
	 */
	private j(n: number): number {
		return n % this.n;
	}
	
	/**
	 * Populates a matrix with a function that iterates over i and j
	 * @param  {(i: number, j: number) => T} callback
	 * @return {GenericMatrix<T>}
	 */
	public map(fn: MatrixMapIterator<T>) {
		const m = this.new
		m.data = m.data.map((elem, n) => fn(this.i(n), this.j(n)));
		return m;
	}

	/**
	 * Fills all elems in matrix with value
	 * @param  {T}         value
	 * @return {GenericMatrix<T>}
	 */
	public fill(value: T) {
		const m = this.new.map(() => value);
		return m;
	}

	/**
	 * Returns ith row
	 * @param  {number} i
	 * @return {T[]}
	 */
	public iRow(i: number): T[] {
		this.checkI(i);
		const { n } = this;
		const min = i * n;
		const max = min + n;
		return this.data.slice(min, max);
	}

	/**
	 * Returns j'th column
	 * @param  {number} j
	 * @return {T[]}
	 */
	public jCol(j: number): T[] {
		this.checkJ(j);
		const { m, n } = this;
		return new Array(m)
			.fill(undefined)
			.map((_, int) => this.data[int * n + j])
	}

	/**
	 * Returns an array of rows size m
	 * @return {T[]}
	 */
	get rows() {
		return new Array(this.m)
			.fill(undefined)
			.map((_, i) => this.iRow(i));
	}

	/**
	 * Returns an array of columns size n
	 * @return {T[]}
	 */
	get columns() {
		return new Array(this.n)
			.fill(undefined)
			.map((_, j) => this.jCol(j));
	}

	/**
	 * Retrives value at position i,j
	 * @param  {number} i
	 * @param  {number} j
	 * @return {T}
	 */
	public get(i: number, j: number) {
		this.checkI(i);
		this.checkJ(j);
		return this.iRow(i)[j];
	}

	/**
	 * Throws if i is out of range
	 * @param {number} i
	 */
	private checkI(i: number): void {
		if (i < 0 || i >= this.m) throw new OutOfBoundsError({ i, M: this });
	}

	/**
	 * Throws if j is out of range
	 * @param {number} j
	 */
	private checkJ(j: number): void {
		if (j < 0 || j >= this.n) throw new OutOfBoundsError({ j, M: this });
	}

	/**
	 * Returns transpose of matrix
	 * @return {GenericMatrix<T>}
	 */
	get transpose() {
		return new GenericMatrix<T>(this.n, this.m)
			.map((i, j) => this.get(j, i));
	}

	/**
	 * Human readable string represenation of matrix
	 * @return {string}
	 */
	public toString(): string {
		const maxLength: number = this.data
			.map(elem => `${elem}`.length)
			.reduce((prev, curr) => {
				return (curr > prev) ? curr : prev
			});
		const leftPad = padder(maxLength);
		return this.rows
			.map(row => {
				return row.map(elem => leftPad(`${elem}`))
			})
			.map(row => row.join(" "))
			.join("\n");
	}

	/**
	 * Iterates over every element in matrix
	 * @param {(elem: T, i: number, j:number) => void} cb
	 */
	public forEach(cb: (elem: T, i: number, j: number) => void): void {	
		return this.data.forEach((elem, i) => {
			cb(elem, Math.floor(i / this.n) ,i % this.n);
		});
	}

	/**
	 * Returns arbitrary diagonal
	 * @param  {number} k
	 * @return {T[]}     
	 */
	public kDigaonal(k: number): T[] {
		return new Array(this.m)
			.fill(undefined)
			.map((_, i) => [i, i + k])								// Produce main diagonal shifted by k
			.filter(([_, j]) => j >= 0 && j < this.n)	// Reject out of bounds j
			.map(([i, j]) => this.get(i, j));
	}

	/**
	 * Returns 0th digaonal
	 * @return {T[]} [description]
	 */
	get diagonal() {
		return this.kDigaonal(0);
	}

	/**
	 * Checks for equality against matrix M
	 * @param  {GenericMatrix<T>} M
	 * @return {boolean}    
	 */
	equals(M: GenericMatrix<T>): boolean {
		return equals(this, M);
	}
}
