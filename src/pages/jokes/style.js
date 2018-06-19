import styled from 'styled-components'

export const JokesWrapper = styled.div`
  display: flex;
`
export const Column = styled.div`
  flex-direction: column;
`

export const Button = styled.button`
  border-radius: 20px;
  width: 55px;
  background-color: ${props => props.backgroundColor}
`
