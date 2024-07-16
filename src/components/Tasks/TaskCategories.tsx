interface TaskCategoriesProps {
  categories: string[];
  selectedIndex: number;
  onSelectCategory: (index: number, category: string) => void;
}

export default function TaskCategories(props: TaskCategoriesProps) {
  const categories = props.categories;

  return (
    <div>
      <div className="flex flex-row gap-2">
        {categories.map((category, index) => (
          <>
            {props.selectedIndex === index ? (
              <div className="border-2 border-slate-50 text-slate-50 px-2 rounded-xl"
                key={category}
              >
                {category}
              </div>
            )
              : (
                <button className="bg-green-400 text-slate-900 px-2 rounded-xl"
                  key={category}
                  onClick={() => props.onSelectCategory(index, category)}
                >
                  {category}
                </button>
              )}
          </>
        ))}
      </div>
    </div>
  );
};
