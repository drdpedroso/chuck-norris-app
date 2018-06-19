import intersectionWith from 'lodash/intersectionWith'
import isEqual from 'lodash/isEqual'

export const getIntersectionBetweenObjArrays = (firstArray, secondArray, conditional = isEqual) => intersectionWith(firstArray, secondArray, conditional)

export const mapArrayToHashMap = (arr) => {
  const obj = {}

  arr.forEach((item) => {
    obj[item.id] = item
  })
  return obj
}

export const getAlphabetPositionOfALetter = (letter) => 'abcdefghijklmnopqrstuvwxyz'.indexOf(letter) + 1

// export const getRandomIntegerInRange = (min = 0, max = 9) => Math.floor(Math.random() * (max - min + 1)) + min
//
// export const getRandomJoke = (jokes) => {
//   const randomKey = getRandomIntegerInRange()
//   const keys = Object.keys(jokes)
//   const item = keys[randomKey]
//   return jokes[item]
// }
