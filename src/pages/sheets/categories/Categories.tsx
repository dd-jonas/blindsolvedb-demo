import { useAuth0 } from '@auth0/auth0-react';

import { LoginMessage, Tabs } from '#components';
import { useTabs } from '#hooks';

import { CategoriesAll } from './CategoriesAll';
import { CategoriesUser } from './CategoriesUser';

export const Categories = () => {
  const { isAuthenticated } = useAuth0();

  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'User', value: 'user' },
  ];
  const { activeTab, activeIndex } = useTabs(tabs);

  return (
    <section className="categories">
      <Tabs tabs={tabs} active={activeIndex} />
      {activeTab === 'all' && <CategoriesAll />}

      {activeTab === 'user' &&
        (isAuthenticated ? (
          <CategoriesUser />
        ) : (
          <LoginMessage>Log in to track your sets.</LoginMessage>
        ))}
    </section>
  );
};
