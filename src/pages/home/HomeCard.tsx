import { ChevronRightIcon } from '@heroicons/react/solid';
import { ReactNode } from 'react';

import { Card, LinkButton } from '#components';

type HomeCardProps = {
  title: string;
  children: ReactNode;
  link: string;
  icon: ReactNode;
};

export const HomeCard = ({ title, children, link, icon }: HomeCardProps) => {
  return (
    <Card title={title} icon={icon} large>
      <div className="home-card">
        {children}

        <LinkButton to={link} icon={<ChevronRightIcon />}>
          Go to {title.toLowerCase()}
        </LinkButton>
      </div>
    </Card>
  );
};
