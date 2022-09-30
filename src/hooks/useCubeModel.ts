import { Algorithm, Cube, CubeModel } from 'magic-cubes';
import { useMemo } from 'react';

import { useSettings } from '#providers';
import { ColorScheme } from '#types/cube';

type UseCubeModelProps = {
  scramble?: string | Algorithm;
  solution?: string | Algorithm;
  solve?: string | Algorithm;
  colorScheme?: ColorScheme;
};

const getInverse = (s: string | Algorithm) => {
  return s instanceof Algorithm ? s.inverse : new Algorithm(s).inverse;
};

export const useCubeModel = ({
  scramble,
  solution,
  solve,
  colorScheme,
}: UseCubeModelProps) => {
  const settings = useSettings();

  const cube = useMemo(() => {
    try {
      const cube = new Cube(solution ? getInverse(solution) : scramble);
      if (solve) cube.solve(solve);

      return cube;
    } catch (error) {
      return new Cube(); // Default to a solved cube
    }
  }, [scramble, solution, solve]);

  const model = useMemo(() => {
    return new CubeModel(cube, colorScheme ?? settings.color_scheme);
  }, [cube, colorScheme, settings.color_scheme]);

  return { colors: model.colors() };
};
