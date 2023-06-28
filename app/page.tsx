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

  const [recipes, setRecipes] = useState<IRecipe[]>([])

    // Everytime investigatedData changes, check if it is null. If it is, fetch recipes. This also fetches the recipes on page load.
    useEffect(() => {
      if (investigatedData === null) {
        fetchRecipes()
      }
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

        
      </main>
    </>
  )
}
