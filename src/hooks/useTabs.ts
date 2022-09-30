import { useSearchParams } from 'react-router-dom';

export const useTabs = (tabs: { value: string }[]) => {
  const [searchParams] = useSearchParams();

  const tab = searchParams.get('tab') ?? tabs[0].value;
  const activeIndex = tabs.map((tab) => tab.value).indexOf(tab);

  return {
    activeTab: tabs[activeIndex].value,
    activeIndex,
  };
};
