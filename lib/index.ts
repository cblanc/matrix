interface FromFunctionIterator<T> {
	(i: number, j: number): T;
}

export class Matrix<T> {
	public _matrix: T[];
	public rows: number;
	public columns: number;

	constructor(rows: number, columns: number, fill?: T) {
		this.rows = rows;
		this.columns = columns;
		this._matrix = new Array(rows * columns).fill(fill);
	}

	/**
	 * Returns m*n size of matrix
	 * @return {number}
	 */
	get size(): number {
		return this.rows * this.columns;
	}

	/**
	 * Creates an empty copy of matrix
	 * @return {Matrix<T>}
	 */
	get new(): Matrix<T> {
		const m = new Matrix<T>(this.rows, this.columns);
		m.matrix = this._matrix.slice(0);

		return m;
	}

	/**
	 * Returns a copy of internal datastructure
	 * @return {T[]}
	 */
	get matrix(): T[] {
		return this._matrix.slice(0);
	}

	/**
	 * Sets underlying data structure
	 * @param {T[]} _matrix
	 */
	set matrix(_matrix: T[]) {
		const { size } = this;
		if (_matrix.length !== this.size) {
			const { rows, columns } = this;
			const msg = [
				`Invalid array size presented`,
				`Expecting ${size} for a ${rows} by ${columns} matrix`,
			].join(". ")
			throw new Error(msg);
		}
		this._matrix = _matrix;
	}

	/**
	 * Returns i (row number) given position n of _matrix
	 * @param  {number} n 
	 * @return {number}
	 */
	private i(n: number): number {
		return Math.floor(n / this.columns);
	}

	/**
	 * Returns j (column number) given position n of _matrix
	 * @param  {number} n 
	 * @return {number}
	 */
	private j(n: number): number {
		return n % this.columns;
	}
	
	/**
	 * Populates a matrix with a function that iterates over i and j
	 * @param  {FromFunctionIterator<T>} callback
	 * @return {Matrix<T>}
	 */
	public fill(callback: FromFunctionIterator<T>): Matrix<T> {
		this._matrix = this._matrix.map((elem, n) => {
			return callback(this.i(n), this.j(n));
		});
		return this;
	}
}
