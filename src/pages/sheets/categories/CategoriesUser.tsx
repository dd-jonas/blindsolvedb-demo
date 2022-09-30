import { Alert, Message, Spinner } from '#components';
import { useUserCategories } from '#services/sheets';

import { CategoryCard } from './CategoryCard';

export const CategoriesUser = () => {
  const query = useUserCategories();

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const categories = query.data;

  if (categories.length === 0) {
    return <Message>Get started by selecting algorithms from a set.</Message>;
  }

  return (
    <section className="category-cards">
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </section>
  );
};
