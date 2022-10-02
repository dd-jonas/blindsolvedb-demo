import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, Button, Card, Cube, Input } from '#components';
import { parseAlgorithm } from '#utils';

type FormValues = {
  algorithm: string;
};

export const Explorer = () => {
  const { register, watch, setValue, setFocus, reset } = useForm<FormValues>({
    defaultValues: { algorithm: '' },
  });

  useEffect(() => setFocus('algorithm'), []);

  const algorithm = watch('algorithm');
  const parsed = useMemo(() => parseAlgorithm(algorithm), [algorithm]);

  const TurnButton = ({ children }: { children: string }) => (
    <Button
      variant="tertiary"
      onClick={() => setValue('algorithm', `${algorithm} ${children}`)}
      small
    >
      {children}
    </Button>
  );

  return (
    <div>
      <Alert warning>
        This page is exclusive to this demo. It is a playground to test the
        algorithm parsing and cube visualisation.
      </Alert>

      <div className="explorer">
        <div className="explorer__cubes">
          {<Cube solve={parsed.algorithm ?? undefined} />}
          {<Cube solve={parsed.algorithm ?? undefined} opposite />}
        </div>

        <Card className="explorer__input">
          <div>
            <Input
              label="Algorithm"
              name="algorithm"
              register={register}
              hideLabel
            />
            <Button variant="tertiary" danger onClick={() => reset()}>
              Clear
            </Button>
          </div>

          <div className="explorer__turns">
            <div className="explorer__turngroup">
              <TurnButton>U</TurnButton>
              <TurnButton>U&apos;</TurnButton>
              <TurnButton>U2</TurnButton>

              <TurnButton>D</TurnButton>
              <TurnButton>D&apos;</TurnButton>
              <TurnButton>D2</TurnButton>

              <TurnButton>F</TurnButton>
              <TurnButton>F&apos;</TurnButton>
              <TurnButton>F2</TurnButton>

              <TurnButton>B</TurnButton>
              <TurnButton>B&apos;</TurnButton>
              <TurnButton>B2</TurnButton>

              <TurnButton>L</TurnButton>
              <TurnButton>L&apos;</TurnButton>
              <TurnButton>L2</TurnButton>

              <TurnButton>R</TurnButton>
              <TurnButton>R&apos;</TurnButton>
              <TurnButton>R2</TurnButton>
            </div>

            <div className="explorer__turngroup">
              <TurnButton>u</TurnButton>
              <TurnButton>u&apos;</TurnButton>
              <TurnButton>u2</TurnButton>

              <TurnButton>d</TurnButton>
              <TurnButton>d&apos;</TurnButton>
              <TurnButton>d2</TurnButton>

              <TurnButton>f</TurnButton>
              <TurnButton>f&apos;</TurnButton>
              <TurnButton>f2</TurnButton>

              <TurnButton>b</TurnButton>
              <TurnButton>b&apos;</TurnButton>
              <TurnButton>b2</TurnButton>

              <TurnButton>l</TurnButton>
              <TurnButton>l&apos;</TurnButton>
              <TurnButton>l2</TurnButton>

              <TurnButton>r</TurnButton>
              <TurnButton>r&apos;</TurnButton>
              <TurnButton>r2</TurnButton>
            </div>

            <div className="explorer__turngroup">
              <TurnButton>M</TurnButton>
              <TurnButton>M&apos;</TurnButton>
              <TurnButton>M2</TurnButton>

              <TurnButton>E</TurnButton>
              <TurnButton>E&apos;</TurnButton>
              <TurnButton>E2</TurnButton>

              <TurnButton>S</TurnButton>
              <TurnButton>S&apos;</TurnButton>
              <TurnButton>S2</TurnButton>
            </div>

            <div className="explorer__turngroup">
              <TurnButton>x</TurnButton>
              <TurnButton>x&apos;</TurnButton>
              <TurnButton>x2</TurnButton>

              <TurnButton>y</TurnButton>
              <TurnButton>y&apos;</TurnButton>
              <TurnButton>y2</TurnButton>

              <TurnButton>z</TurnButton>
              <TurnButton>z&apos;</TurnButton>
              <TurnButton>z2</TurnButton>
            </div>
          </div>
        </Card>

        <Card className="explorer__output">
          <h5>Parsed algorithm</h5>

          {parsed.error && <Alert danger>{parsed.error}</Alert>}

          {parsed.algorithm && (
            <dl>
              <dt>Input</dt>
              <dd>{parsed.algorithm.raw || '-'}</dd>
              <dt>Clean</dt>
              <dd>{parsed.algorithm.clean || '-'}</dd>
              <dt>Inverse</dt>
              <dd>{parsed.algorithm.inverse || '-'}</dd>
              <dt>Rotationless</dt>
              <dd>{parsed.algorithm.rotationless || '-'}</dd>
            </dl>
          )}
        </Card>
      </div>
    </div>
  );
};
