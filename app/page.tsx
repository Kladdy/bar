"use client";

import { IData, IRecipe, mockRecipes } from '@/common/types'
import NewRecipeCard from '@/components/NewRecipeCard';
import RecipeCard from '@/components/RecipeCard'
import RecipeModal from '@/components/RecipeModal';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {

  const [openedRecipe, setOpenedRecipe] = useState<IRecipe | null>(null)
  const [isCreatingRecipe, setIsCreatingRecipe] = useState<boolean>(false)
  const [investigatedData, setInvestigatedData] = useState<IData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [recipes, setRecipes] = useState<IRecipe[]>([])

    // Everytime investigatedData changes, check if it is null. If it is, fetch recipes. This also fetches the recipes on page load.
    useEffect(() => {
      if (investigatedData === null) {
        fetchRecipes()
      }

      setIsLoading(false)
    }, [investigatedData])

  const fetchRecipes = () => {
    fetch('/api', {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setRecipes(data)  
        })
        toast.success('Recepten har hämtats.')
      } else {
        toast.error('Något gick fel när recepten skulle hämtas. Försök igen senare.')
      }
    })
  }

  // On page load, check the query parameters. If a query parameter "data" exists, store it and remove the query parameter.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const dataUrlEncoded = urlParams.get('data')
    if (dataUrlEncoded) {
      const data = decodeURIComponent(dataUrlEncoded)

      const parsedData = JSON.parse(data) as IData
      console.log(parsedData)
      if (parsedData) {
        setIsCreatingRecipe(true)
        setOpenedRecipe(parsedData.recipe)
        setInvestigatedData(parsedData)
      }
      urlParams.delete('data')
      // If there are no other url params, dont add the question mark
      if (urlParams.toString() === '') {
        window.history.replaceState({}, '', `${window.location.pathname}`)
      } else {
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)
      }
    }
  }, [])

  return (
    <>
      <Toaster/>
      {openedRecipe && (
        <RecipeModal 
          recipe={openedRecipe} 
          setRecipe={(recipe) =>
            {
              setOpenedRecipe(recipe)
            }
          }
          onClose={() => 
            {
              setOpenedRecipe(null)
            }}
          isNewRecipe={isCreatingRecipe}
          investigatedData={investigatedData}
          setInvestigatedData={setInvestigatedData}
        />
      )}

      <main className="flex min-h-screen flex-col items-center p-6 sm:p-10 lg:p-24">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          bar.
        </h1>
        <h3 className="text-xl font-bold mt-5 mb-5 text-gray-500">
          <a target="_blank" rel="noopener noreferrer" href='https://sigfrid.stjarnholm.com' className='hover:underline'>av Sigfrid Stjärnholm</a>
        </h3>

        {isLoading && (
          <div className="flex flex-col items-center justify-center my-10">
            <div role="status">
              <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Laddar...</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id}
              recipe={recipe}
              onClick={() => {
                setIsCreatingRecipe(false)
                setOpenedRecipe(recipe)
              }}
            />
          ))}
          
        </div>

        {!isLoading && (
          <div className="grid grid-cols-1 mt-10">
            <NewRecipeCard
              onClick={() => {
                setIsCreatingRecipe(true)
                setOpenedRecipe({
                  id: uuidv4(),
                  description: '',
                  name: '',
                  ingredients: [],
                  steps: [],
                  url: '',
                  visible: false,
                })}
              }
            />
          </div>
        )}

        
      </main>
    </>
  )
}
