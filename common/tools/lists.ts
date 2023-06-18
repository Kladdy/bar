export function swapListElements<T>(list: T[], x: number, y: number): T[] {
  const tmp = [...list]
  const b = tmp[x]
  tmp[x] = tmp[y]
  tmp[y] = b
  return tmp
}

export function setFieldOnSpecificListEntry<T>(list: T[], index: number, field: keyof T, value: any): T[] {
  const tmp = [...list]
  tmp[index][field] = value
  return tmp
}

export function replaceElementInList<T>(list: T[], element: T, key: keyof T): T[] {
  const tmp = [...list]
  const index = tmp.findIndex((x) => x[key] === element[key])
  tmp[index] = element
  return tmp
}
