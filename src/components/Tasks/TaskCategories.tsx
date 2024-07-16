interface Category {
  name: string;
  description: string;
}

interface TaskCategoriesProps {
  categories: Category[];
  selectedIndex: number;
  onSelectCategory: (index: number) => void;
}

export default function TaskCategories(props: TaskCategoriesProps) {
  const categories = props.categories;

  return (
    <div>
      <div className="flex flex-row gap-2">
        {categories.length > 0 ?
          (categories.map((category, index) => (
            <>
              {props.selectedIndex === index ? (
                <div className="border-2 border-slate-50 text-slate-50 px-2 rounded-xl"
                  key={index}
                >
                  {category.name}
                </div>
              )
                : (
                  <button className="bg-green-500 hover:bg-green-400 text-slate-900 px-2 rounded-xl"
                    key={index}
                    onClick={() => props.onSelectCategory(index)}
                  >
                    {category.name}
                  </button>
                )}
            </>
          ))) : (
            <>
              <p>Loading categories...</p>
            </>
          )
        }
      </div>
    </div>
  );
};
