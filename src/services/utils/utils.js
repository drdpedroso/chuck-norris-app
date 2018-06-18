import intersectionWith from 'lodash/intersectionWith'
import isEqual from 'lodash/isEqual'

export const getIntersectionBetweenObjArrays = (firstArray, secondArray, conditional = isEqual) => {
  return intersectionWith(firstArray, secondArray, conditional)
}

export const mapArrayToHashMap = (arr) => {
  const obj = {}

  arr.forEach(item => {
    obj[item.id] = item
  })

  return obj
}
