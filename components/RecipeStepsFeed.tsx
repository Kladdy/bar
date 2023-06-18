/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { EllipsisVerticalIcon, ArrowDownIcon, ArrowUpIcon, PlusSmallIcon } from '@heroicons/react/24/solid'
import { IRecipe, IStep } from '@/common/types'
import { setFieldOnSpecificListEntry, swapListElements } from '@/common/tools/lists'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid'
import TextareaAutosize from 'react-textarea-autosize'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface RecipeStepsFeedProps {
  recipe: IRecipe
  onUpdateRecipe: (recipe: IRecipe) => void
  viewOnly?: boolean
}

const RecipeStepsFeed: React.FC<RecipeStepsFeedProps> = ({ recipe, onUpdateRecipe, viewOnly }) => {
  // use...

  const getDefaultStep = (): Partial<IStep> => {
    return {
      id: uuidv4(),
    }
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {recipe?.steps.map((step, stepIndex) => (
          <li key={step.id}>
            <div className="relative pb-8">
              {stepIndex !== recipe.steps.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white text-white">
                    {stepIndex + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  {!viewOnly ? (
                    <>
                      <div className="w-full">
                        <div className="-mt-2">
                          <TextareaAutosize
                            id={`step-${step.id}`}
                            minRows={1}
                            className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            value={recipe.steps[stepIndex].description || ''}
                            onChange={(e) => {
                              const newSteps = setFieldOnSpecificListEntry(
                                recipe.steps,
                                stepIndex,
                                'description',
                                e.target.value,
                              )
                              onUpdateRecipe({ ...recipe, steps: newSteps })
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
                                  {stepIndex !== 0 ? (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          onClick={(e) => {
                                            e.preventDefault()
                                            onUpdateRecipe({
                                              ...recipe,
                                              steps: swapListElements(recipe.steps, stepIndex, stepIndex - 1),
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
                                  {stepIndex !== recipe.steps.length - 1 ? (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          onClick={(e) => {
                                            e.preventDefault()
                                            onUpdateRecipe({
                                              ...recipe,
                                              steps: swapListElements(recipe.steps, stepIndex, stepIndex + 1),
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
                                            steps: recipe.steps.filter((x) => x.id !== step.id),
                                          })
                                        }}
                                        href="#"
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'flex px-4 py-2 text-sm',
                                        )}
                                      >
                                        <TrashIcon className="mr-3 h-5 w-5 text-red-600" aria-hidden="true" />
                                        <span className="text-red-600">{"ta bort steg"}</span>
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
                    <div>{step.description}</div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}

        {!viewOnly && (
          <li key="add-step">
            <div className="relative pb-8 inline-block">
              <button
                type="button"
                className="relative flex space-x-3 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={() => onUpdateRecipe({ ...recipe, steps: [...recipe.steps, getDefaultStep() as IStep] })}
              >
                <div>
                  <span className="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center">
                    <PlusSmallIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 pr-4">
                  <div>
                    <p className="text-sm text-gray-500">{"lägg till steg"}</p>
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

export default RecipeStepsFeed
