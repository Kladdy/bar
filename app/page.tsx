"use client";

import { IRecipe, mockRecipes } from '@/common/types'
import RecipeCard from '@/components/RecipeCard'
import RecipeModal from '@/components/RecipeModal';
import Image from 'next/image'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {

  const [openedRecipe, setOpenedRecipe] = useState<IRecipe | null>(null)


  const recipes: IRecipe[] = mockRecipes;

  return (
    <>
      <Toaster/>
      {openedRecipe && (
        <RecipeModal 
          recipe={openedRecipe} 
          onClose={() => 
            {
              toast.success('Closed')
              setOpenedRecipe(null)
            }}
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
                toast.success('Opened')
                setOpenedRecipe(recipe)
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}
