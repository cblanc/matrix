interface MapIncrementerFunction {
	(elem: any, i: number, j:number): number;
}

export const mapIncrementer = (): MapIncrementerFunction => {
	let counter = 0;
	return () => counter++;
};
