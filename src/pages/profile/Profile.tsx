import { Tabs } from '#components';
import { useTabs } from '#hooks';

import { Account } from './account/Account';
import { Settings } from './settings/Settings';

export const Profile = () => {
  const tabs = [
    { label: 'Settings', value: 'settings' },
    { label: 'Account', value: 'account' },
  ];
  const { activeTab, activeIndex } = useTabs(tabs);

  return (
    <section className="profile">
      <Tabs tabs={tabs} active={activeIndex} />
      {activeTab === 'settings' && <Settings />}
      {activeTab === 'account' && <Account />}
    </section>
  );
};
