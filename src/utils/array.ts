/**
 * Split an array in equal chunks. (The last chunk will contain the remaining elements.)
 */
export const chunk = <T>(array: T[], chunkSize: number): T[][] => {
  const chunked = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunked.push(array.slice(i, i + chunkSize));
  }

  return chunked;
};

/**
 * Transpose a 2-dimensional array
 */
export const transpose = <T>(arr: T[][]): T[][] => {
  if (arr.length === 0 || !arr.every((item) => Array.isArray(item))) return arr;

  return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
};

/**
 * Randomly shuffle an array using Durstenfeld's algrotihm.
 */
export const shuffle = <T>(array: T[]) => {
  if (!Array.isArray(array)) {
    throw new TypeError(`Expected an array, got ${typeof array}`);
  }

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[newIndex]] = [shuffled[newIndex], shuffled[i]];
  }

  return shuffled;
};

/**
 * Create an array from the input if it is not already an array
 */
export const mapToArray = <T>(input: T | T[]): T[] => {
  return Array.isArray(input) ? input : [input];
};
