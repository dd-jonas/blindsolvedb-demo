import { useAuth0 } from '@auth0/auth0-react';
import {
  AdjustmentsIcon,
  ColorSwatchIcon,
  CubeIcon,
} from '@heroicons/react/outline';

import { Card } from '#components';
import { Roles, rolesKey } from '#config/roles';
import { useSettings } from '#providers';
import { useUpdateSettings } from '#services/profile';

import { ColorSchemeForm } from './ColorSchemeForm';
import { LetteringSchemeForm } from './LetteringSchemeForm';
import { PreferencesForm } from './PreferencesForm';

export const Settings = () => {
  const { user } = useAuth0();
  const settings = useSettings();
  const mutation = useUpdateSettings();

  // When more preferences are added for non-admins, this check won't be necessary
  const isAdmin: boolean = user?.[rolesKey].includes(Roles.admin);

  return (
    <div className="settings">
      {isAdmin && (
        <Card title="Preferences" icon={<AdjustmentsIcon />} large>
          <PreferencesForm settings={settings} mutation={mutation} />
        </Card>
      )}

      <Card title="Color scheme" icon={<ColorSwatchIcon />} large>
        <ColorSchemeForm settings={settings} mutation={mutation} />
      </Card>

      <Card title="Lettering scheme" icon={<CubeIcon />} large>
        <LetteringSchemeForm settings={settings} mutation={mutation} />
      </Card>
    </div>
  );
};
