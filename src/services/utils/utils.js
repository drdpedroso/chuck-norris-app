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

export const getAlphabetPositionOfALetter = letter => 'abcdefghijklmnopqrstuvwxyz'.indexOf(letter) + 1

export const lookForStraightLetters = (password = '') => {
  const arr = password.split('')
  const passwordArray = arr.map(c => getAlphabetPositionOfALetter(c))
  for (let i = 0; i < passwordArray.length - 2; i++) {
    for (let j = 1; j < 3; j++) {
      if (passwordArray[i + j] !== (passwordArray[i + j - 1] + 1)) {
        break
      }
      if (j === 2) return true
    }
  }
  return false
}

export const getNonOverlappingPairs = (string = '') => {
  const arr = string.split('')
  let overlappingParis = 0
  for(let i = 0; i < arr.length; i++) {
    const narray = arr.slice(i, i + 2)
    if (i % 2 === 0 && narray[0] !== narray[1]) {
      overlappingParis += 1
      i++
    }
  }
  return overlappingParis
}

export const hasInvalidCharsOrNonLowercaseLetters = (str) => {
  const regex = new RegExp(/[iOl]|[^a-z]\w+/g)
  return regex.test(str)
}

export const validatePassword = (password = '') => {
  if (password.length > 32) {
    return false
  }
  const hasStraightLetters = lookForStraightLetters(password)
  const nonOverlappingPairs = getNonOverlappingPairs(password)
  return hasStraightLetters && !hasInvalidCharsOrNonLowercaseLetters(password) && nonOverlappingPairs > 2
}
