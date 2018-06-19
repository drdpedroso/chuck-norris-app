import React from 'react'
import renderer from 'react-test-renderer'
import LoginModal from './index'
import { shallow } from 'enzyme'

const validatePassword = (password) => {
  password.forEach(char => console.log(char))
}

describe('LoginModal', () => {
  it('should render correctly', () => {
    const component = renderer.create(<LoginModal />)
    expect(component).toMatchSnapshot()
  })
  xit('should return invalid if [i, O, l] are present', () => {
    // validatePassword()
  })
  xit('should return valid if one increasing straight of at least three letters are present', () => {
    // e.g abc, cde, fgh
    // validatePassword()
  })
  xit('should return valid if two non-overlapping pairs of letters are present', () => {
    // e.g aa, bb, cc
  })
  xit('should return invalid if password are bigger than 32 characters', () => {

  })
  xit('should return invalid if any numbers are present', () => {

  })
  xit('should return invalid if any uppercase letters are present', () => {

  })
  xit('should return invalid if any special character are present', () => {

  })
})
