import { GenericMatrix } from "./generic_matrix";
import { add, subtract } from "./operations";

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
}
