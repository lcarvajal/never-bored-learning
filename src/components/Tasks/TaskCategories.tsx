interface TaskCategoriesProps {
  categories: string[];
  selectedIndex: number;
}

export default function TaskCategories(props: TaskCategoriesProps) {
  const categories = props.categories;

  return (
    <div>
      <div className="flex flex-row gap-2">
        {categories.map((category, index) => (
          <>
            {props.selectedIndex === index ? (
              <button className="border-2 border-slate-50 text-slate-50 px-2 rounded-xl" key={category}>{category}</button>
            )
              : (
                <button className="bg-green-400 text-slate-900 px-2 rounded-xl" key={category}>{category}</button>
              )}
          </>
        ))}
      </div>
    </div>
  );
};
