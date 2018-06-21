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

export const hasInvalidCharsOrNonLowercaseLetters = (str) => {
  const regex = new RegExp(/[iOl]|[^a-z]\w+/g)
  return regex.test(str)
}

export const validatePassword = (password = '') => {
  if (password.length > 32) {
    return false
  }
  let straightLettersGroups = 0
  let straightLetters = 1
  let nonOverlappingPairs = 0

  const arr = password.split('')
  const passwordArray = arr.map(c => getAlphabetPositionOfALetter(c))
  for (let i = 1; i < passwordArray.length; i += 1) {
    // check for overlapping pairs
    if ((i + 1) % 2 === 0 && passwordArray[i - 1] !== passwordArray[i]) {
      nonOverlappingPairs += 1
    }

    // check for straight letters group of 3 letters
    if (passwordArray[i - 1] + 1 === passwordArray[i]) {
      straightLetters += 1
    } else {
      straightLetters = 1
    }
    if (straightLetters === 3) {
      straightLetters = 1
      straightLettersGroups += 1
    }
  }

  return straightLettersGroups > 0 && !hasInvalidCharsOrNonLowercaseLetters(password) && nonOverlappingPairs > 2
}
