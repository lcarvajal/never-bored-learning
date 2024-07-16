interface TaskCategoriesProps {
  categories: string[];
}

export default function TaskCategories(props: TaskCategoriesProps) {
  const categories = props.categories;

  return (
    <div>
      <div className="flex flex-row gap-2">
        {categories.map((category) => (
          <button className="bg-green-400 text-slate-900 px-2 rounded-xl" key={category}>{category}</button>
        ))}
      </div>
    </div>
  );
};
