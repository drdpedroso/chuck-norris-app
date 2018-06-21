import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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

const Button = styled.button`
`

const Input = styled.input`
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
            <Input type="text" onChange={({ target }) => this.onChange(target, 'user')} placeholder="User" />
          </div>
          <div>
            <Input type="password" onChange={({ target }) => this.onChange(target, 'password')} placeholder="Password" />
          </div>
          <Button onClick={this.onSubmit}>SUBMIT</Button>
        </form>
      </ModalWrapper>
    )
  }
}

LoginModal.propTypes = {
  onSubmit: PropTypes.func,
}

LoginModal.defaultProps = {
  onSubmit: () => {},
}

export default LoginModal
