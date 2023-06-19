export const UNIT_TYPE_LENGTH = 'LENGTH'
export const UNIT_TYPE_AREA = 'AREA'
export const UNIT_TYPE_VOLUME = 'VOLUME'
export const UNIT_TYPE_MASS = 'MASS'
export const UNIT_TYPE_TIME = 'TIME'
export const UNIT_TYPE_COUNT = 'COUNT'
export const UNIT_TYPE_OTHER = 'OTHER'

export type UnitType =
  | typeof UNIT_TYPE_LENGTH
  | typeof UNIT_TYPE_AREA
  | typeof UNIT_TYPE_VOLUME
  | typeof UNIT_TYPE_MASS
  | typeof UNIT_TYPE_TIME
  | typeof UNIT_TYPE_COUNT
  | typeof UNIT_TYPE_OTHER

export interface RecipeIngredientUnit {
  code: string
  type: UnitType
  hidden?: boolean
}

export const RecipeIngredientUnits: RecipeIngredientUnit[] = [
  // { code: '', type:  UNIT_TYPE_OTHER },
  { code: '-', type: UNIT_TYPE_OTHER },

  { code: 'mm3', type: UNIT_TYPE_VOLUME, hidden: true },
  { code: 'cm3', type: UNIT_TYPE_VOLUME, hidden: true },
  { code: 'dm3', type: UNIT_TYPE_VOLUME, hidden: true },
  { code: 'm3', type: UNIT_TYPE_VOLUME, hidden: true },
  { code: 'ml', type: UNIT_TYPE_VOLUME },
  { code: 'cl', type: UNIT_TYPE_VOLUME },
  { code: 'dl', type: UNIT_TYPE_VOLUME },
  { code: 'l', type: UNIT_TYPE_VOLUME },

  { code: 'mm2', type: UNIT_TYPE_AREA },
  { code: 'cm2', type: UNIT_TYPE_AREA },
  { code: 'dm2', type: UNIT_TYPE_AREA },
  { code: 'm2', type: UNIT_TYPE_AREA },

  { code: 'mm', type: UNIT_TYPE_LENGTH },
  { code: 'cm', type: UNIT_TYPE_LENGTH },
  { code: 'dm', type: UNIT_TYPE_LENGTH },
  { code: 'm', type: UNIT_TYPE_LENGTH },

  { code: 'mg', type: UNIT_TYPE_MASS },
  { code: 'g', type: UNIT_TYPE_MASS },
  { code: 'hg', type: UNIT_TYPE_MASS },
  { code: 'kg', type: UNIT_TYPE_MASS },

  { code: 'st', type: UNIT_TYPE_COUNT },
  { code: 'paket', type: UNIT_TYPE_COUNT },

  { code: 'låda', type: UNIT_TYPE_OTHER },
  { code: 'flaska', type: UNIT_TYPE_OTHER },
  { code: 'burk', type: UNIT_TYPE_OTHER },
  { code: 'kopp', type: UNIT_TYPE_OTHER },
  { code: 'glas', type: UNIT_TYPE_OTHER },
]
