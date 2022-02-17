import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const CardBase = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #cccccc;
  margin-left: 30px;
`

function LoginCard(props) {
  const onLoginHandler = () => {
    props.history.push('/login')
  }

  const onRegisterHandler = () => {
    props.history.push('/register')
  }

  return <CardBase></CardBase>
}

export default withRouter(LoginCard)
