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

interface DimensionsNotEqualErrorContructor {
	A: Matrix<any>,
	B: Matrix<any>,
};

export class DimensionsNotEqualError extends RangeError {
	constructor(options: DimensionsNotEqualErrorContructor) {
		const { A, B } = options;
		const msg = [
			"Unable to perform operation due to invalid dimensions.",
			"Expected both matrices to be of equal size,",
			`however A is ${A.m} by ${A.n},`,
			`and B is ${B.m} by ${B.n}`
		].join(" ");
		super(msg);
		Object.setPrototypeOf(this, new.target.prototype);
	}
};
