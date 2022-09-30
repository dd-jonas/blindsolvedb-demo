import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';

import { Button, Checkbox } from '#components';
import { Roles, rolesKey } from '#config/roles';
import { Body } from '#services/profile';
import { Settings } from '#types/api';

type PreferencesFormProps = {
  settings: Settings;
  mutation: UseMutationResult<null, Error, Body>;
};

type FormData = {
  preferences: { showCaseActions: boolean };
};

export const PreferencesForm = ({
  settings,
  mutation,
}: PreferencesFormProps) => {
  const { user } = useAuth0();
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      preferences: { showCaseActions: settings.preferences.showCaseActions },
    },
  });

  const isAdmin: boolean = user?.[rolesKey].includes(Roles.admin);

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset(data);
      },
      onError: () => {
        toast.error('Failed to save preferences');
      },
    });
  });

  return (
    <form
      className="settings-form settings-form--preferences"
      onSubmit={onSubmit}
    >
      {isAdmin && (
        <div>
          <h5>Admin</h5>

          <Checkbox
            name="preferences.showCaseActions"
            label="Show case actions"
            register={register}
          />
        </div>
      )}

      <div className="settings-form__buttons">
        <Button
          variant="secondary"
          onClick={() =>
            reset({
              preferences: {
                showCaseActions: settings.preferences.showCaseActions,
              },
            })
          }
          loading={mutation.isLoading}
          disabled={!formState.isDirty}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={mutation.isLoading}
          disabled={!formState.isDirty}
        >
          Save changes
        </Button>
      </div>
    </form>
  );
};
