/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { EllipsisVerticalIcon, ArrowDownIcon, ArrowUpIcon, PlusSmallIcon } from '@heroicons/react/24/solid'
import { IRecipe, IIngredient } from '@/common/types'
import { setFieldOnSpecificListEntry, swapListElements } from '@/common/tools/lists'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import RecipeIngredientUnitSelect from './RecipeIngredientUnitSelect'
import { RecipeIngredientUnits } from './RecipeIngredientUnits'
import { v4 as uuidv4 } from 'uuid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface RecipeIngredientsFeedProps {
  recipe: IRecipe
  onUpdateRecipe: (recipe: IRecipe) => void
  viewOnly?: boolean
}

const RecipeIngredientsFeed: React.FC<RecipeIngredientsFeedProps> = ({ recipe, onUpdateRecipe, viewOnly }) => {
  // use...

  const getDefaultIngredient = (): Partial<IIngredient> => {
    return {
      id: uuidv4(),
    }
  }

  const getIngredientViewOnlyString = (ingredient: IIngredient) => {
    const { amount } = ingredient
    const unit = RecipeIngredientUnits.find((x) => x.code === ingredient.unit)?.code
    const { name } = ingredient
    let stringList = [amount, unit, name]
    stringList = stringList.filter((s) => s)
    return stringList.join(' ')
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {recipe?.ingredients.map((ingredient, ingredientIndex) => (
          <li key={ingredient.id}>
            <div className="relative pb-8">
              {ingredientIndex !== recipe.ingredients.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-500" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white text-white dark:ring-gray-900">
                    {ingredientIndex + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 dark:text-gray-200">
                  {!viewOnly ? (
                    <>
                      <div className="w-full">
                        <div className="-mt-2 flex flex-row flex-1 gap-x-2">
                          <input
                            type="text"
                            id="amount"
                            placeholder={"mängd"}
                            className="flex-none w-20 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                            value={recipe.ingredients[ingredientIndex].amount || ''}
                            onChange={(e) => {
                              const newIngredients = setFieldOnSpecificListEntry(
                                recipe.ingredients,
                                ingredientIndex,
                                'amount',
                                e.target.value,
                              )
                              onUpdateRecipe({ ...recipe, ingredients: newIngredients })
                            }}
                          />
                          <div className="flex-none w-24 ">
                            <RecipeIngredientUnitSelect
                              recipe={recipe}
                              onUpdateRecipe={onUpdateRecipe}
                              ingredientIndex={ingredientIndex}
                            />
                          </div>
                          <input
                            type="text"
                            id="name"
                            placeholder={"namn"}
                            className="flex-1 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                            value={recipe.ingredients[ingredientIndex].name || ''}
                            onChange={(e) => {
                              const newIngredients = setFieldOnSpecificListEntry(
                                recipe.ingredients,
                                ingredientIndex,
                                'name',
                                e.target.value,
                              )
                              onUpdateRecipe({ ...recipe, ingredients: newIngredients })
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <div className="flex-shrink-0 self-center flex">
                          <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                <span className="sr-only">{"öppna alternativ"}</span>
                                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {ingredientIndex !== 0 ? (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          onClick={(e) => {
                                            e.preventDefault()
                                            onUpdateRecipe({
                                              ...recipe,
                                              ingredients: swapListElements(
                                                recipe.ingredients,
                                                ingredientIndex,
                                                ingredientIndex - 1,
                                              ),
                                            })
                                          }}
                                          href="#"
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex px-4 py-2 text-sm',
                                          )}
                                        >
                                          <ArrowUpIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                          <span>{"flytta upp"}</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ) : null}
                                  {ingredientIndex !== recipe.ingredients.length - 1 ? (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          onClick={(e) => {
                                            e.preventDefault()
                                            onUpdateRecipe({
                                              ...recipe,
                                              ingredients: swapListElements(
                                                recipe.ingredients,
                                                ingredientIndex,
                                                ingredientIndex + 1,
                                              ),
                                            })
                                          }}
                                          href="#"
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex px-4 py-2 text-sm',
                                          )}
                                        >
                                          <ArrowDownIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                          <span>{"flytta ner"}</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ) : null}
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        onClick={(e) => {
                                          e.preventDefault()
                                          onUpdateRecipe({
                                            ...recipe,
                                            ingredients: recipe.ingredients.filter((x) => x.id !== ingredient.id),
                                          })
                                        }}
                                        href="#"
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'flex px-4 py-2 text-sm',
                                        )}
                                      >
                                        <TrashIcon className="mr-3 h-5 w-5 text-red-600" aria-hidden="true" />
                                        <span className="text-red-600">
                                          {"ta bort ingrediens"}
                                        </span>
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>{getIngredientViewOnlyString(ingredient)}</>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}

        {!viewOnly && (
          <li key="add-ingredient">
            <div className="relative pb-8 inline-block">
              <button
                type="button"
                className="relative flex space-x-3 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={() =>
                  onUpdateRecipe({
                    ...recipe,
                    ingredients: [...recipe.ingredients, getDefaultIngredient() as IIngredient],
                  })
                }
              >
                <div>
                  <span className="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center">
                    <PlusSmallIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 pr-4">
                  <div>
                    <p className="text-sm text-gray-500">{"lägg till ingrediens"}</p>
                  </div>
                </div>
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default RecipeIngredientsFeed
