import { useForm } from 'react-hook-form';

import { Button, Checkbox, Cube, Select } from '#components';
import { colors } from '#config/cube';
import { useSettings } from '#providers';
import { Settings } from '#types/api';
import { Face } from '#types/cube';

const options = Object.entries(colors).map(([label, value]) => ({
  label,
  value,
}));

type FormData = {
  color_scheme: Settings['color_scheme'];
  preferences: { colorTableHeaders: boolean };
};

export const ColorSchemeForm = () => {
  const { preferences, color_scheme, updateSettings } = useSettings();

  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      color_scheme: { ...color_scheme },
      preferences: { colorTableHeaders: preferences.colorTableHeaders },
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateSettings(data);
    reset(data);
  });

  const rotate = (axis: 'x' | 'y' | 'z') => () => {
    const {
      color_scheme: { U, D, F, B, L, R },
    } = getValues();

    switch (axis) {
      case 'x':
        setValue('color_scheme.U', F, { shouldDirty: true });
        setValue('color_scheme.F', D, { shouldDirty: true });
        setValue('color_scheme.D', B, { shouldDirty: true });
        setValue('color_scheme.B', U, { shouldDirty: true });
        break;
      case 'y':
        setValue('color_scheme.F', R, { shouldDirty: true });
        setValue('color_scheme.R', B, { shouldDirty: true });
        setValue('color_scheme.B', L, { shouldDirty: true });
        setValue('color_scheme.L', F, { shouldDirty: true });
        break;
      case 'z':
        setValue('color_scheme.U', L, { shouldDirty: true });
        setValue('color_scheme.L', D, { shouldDirty: true });
        setValue('color_scheme.D', R, { shouldDirty: true });
        setValue('color_scheme.R', U, { shouldDirty: true });
        break;
    }
  };

  const currentColors = {
    U: watch('color_scheme.U'),
    D: watch('color_scheme.D'),
    F: watch('color_scheme.F'),
    B: watch('color_scheme.B'),
    L: watch('color_scheme.L'),
    R: watch('color_scheme.R'),
  };

  return (
    <form
      className="settings-form settings-form--color-scheme"
      onSubmit={onSubmit}
    >
      <div className="settings-form__cubes">
        <Cube colorScheme={currentColors} />
        <Cube colorScheme={currentColors} opposite />
      </div>

      <div>
        <h5>Colors</h5>

        <div className="settings-form__colors">
          {(['Up', 'Down', 'Front', 'Back', 'Left', 'Right'] as const).map(
            (face) => (
              <Select
                key={face}
                name={`color_scheme.${face[0] as Face}`}
                label={face}
                options={options}
                register={register}
              />
            )
          )}
        </div>
      </div>

      <div className="settings-form__rotate">
        <h5>Rotate</h5>

        <div>
          {(['x', 'y', 'z'] as const).map((rotation) => (
            <Button
              key={rotation}
              variant="tertiary"
              onClick={rotate(rotation)}
              small
            >
              {rotation}
            </Button>
          ))}
        </div>
      </div>

      <Checkbox
        name="preferences.colorTableHeaders"
        label="Color table headers"
        register={register}
      />

      <div className="settings-form__buttons">
        <Button
          variant="secondary"
          onClick={() =>
            reset({
              color_scheme: { ...color_scheme },
              preferences: {
                colorTableHeaders: preferences.colorTableHeaders,
              },
            })
          }
          disabled={!formState.isDirty}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!formState.isDirty}>
          Save changes
        </Button>
      </div>
    </form>
  );
};
