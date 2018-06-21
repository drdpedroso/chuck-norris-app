import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import LoginModal from './index'

global.alert = jest.fn()

describe('LoginModal', () => {
  it('should render correctly', () => {
    const component = renderer.create(<LoginModal />)
    expect(component).toMatchSnapshot()
  })
  it('should change state value based on key/val parameters', () => {
    const component = shallow(<LoginModal />)
    component.instance().onChange({ value: 10 }, 'test')
    expect(component.state().test).toEqual(10)
  })
  it('should trigger submit prop event if password is valid', () => {
    const password = 'abcpassword'
    const e = {
      preventDefault: jest.fn(),
    }
    const onSubmit = jest.fn()
    const component = shallow(<LoginModal onSubmit={onSubmit} />)
    component.setState({ password })
    component.instance().onSubmit(e)
    expect(e.preventDefault).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalled()
  })
  it('should not trigger submit prop event if password is invalid', () => {
    const password = 'ab12password'
    const e = {
      preventDefault: jest.fn(),
    }
    const onSubmit = jest.fn()
    const component = shallow(<LoginModal onSubmit={onSubmit} />)
    component.setState({ password })
    component.instance().onSubmit(e)
    expect(e.preventDefault).toHaveBeenCalled()
    expect(global.alert).toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
