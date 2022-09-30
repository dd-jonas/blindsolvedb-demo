import { Tabs } from '#components';
import { useTabs } from '#hooks';

import { Reports } from './Reports';

export const Admin = () => {
  const tabs = [{ label: 'Reports', value: 'reports' }];
  const { activeTab, activeIndex } = useTabs(tabs);

  return (
    <section className="admin">
      <Tabs tabs={tabs} active={activeIndex} />
      {activeTab === 'reports' && <Reports />}
    </section>
  );
};
