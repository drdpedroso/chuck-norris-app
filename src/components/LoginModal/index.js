import React from 'react'
import PropTypes from 'prop-types'
import { validatePassword } from 'services/utils/utils'
import { setCookie } from 'services/storage/storage'
import { Button, Input, ModalWrapper, Title } from './style'

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
      alert('Password is invalid :(')
    }
  }

  render() {
    return (
      <ModalWrapper>
        <Title>Login</Title>
        <form>
          <div>
            <Input type="text" onChange={({ target }) => this.onChange(target, 'user')} placeholder="User" required />
          </div>
          <div>
            <Input type="password" onChange={({ target }) => this.onChange(target, 'password')} placeholder="Password" required />
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
