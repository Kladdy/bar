import { IRecipe } from "@/common/types";

export interface RecipeCardProps {
  recipe: IRecipe
  onClick: (recipe: IRecipe) => void
}

const RecipeCard : React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:cursor-pointer"
      onClick={() => onClick(recipe)}
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {recipe.name}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50 line-clamp-2`}>
        {recipe.ingredients.map((ingredient) => ingredient.name).join(', ')}
      </p>
    </div>
  );
}

export default RecipeCard;