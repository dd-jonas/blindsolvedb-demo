import ScrollContainer from 'react-indiana-drag-scroll';
import { useSearchParams } from 'react-router-dom';

import { Card, Cube, LinkButton } from '#components';
import { Category } from '#types/api';

type CategoryCardProps = { category: Category };

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const [searchParams] = useSearchParams();
  const fromUser = searchParams.get('tab') === 'user';

  return (
    <Card className="category-card">
      <div className="category-card__cube">
        <Cube scramble={category.display_scramble} />
      </div>

      <h2 className="category-card__name">{category.name}</h2>

      <ScrollContainer
        className="category-card__sets"
        vertical={false}
        hideScrollbars={false}
      >
        {category.sets.map((set) => (
          <LinkButton
            key={set.slug}
            to={{ pathname: set.slug, search: fromUser ? 'tab=user' : '' }}
            className="category-card__set"
            disabled={set.disabled}
          >
            {set.name}
          </LinkButton>
        ))}
      </ScrollContainer>
    </Card>
  );
};
