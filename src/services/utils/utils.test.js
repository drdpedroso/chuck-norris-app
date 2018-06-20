import {
  getIntersectionBetweenObjArrays,
  mapArrayToHashMap,
  lookForStraightLetters,
  hasInvalidCharsOrNonLowercaseLetters,
  validatePassword,
} from './utils'


describe('utils', () => {
  it('should get right intersection between two arrays of objects based on a equal conditional', () => {
    const jokes = [
      { id: 1, joke: 'Joke 1' },
      { id: 2, joke: 'Joke 2' },
      { id: 3, joke: 'Joke 3' },
    ]

    const favoriteJokes = [
      { id: 2, joke: 'Joke 2' },
    ]
    const result = getIntersectionBetweenObjArrays(jokes, favoriteJokes)
    expect(String(result)).toEqual(String({ id: 2, joke: 'Joke 2' }))
  })
  it('should return an empty array for non-intersectional arrays', () => {
    const jokes = [
      { id: 1, joke: 'Joke 1' },
      { id: 2, joke: 'Joke 2' },
      { id: 3, joke: 'Joke 3' },
    ]

    const favoriteJokes = [
      { id: 5, joke: 'Joke 2' },
    ]
    const result = getIntersectionBetweenObjArrays(jokes, favoriteJokes)
    expect(String(result)).toEqual(String([]))
  })
  it('should "convert" array to hash map', () => {
    const jokes = [
      { id: 1, joke: 'Joke 1' },
      { id: 2, joke: 'Joke 2' },
    ]

    const result = mapArrayToHashMap(jokes)
    expect(JSON.stringify(result)).toEqual(JSON.stringify({
      1: { id: 1, joke: 'Joke 1' },
      2: { id: 2, joke: 'Joke 2' },
    }))
  })
  it('should return true if string has 3 straight letters (alphabetic order)', () => {
    expect(lookForStraightLetters('abcpassword')).toEqual(true)
  })
  it('should return false if string doesnt have 3 straight letters (alphabetic order)', () => {
    expect(lookForStraightLetters('passwordac')).toEqual(false)
  })
  it('should return false if string dont contains any uppercase letter', () => {
    expect(hasInvalidCharsOrNonLowercaseLetters('passwordac')).toEqual(false)
  })
  it('should return true if string contains any uppercase letter', () => {
    expect(hasInvalidCharsOrNonLowercaseLetters('passworAAdac2')).toEqual(true)
  })
  it('should return false for invalid password', () => {
    expect(validatePassword('aapassworAAdac2')).toEqual(false)
    expect(validatePassword('somepassword')).toEqual(false)
    expect(validatePassword('aswdrfetghyukilopcmsnhjkdlethfgtyuo')).toEqual(false)
    expect(validatePassword('abcsdOl')).toEqual(false)
  })
  it('should return true for valid password', () => {
    expect(validatePassword('abcpasswordaabb')).toEqual(true)
  })
  it('should return invalid if [i, O, l] are present', () => {
    const pass = 'passlwordiO'
    expect(validatePassword(pass)).toEqual(false)
  })
  it('should return valid if one increasing straight of at least three letters are present', () => {
    // e.g abc, cde, fgh
    const pass = 'passwordcdeaabb'
    expect(validatePassword(pass)).toEqual(true)
  })
  it('should return valid if two non-overlapping pairs of letters are present', () => {
    // e.g aa, bb, cc
    const pass = 'passwordcdeaabb'
    expect(validatePassword(pass)).toEqual(true)
  })
  it('should return invalid if two non-overlapping pairs of letters are not present', () => {
    // e.g aa, bb, cc
    const pass = 'aalesbb'
    expect(validatePassword(pass)).toEqual(false)
  })
  it('should return invalid if password are bigger than 32 characters', () => {
    const pass = 'abcaweriolskdhmlksithmlskdhtioskdhntkshidkkksuds'
    expect(validatePassword(pass)).toEqual(false)
  })
  it('should return invalid if any numbers are present', () => {
    const pass = 'abcaweriolskdhmlksithmlskdhtioskdhntkshidkkksuds'
    expect(validatePassword(pass)).toEqual(false)
  })
  it('should return invalid if any uppercase letters are present', () => {
    const pass = 'PASSWORDABCAA'
    expect(validatePassword(pass)).toEqual(false)
  })
  it('should return invalid if any special character are present', () => {
    const pass = '890321passabccde'
    expect(validatePassword(pass)).toEqual(false)
  })
})
