interface FromFunctionIterator<T> {
	(i: number, j: number): T;
}

export class Matrix<T> {
	public data: T[];
	public m: number; // Number of rows
	public n: number; // Number of columns

	constructor(m: number, n: number, fill?: T) {
		this.m = m;
		this.n = n;
		this.data = new Array(m * n).fill(fill);
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
	 * @param  {FromFunctionIterator<T>} callback
	 * @return {Matrix<T>}
	 */
	public fill(callback: FromFunctionIterator<T>): Matrix<T> {
		this.data = this.data.map((elem, n) => {
			return callback(this.i(n), this.j(n));
		});
		return this;
	}
}
