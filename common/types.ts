export interface IRecipe {
  id: string,
  name: string
  description: string
  ingredients: IIngredient[]
  steps: IStep[]
  url: string
}

export interface IIngredient {
  id: string
  name: string
  amount: string
  unit: string
}

export interface IStep {
  id: string
  description: string
}

// Make a bunch of mock recipes of drinks
export const mockRecipes: IRecipe[] = [
  {
    id: '1',
    name: 'Sigges Båtsman',
    description: '',
    ingredients: [
      {
        id: '1',
        name: 'vodka',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '2',
        name: 'ananasjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '4',
        name: 'limejuice',
        amount: 'lite',
        unit: '',
      },
      {
        id: '5',
        name: 'is',
        amount: '',
        unit: '',
      },
    ],
    steps: [
      {
        id: '1',
        description: 'Blanda',
      },
      {
        id: '2',
        description: 'Skaka',
      },
      {
        id: '3',
        description: 'Njut',
      },
    ],
    url: '',
  },
  {
    id: '3',
    name: 'Sigges Båtsman',
    description: '',
    ingredients: [
      {
        id: '1',
        name: 'vodka',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '2',
        name: 'ananasjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '4',
        name: 'limejuice',
        amount: 'lite',
        unit: '',
      },
      {
        id: '5',
        name: 'is',
        amount: '',
        unit: '',
      },
    ],
    steps: [
      {
        id: '1',
        description: 'Blanda',
      },
      {
        id: '2',
        description: 'Skaka',
      },
      {
        id: '3',
        description: 'Njut',
      },
    ],
    url: '',
  },
  {
    id: '2',
    name: 'Sigges Båtsman',
    description: '',
    ingredients: [
      {
        id: '1',
        name: 'vodka',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '2',
        name: 'ananasjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'tranbärsjuice',
        amount: '8',
        unit: 'cl',
      },
      {
        id: '4',
        name: 'limejuice',
        amount: 'lite',
        unit: '',
      },
      {
        id: '5',
        name: 'is',
        amount: '',
        unit: '',
      },
    ],
    steps: [
      {
        id: '1',
        description: 'Blanda',
      },
      {
        id: '2',
        description: 'Skaka',
      },
      {
        id: '3',
        description: 'Njut',
      },
    ],
    url: '',
  },
];