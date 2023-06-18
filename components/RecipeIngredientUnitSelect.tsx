/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { IRecipe } from '@/common/types'
import { setFieldOnSpecificListEntry } from '@/common/tools/lists'
import { RecipeIngredientUnits } from './RecipeIngredientUnits'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface RecipeIngredientUnitSelectProps {
  recipe: IRecipe
  onUpdateRecipe: (recipe: IRecipe) => void
  ingredientIndex: number
}

const RecipeIngredientUnitSelect: React.FC<RecipeIngredientUnitSelectProps> = ({
  recipe,
  onUpdateRecipe,
  ingredientIndex,
}) => {

  return (
    <Listbox
      value={RecipeIngredientUnits.find((x) => x.code === recipe.ingredients[ingredientIndex].unit)}
      onChange={(e) => {
        const newIngredients = setFieldOnSpecificListEntry(
          recipe.ingredients,
          ingredientIndex,
          'unit',
          e?.code as string,
        )
        onUpdateRecipe({ ...recipe, ingredients: newIngredients })
      }}
    >
      {({ open }) => (
        <div className="relative w-full">
          <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span
              className={classNames(
                recipe.ingredients[ingredientIndex].unit && recipe.ingredients[ingredientIndex].unit !== 'none'
                  ? ''
                  : 'text-gray-500',
                'block truncate',
              )}
            >
              {recipe.ingredients[ingredientIndex].unit && recipe.ingredients[ingredientIndex].unit !== 'none'
                ? RecipeIngredientUnits.find((x) => x.code === recipe.ingredients[ingredientIndex].unit)?.code

                : "enhet"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {RecipeIngredientUnits.filter((x) => !x.hidden).map((unit) => (
                <Listbox.Option
                  key={unit.code}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9',
                    )
                  }
                  value={unit}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {unit.code}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

export default RecipeIngredientUnitSelect
