import { Algorithm, Cube } from 'magic-cubes';

/**
 * Check if an algorithm solves the cube in a scrambled state.
 */
export const checkScrambleSolution = (
  scramble: string | Algorithm,
  solution: string | Algorithm
) => {
  const cube = new Cube(scramble);
  cube.solve(solution);

  return cube.isSolved;
};

/**
 * Wrapper that creates an Algorithm instance and catches errors.
 */
export const parseAlgorithm = (algorithm: string) => {
  try {
    const parsed = new Algorithm(algorithm);
    return { algorithm: parsed, error: null };
  } catch (error) {
    return {
      algorithm: null,
      error: error instanceof Error ? error.message : 'Failed to parse',
    };
  }
};
