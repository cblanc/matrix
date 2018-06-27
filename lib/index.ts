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
		if (_matrix.length !== this.size) {
			throw new Error(`Invalid array size presented. Expecting ${this.size} for a ${this.rows} by ${this.columns} matrix`);
		}
		this._matrix = _matrix;
	}
}

