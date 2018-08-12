import { GenericMatrix } from "./generic_matrix";
import { Matrix } from "./numeric_matrix";

interface OutOfBoundsErrorConstructor {
	M: GenericMatrix<any>, // Should use unkownn type when this is available in TS 3.0
	i?: number,
	j?: number,
};

export class OutOfBoundsError extends RangeError {
	public matrix: GenericMatrix<any>;

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
	A: GenericMatrix<any>,
	B: GenericMatrix<any>,
};

export class DimensionsNotEqualError extends RangeError {
	constructor(options: DimensionsNotEqualErrorContructor) {
		const { A, B } = options;
		const msg = [
			"Unable to perform operation due to invalid dimensions.",
			"Expected both matrices to be of equal size,",
			`however one is ${A.m} by ${A.n},`,
			`and the other is ${B.m} by ${B.n}`
		].join(" ");
		super(msg);
		Object.setPrototypeOf(this, new.target.prototype);
	}
};

interface DimensonsIncompatibleErrorContructor {
	A: Matrix,
	B: Matrix,
}

export class DimensionsIncompatibleError extends RangeError {
	constructor(options: DimensonsIncompatibleErrorContructor) {
		const { A, B } = options;
		const msg = [
			"Unable to perform product operation due to invalid dimensions.",
		];
		if (A.m !== B.n) msg.push(`m(=${A.m}) of \n\n${A}\n\n does not equal n(=${B.n}) of \n\n${B}\n\n`);
		if (A.n !== B.m) msg.push(`n(=${A.n}) of \n\n${A}\n\n does not equal m(=${B.m}) of \n\n${B}\n\n`);
		super(msg.join(" "));
		Object.setPrototypeOf(this, new.target.prototype);
	}
};

export class InvalidArraySizeError<T> extends RangeError {
	constructor(A: GenericMatrix<T>) {
		const msg = [
			"Invalid array size presented.",
			`Expecting ${A.size} for a ${A.m} by ${A.n} matrix.`,
		];
		super(msg.join(" "));
		Object.setPrototypeOf(this, new.target.prototype);
	}
}