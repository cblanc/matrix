import { GenericMatrix } from "./generic_matrix";
import { 
	add,
	dotProduct,
	multiply,
	scalarProduct,
	subtract,
} from "./operations";

const range = (start: number, end: number): number[] => {
	const result = [];
	for (let i = start; i < end; i++) result.push(i);
	return result;
};

export class Matrix extends GenericMatrix<number> {
	constructor(m: number, n: number) {
		super(m, n);
		this.data.fill(0);
	}

	add(M: Matrix): Matrix {
		return add(this, M);
	}

	subtract(M: Matrix): Matrix {
		return subtract(this, M);
	}

	scale(n: number): Matrix {
		return scalarProduct(this, n);
	}

	/**
	 * Returns a vector that represents ith row
	 */
	iVector(i: number): RowVector {
		const result = new RowVector(this.n);
		result.data = this.iRow(i);
		return result;
	}

	/**
	 * Returns all iVectors
	 */
	get iVectors(): RowVector[] {
		return range(0, this.m).map(i => this.iVector(i));
	}

	/**
	 * Returns a vector that represents jth column
	 */
	jVector(j: number): ColumnVector {
		const result = new ColumnVector(this.m);
		result.data = this.jCol(j);
		return result;
	}

	/**
	 * Returns all jVectors
	 */
	get jVectors(): ColumnVector[] {
		return range(0, this.n).map(j => this.jVector(j));
	}

	multiply(B: Matrix): Matrix {
		return multiply(this, B);
	}
}

export class RowVector extends Matrix {
	constructor(n: number) {
		super(1, n);
	}

	clone() {
		const m = new (this.constructor as any)(this.n);
		m.matrix = this.data.slice(0);
		return m;
	}

	dot(columnVector: ColumnVector): number {
		return dotProduct(this, columnVector);
	}
}

export class ColumnVector extends Matrix {
	constructor(m: number) {
		super(m, 1);
	}

	clone() {
		const m = new (this.constructor as any)(this.m);
		m.matrix = this.data.slice(0);
		return m;
	}
}
