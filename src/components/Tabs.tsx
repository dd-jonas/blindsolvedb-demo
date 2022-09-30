import clsx from 'clsx';
import { ReactNode } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { LinkButton } from '#components';

type TabsProps = {
  tabs: {
    label: string;
    value: string;
    icon?: ReactNode;
  }[];
  active: number;
  replace?: boolean;
};

export const Tabs = ({ tabs, active, replace }: TabsProps) => {
  return (
    <ScrollContainer className="tabs" vertical={false} hideScrollbars={false}>
      {tabs.map(({ label, value, icon }, i) => (
        <LinkButton
          key={value}
          to={{ search: `tab=${value}` }}
          replace={replace}
          variant="tertiary"
          small
          icon={icon}
          className={clsx(
            'tabs__button',
            i === active && 'tabs__button--active'
          )}
        >
          {label}
        </LinkButton>
      ))}
    </ScrollContainer>
  );
};
