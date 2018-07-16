import {
	padder
} from "./utils";

import {
	OutOfBoundsError,
} from "./errors";

export class Matrix<T> {
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
	get size(): number {
		return this.m * this.n;
	}

	/**
	 * Creates an empty copy of matrix
	 * @return {Matrix<T>}
	 */
	get new(): Matrix<T> {
		const m = new Matrix<T>(this.m, this.n);
		m.matrix = this.data.slice(0);
		return m;
	}

	/**
	 * Returns a copy of internal datastructure
	 * @return {T[]}
	 */
	get matrix(): T[] {
		return this.data.slice(0);
	}

	/**
	 * Sets underlying data structure
	 * @param {T[]} data
	 */
	set matrix(data: T[]) {
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
	 * @return {Matrix<T>}
	 */
	public map(callback: (i: number, j: number) => T): Matrix<T> {
		const m = this.new
		m.data = m.data.map((elem, n) => {
			return callback(this.i(n), this.j(n));
		});
		return m;
	}

	/**
	 * Fills all elems in matrix with value
	 * @param  {T}         value
	 * @return {Matrix<T>}
	 */
	public fill(value: T): Matrix<T> {
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
	get rows(): T[][] {
		return new Array(this.m)
			.fill(undefined)
			.map((_, i) => this.iRow(i));
	}

	/**
	 * Returns an array of columns size n
	 * @return {T[]}
	 */
	get columns(): T[][] {
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
	public get(i: number, j: number): T {
		this.checkI(i);
		this.checkJ(j);
		return this.iRow(i)[j];
	}

	/**
	 * Throws if i is out of range
	 * @param {number} i
	 */
	private checkI(i: number): void {
		const { m, n } = this;
		if (i < 0 || i >= m) {
			throw new OutOfBoundsError(`Cannot access i=${i} of a ${m}x${n} matrix`);
		}
	}

	/**
	 * Throws if j is out of range
	 * @param {number} j
	 */
	private checkJ(j: number): void {
		const { m, n } = this;
		if (j < 0 || j >= n) {
			throw new OutOfBoundsError(`Cannot access j=${j} of a ${m}x${n} matrix`);
		}
	}

	get transpose(): Matrix<T> {
		return new Matrix<T>(this.n, this.m)
			.map((i, j) => this.get(j, i));
	}

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

	public forEach(cb: (elem: T, i: number, j: number) => void): void {	
		return this.data.forEach((elem, i) => {
			cb(elem, Math.floor(i / this.n) ,i % this.n);
		});
	}

	public kDigaonal(k: number): T[] {
		return new Array(this.m)
			.fill(undefined)
			.map((_, i) => [i, i + k])								// Produce main diagonal shifted by k
			.filter(([_, j]) => j >= 0 && j < this.n)	// Reject out of bounds j
			.map(([i, j]) => this.get(i, j));
	}
}
