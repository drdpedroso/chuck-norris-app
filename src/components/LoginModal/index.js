import React from 'react'
import styled from 'styled-components'

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

class LoginModal extends React.PureComponent{
  onChange({value}, key) {
    this.setState({
      [key]: value
    }, () => console.log(this.state))
  }

  onSubmit(e){
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    return(
      <ModalWrapper>
        <Title>Login</Title>
        <form>
          <div>
            <input type="text" onChange={({target}) => this.onChange(target, 'user')} placeholder="User"/>
          </div>
          <div>
            <input type="password" onChange={({target}) => this.onChange(target, 'password')} placeholder="Password"/>
          </div>
          <button onClick={e => this.onSubmit(e)}>SUBMIT</button>
        </form>
      </ModalWrapper>
    )
  }
}

export default LoginModal
