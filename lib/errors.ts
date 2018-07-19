import { Matrix } from "./index";

interface OutOfBoundsErrorConstructor {
	M: Matrix<any>, // Should use unkownn type when this is available in TS 3.0
	i?: number,
	j?: number,
};

export class OutOfBoundsError extends RangeError {
	public matrix: Matrix<any>;

	constructor(options: OutOfBoundsErrorConstructor) {
		const { M, i, j } = options;
		const { m, n } = M;
		let msg: string;
		if (i !== undefined) {
			msg = `Cannot access i=${i} of a ${m}x${n} matrix`;
		} else if (j !== undefined) {
			msg = `Cannot access j=${j} of a ${m}x${n} matrix`;
		} else {
			msg = `Attempted to access an out of bounds element on a ${m}x${n} matrix`;
		}
		super(msg);
		Object.setPrototypeOf(this, new.target.prototype);
		this.matrix = M;
	}	
}
