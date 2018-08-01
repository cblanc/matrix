interface MapIncrementerFunction {
	(elem: any, i: number, j:number): number;
}

export const mapIncrementer = (): MapIncrementerFunction => {
	let counter = 0;
	return () => counter++;
};

export const randomInt = (n: number): number => Math.floor(Math.random() * n);

export const mapCoords = (_: any, i:number, j: number): string => `${i},${j}`;
