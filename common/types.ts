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
    name: 'Mojito',
    description: 'En uppfriskande cocktail med en antydan av mynta och lime',
    ingredients: [
      {
        id: '1',
        name: 'Vit rom',
        amount: '60',
        unit: 'cl',
      },
      {
        id: '2',
        name: 'Färsk limejuice',
        amount: '30',
        unit: 'cl',
      },
      {
        id: '3',
        name: 'Enkel sirap',
        amount: '2',
        unit: 'cl',
      },
      {
        id: '4',
        name: 'Färska myntablad',
        amount: '8-10',
        unit: 'blad',
      },
      {
        id: '5',
        name: 'Sodavatten',
        amount: '60',
        unit: 'cl',
      },
      {
        id: '6',
        name: 'Krossad is',
        amount: 'efter behov',
        unit: '-',
      },
    ],
    steps: [
      {
        id: '1',
        description: 'Muddla myntabladen med limejuice och enkel sirap i ett glas.',
      },
      {
        id: '2',
        description: 'Tillsätt rom och krossad is, och rör om väl.',
      },
      {
        id: '3',
        description: 'Toppa med sodavatten och garnera med myntablad och en limeklyfta.',
      },
      {
        id: '4',
        description: 'Servera kyld och njut!',
      },
    ],
    url: 'https://www.example.com/mojito',
  },
  {
    id: '2',
    name: 'Piña Colada',
    description: 'En tropisk cocktail med smak av ananas och kokos',
    ingredients: [
      {
        id: '7',
        name: 'Vit rom',
        amount: '60',
        unit: 'cl',
      },
      {
        id: '8',
        name: 'Ananasjuice',
        amount: '120',
        unit: 'cl',
      },
      {
        id: '9',
        name: 'Kokoskräm',
        amount: '60',
        unit: 'cl',
      },
      {
        id: '10',
        name: 'Krossad is',
        amount: 'efter behov',
        unit: '-',
      },
      {
        id: '11',
        name: 'Ananasbit',
        amount: '1',
        unit: 'st',
      },
      {
        id: '12',
        name: 'Maraschino-körsbär',
        amount: '1',
        unit: 'st',
      },
    ],
    steps: [
      {
        id: '5',
        description: 'Blanda rom, ananasjuice, kokoskräm och krossad is i en mixer.',
      },
      {
        id: '6',
        description: 'Häll upp i ett glas och garnera med en ananasbit och körsbär.',
      },
      {
        id: '7',
        description: 'Servera kyld och njut!',
      },
    ],
    url: 'https://www.example.com/pina-colada',
  },
  {
    id: '3',
    name: 'Margarita',
    description: 'En klassisk tequilabaserad cocktail med en syrlig twist av lime',
    ingredients: [
      {
        id: '13',
        name: 'Tequila',
        amount: '60',
        unit: 'cl',
      },
      {
        id: '14',
        name: 'Färsk limejuice',
        amount: '30',
        unit: 'cl',
      },
      {
        id: '15',
        name: 'Triple sec',
        amount: '30',
        unit: 'cl',
      },
      {
        id: '16',
        name: 'Salt',
        amount: 'efter behov',
        unit: '-',
      },
      {
        id: '17',
        name: 'Limeklyfta',
        amount: '1',
        unit: 'st',
      },
      {
        id: '24',
        name: 'Krossad is',
        amount: 'efter behov',
        unit: '-',
      },
    ],
    steps: [
      {
        id: '8',
        description: 'Doppa glasets kant i salt genom att gnida en limeklyfta längs kanten och doppa den i saltet.',
      },
      {
        id: '9',
        description: 'I en shaker, kombinera tequila, limejuice och triple sec med is.',
      },
      {
        id: '10',
        description: 'Skaka ordentligt och sila över i det förberedda glaset fyllt med krossad is.',
      },
      {
        id: '11',
        description: 'Servera kyld och njut!',
      },
    ],
    url: 'https://www.example.com/margarita',
  },
  {
    id: '4',
    name: 'Moscow Mule',
    description: 'En uppfriskande vodka-baserad cocktail med en kick av ingefära och lime',
    ingredients: [
      {
        id: '18',
        name: 'Vodka',
        amount: '60',
        unit: 'cl',
      },
      {
        id: '19',
        name: 'Färsk limejuice',
        amount: '15',
        unit: 'cl',
      },
      {
        id: '20',
        name: 'Ingefärsöl',
        amount: '120',
        unit: 'cl',
      },
      {
        id: '21',
        name: 'Limeklyfta',
        amount: '1',
        unit: 'st',
      },
      {
        id: '22',
        name: 'Krossad is',
        amount: 'efter behov',
        unit: '-',
      },
      {
        id: '23',
        name: 'Myntakvist',
        amount: '1',
        unit: 'st',
      },
    ],
    steps: [
      {
        id: '12',
        description: 'I en kopparmugg, pressa limejuice över isen.',
      },
      {
        id: '13',
        description: 'Häll vodka och ingefärsöl i kopparmuggen och rör om väl.',
      },
      {
        id: '14',
        description: 'Garnera med en limeklyfta och ett myntakvist.',
      },
      {
        id: '15',
        description: 'Servera kyld och njut!',
      },
    ],
    url: 'https://www.example.com/moscow-mule',
  },
];