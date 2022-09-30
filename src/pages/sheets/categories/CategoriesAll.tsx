import { Alert, Spinner } from '#components';
import { useCategories } from '#services/sheets';

import { CategoryCard } from './CategoryCard';

export const CategoriesAll = () => {
  const query = useCategories();

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const categories = query.data;

  return (
    <section className="category-cards">
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </section>
  );
};
