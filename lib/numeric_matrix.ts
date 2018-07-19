import { GenericMatrix } from "./generic_matrix";


export class Matrix extends GenericMatrix<number> {
	constructor(m: number, n: number) {
		super(m, n);
		this.data.fill(0);
	}
}
