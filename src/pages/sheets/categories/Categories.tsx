import { Tabs } from '#components';
import { useTabs } from '#hooks';

import { CategoriesAll } from './CategoriesAll';
import { CategoriesUser } from './CategoriesUser';

export const Categories = () => {
  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'User', value: 'user' },
  ];
  const { activeTab, activeIndex } = useTabs(tabs);

  return (
    <section className="categories">
      <Tabs tabs={tabs} active={activeIndex} />

      {activeTab === 'all' && <CategoriesAll />}
      {activeTab === 'user' && <CategoriesUser />}
    </section>
  );
};
