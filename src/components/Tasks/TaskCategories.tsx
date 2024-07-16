interface TaskCategoriesProps {
  categories: string[];
}

export default function TaskCategories(props: TaskCategoriesProps) {
  const categories = props.categories;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};
