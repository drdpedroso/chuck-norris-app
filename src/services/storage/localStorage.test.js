import { LocalStorageMock } from '../tests/mocks'
import {getItemsFromLocalStorage, setItemsInLocalStorage} from './localStorage'

global.localStorage = new LocalStorageMock

describe('localStorage', () => {
  it('should set items from localstorage', () => {
    setItemsInLocalStorage('test', [{id: 10, test: 'testing'}])
    expect(localStorage.getItem('test')).toEqual(JSON.stringify([{"id":10,"test":"testing"}]))
  })
  it('should get items from localstorage by specif key', () => {
    localStorage.setItem('test', JSON.stringify([{id: 10, test: 'testing'}]))
    expect(getItemsFromLocalStorage('test')).toEqual([{id: 10, test: 'testing'}])
  })
})
