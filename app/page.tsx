"use client";

import { IRecipe, mockRecipes } from '@/common/types'
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

  const [recipes, setRecipes] = useState<IRecipe[]>([])

  useEffect(() => {
    fetchRecipes()
  }, [])

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
        />
      )}

      <main className="flex min-h-screen flex-col items-center p-24">
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
