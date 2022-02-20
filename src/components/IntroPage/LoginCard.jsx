// @ts-check

import React from 'react'
import styled from 'styled-components'
import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
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

// @ts-ignore
function LoginCard(props) {
  const [id, setId] = React.useState('')
  const [role, setRole] = React.useState(1)

  // @ts-ignore
  const idHandler = (event) => {
    setId(event.target.value)
  }

  // @ts-ignore
  const roleHandler = (event) => {
    setRole(event.target.value)
  }

  const loginHandler = () => {
    console.log('id:', id, 'role:', role)
    props.history.go(0)
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
        <RadioGroup
          row
          name="user-role"
          defaultValue="1"
          onChange={roleHandler}
        >
          <FormControlLabel value="1" control={<Radio />} label="작업자" />
          <FormControlLabel value="2" control={<Radio />} label="검수자" />
          <FormControlLabel value="3" control={<Radio />} label="관리자" />
        </RadioGroup>
        <br />
        <Button variant="contained" onClick={loginHandler}>
          로그인
        </Button>
      </FormControl>
    </CardBase>
  )
}

export default withRouter(LoginCard)
