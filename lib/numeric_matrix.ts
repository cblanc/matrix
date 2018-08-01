import { GenericMatrix } from "./generic_matrix";
import { 
	add,
	scalarProduct,
	subtract,
} from "./operations";

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
	 * Returns a vector that returns ith row
	 */
	iVector(i: number): RowVector {
		const result = new RowVector(this.n);
		result.data = this.iRow(i);
		return result;
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
