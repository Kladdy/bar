import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BeakerIcon, CheckIcon } from '@heroicons/react/24/outline'
import { IRecipe } from '@/common/types'
import RecipeIngredientsFeed from './RecipeIngredientsFeed'
import RecipeStepsFeed from './RecipeStepsFeed'
import toast from 'react-hot-toast'

interface RecipeModalProps {
  recipe: IRecipe
  setRecipe: (recipe: IRecipe) => void
  onClose: () => void
}

const RecipeModal : React.FC<RecipeModalProps> = ({recipe, setRecipe, onClose}) => {

  return (
    <Transition.Root show={recipe == null ? false : true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <BeakerIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200">
                      {recipe.name}
                    </Dialog.Title>
                    
                  </div>
                </div>
                <div className="mt-2 text-gray-800 dark:text-gray-200 text-sm">
                  <h5 className="font-semibold mt-6 mb-4 ">Ingredienser</h5>
                  <RecipeIngredientsFeed 
                    recipe={recipe}
                    onUpdateRecipe={(recipe) => setRecipe(recipe)} 
                    viewOnly={true}
                  />

                  <h5 className="font-semibold mt-6 mb-4">Steg</h5>
                  <RecipeStepsFeed
                    recipe={recipe}
                    onUpdateRecipe={(recipe) => setRecipe(recipe)}
                    viewOnly={true}
                  />
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800  px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 sm:col-start-1 sm:mt-0"
                    onClick={() => onClose()}
                  >
                    Stäng
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default RecipeModal