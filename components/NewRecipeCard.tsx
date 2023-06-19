import { IRecipe } from "@/common/types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

export interface NewRecipeCardProps {
  onClick: () => void
}

const NewRecipeCard : React.FC<NewRecipeCardProps> = ({ onClick }) => {
  return (
    <div
      className="group rounded-lg border px-5 py-4 transition-colors border-gray-400 dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:cursor-pointer"
      onClick={() => onClick()}
    >
      <h2 className={`mb-3 text-2xl font-semibold flex items-center gap-x-2 `}>
        {'Lägg till recept'}{' '}
        <span className="inline-block ">
          <PlusIcon className="w-6 h-6 font-extrabold dark:text-white" />
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50 line-clamp-2`}>
        {'Föreslå ett nytt recept genom att skapa det här!'}
      </p>
    </div>
  );
}

export default NewRecipeCard;