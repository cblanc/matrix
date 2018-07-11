/**
 * Returns a left padding function
 */
export const padder = (n: number): (s: string) => string => {
	return (s: string): string => {
		while (s.length < n) {
			s = " " + s;
		}
		return s;
	};
};
