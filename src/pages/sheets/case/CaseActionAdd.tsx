import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert, Button, Card, Cube, Input } from '#components';
import { useDebounce } from '#hooks';
import { useAddAlgorithm } from '#services/sheets';
import { checkScrambleSolution, parseAlgorithm } from '#utils';

type FormValues = {
  algorithm: string;
};

type CaseActionAddProps = {
  slug: string;
  scramble: string;
  close: () => void;
};

export const CaseActionAdd = ({
  slug,
  scramble,
  close,
}: CaseActionAddProps) => {
  const mutation = useAddAlgorithm(slug);
  const { register, handleSubmit, watch, setValue, setFocus } =
    useForm<FormValues>({
      defaultValues: { algorithm: '' },
    });

  useEffect(() => setFocus('algorithm'), []);

  // Live algorithm preview
  const algorithm = watch('algorithm');
  const debounced = useDebounce(algorithm, 500);
  const parsed = useMemo(() => parseAlgorithm(debounced), [debounced]);

  // Track errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [algorithm]);

  // Invert input
  const invert = () => {
    const parsed = parseAlgorithm(algorithm);

    if (parsed.error !== null) {
      return setError(parsed.error);
    }

    const inverse = parsed.algorithm.inverse;
    setValue('algorithm', inverse);
  };

  // Validate and submit
  const onSubmit: SubmitHandler<FormValues> = ({ algorithm }) => {
    if (mutation.isLoading) return;
    if (!algorithm.trim()) return close();

    const parsed = parseAlgorithm(algorithm);

    if (parsed.error !== null) {
      return setError(parsed.error);
    }

    if (!checkScrambleSolution(scramble, parsed.algorithm)) {
      return setError('Algorithm is not correct');
    }

    setError(null);

    mutation.mutate(
      { algorithm },
      {
        onSuccess: () => close(),
        onError: (error) => setError(error.message),
      }
    );
  };

  return (
    <Card className="case-action case-action--add add-algorithm">
      {parsed && (
        <div
          className={clsx(
            'add-algorithm__cubes',
            (algorithm !== debounced || parsed.error) &&
              'add-algorithm__cubes--waiting'
          )}
        >
          {<Cube scramble={scramble} solve={parsed.algorithm ?? undefined} />}
          {
            <Cube
              scramble={scramble}
              solve={parsed.algorithm ?? undefined}
              opposite
            />
          }
        </div>
      )}

      <form className="add-algorithm__form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="New algorithm"
          description="Only add an algorithm if the one you use is missing from the list."
          name="algorithm"
          register={register}
          hideLabel
        />

        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>

        <Button variant="primary" type="submit" loading={mutation.isLoading}>
          Add
        </Button>
      </form>

      <Button variant="tertiary" onClick={invert} small>
        Invert
      </Button>

      {error && <Alert danger>{error}</Alert>}
    </Card>
  );
};
