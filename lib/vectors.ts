import { GenericMatrix } from "./generic_matrix";

export class RowVector extends GenericMatrix<number> {
	constructor(n: number) {
		super(1, n);
	}
}

export class ColumnVector extends GenericMatrix<number> {
	constructor(m: number) {
		super(m, 1);
	}
}
