import React from 'react'
import styled from 'styled-components'
import { validatePassword } from 'services/utils/utils'
import { setCookie } from 'services/storage/storage'

const Title = styled.div`
  font-size: 22px;
  text-align: center;
  margin: auto;
`

const ModalWrapper = styled.div`
  height: 450px;
  width: 400px;
  position: fixed;
  left: 38%;
  background-color: white;
  border-style: solid;
  border-width: medium;
`

class LoginModal extends React.PureComponent {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange({ value }, key) {
    this.setState({
      [key]: value,
    })
  }

  onSubmit(e) {
    e.preventDefault()
    if (validatePassword(this.state.password)) {
      setCookie('logged', true)
      this.props.onSubmit()
    } else {
      alert('Password invalid')
    }
  }

  render() {
    return (
      <ModalWrapper>
        <Title>Login</Title>
        <form>
          <div>
            <input type="text" onChange={({ target }) => this.onChange(target, 'user')} placeholder="User" />
          </div>
          <div>
            <input type="password" onChange={({ target }) => this.onChange(target, 'password')} placeholder="Password" />
          </div>
          <button onClick={this.onSubmit}>SUBMIT</button>
        </form>
      </ModalWrapper>
    )
  }
}

export default LoginModal
