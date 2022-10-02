import { SetHeader, Tabs } from '#components';
import { useTabs } from '#hooks';

import { useSetContext } from '../SetContext';
import { SetPopular } from './SetPopular';
import { SetUser } from './SetUser';

export const Set = () => {
  const set = useSetContext();

  const tabs = [
    { label: 'Popular', value: 'popular' },
    { label: 'User', value: 'user' },
  ];

  const { activeTab, activeIndex } = useTabs(tabs);

  return (
    <section className="set">
      <SetHeader
        title={set.name}
        returnTo={{
          pathname: '/sheets',
          search: activeTab === 'user' ? 'tab=user' : '',
        }}
      />

      <Tabs tabs={tabs} active={activeIndex} />

      {activeTab === 'popular' && <SetPopular set={set} />}
      {activeTab === 'user' && <SetUser set={set} />}
    </section>
  );
};
