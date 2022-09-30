import clsx from 'clsx';
import { Algorithm } from 'magic-cubes';

import { useCubeModel } from '#hooks';
import { ColorScheme } from '#types/cube';

type CubeProps = {
  scramble?: string | Algorithm;
  solution?: string | Algorithm;
  solve?: string | Algorithm;
  colorScheme?: ColorScheme;
  opposite?: boolean;
  big?: boolean;
};

export const Cube = ({
  scramble,
  solution,
  solve,
  colorScheme,
  opposite = false,
  big = false,
}: CubeProps) => {
  const { colors } = useCubeModel({ scramble, solution, solve, colorScheme });

  return (
    <div className={clsx('cube-perspective', big && 'cube-perspective--big')}>
      <div className={clsx('cube', opposite && 'cube--opposite')}>
        {Object.entries(colors).map(([face, colors], i) => (
          <div key={i} className={`cube__face cube__face--${face}`}>
            {colors.map((color, j) => (
              <div
                key={j}
                className={`cube__sticker cube__sticker--${color}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
