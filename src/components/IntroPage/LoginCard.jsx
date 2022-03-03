// @ts-check

import React from 'react'
import styled from 'styled-components'
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { withRouter } from 'react-router-dom'
import { login, useUserDispatch } from '../../context/UserContext'

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

// @ts-ignore
function LoginCard(props) {
  const userDispatch = useUserDispatch()

  const [id, setId] = React.useState('')

  // @ts-ignore
  const idHandler = (event) => {
    setId(event.target.value)
  }

  // @ts-ignore
  const loginHandler = async (event) => {
    event.preventDefault()
    const body = {
      id: id,
    }
    try {
      await login(userDispatch, body)
      props.history.push('/main/project')
    } catch (err) {
      props.history.go(0)
    }
  }

  return (
    <CardBase>
      <FormControl variant="standard">
        <InputLabel htmlFor="id-text">아이디</InputLabel>
        <Input
          id="id-text"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          value={id}
          onChange={idHandler}
        />
        <br />
        <Button variant="contained" onClick={loginHandler}>
          로그인
        </Button>
      </FormControl>
    </CardBase>
  )
}

export default withRouter(LoginCard)
