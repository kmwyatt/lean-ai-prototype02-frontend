// @ts-check

import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router-dom'
import SectionTitle from '../util/SectionTitle'

// @ts-ignore
function RegisterPage(props) {
  const [id, setId] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [role, setRole] = React.useState(1)

  // @ts-ignore
  const idHandler = (event) => {
    setId(event.target.value)
  }

  // @ts-ignore
  const nameHandler = (event) => {
    setName(event.target.value)
  }

  // @ts-ignore
  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  // @ts-ignore
  const roleHandler = (event) => {
    setRole(event.target.value)
  }

  // @ts-ignore
  const submitHandler = async (event) => {
    event.preventDefault()
    const body = {
      id: id,
      name: name,
      email: email,
      role: role,
    }
    try {
      await axios.post('/api/account/register', body)
      alert('가입 되었습니다.')
      props.history.push('/')
    } catch (err) {
      alert('회원가입에 실패했습니다.')
    }
  }
  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: '100vh', display: 'flex', pt: 8 }}
    >
      <Box sx={{ m: 'auto' }}>
        <SectionTitle text="회원가입" />
        <FormControl variant="standard">
          <TextField
            variant="standard"
            label="아이디"
            value={id}
            onChange={idHandler}
          />
          <br />
          <TextField
            variant="standard"
            label="이름"
            value={name}
            onChange={nameHandler}
          />
          <br />
          <TextField
            variant="standard"
            label="이메일"
            value={email}
            onChange={emailHandler}
          />
          <br />
          <RadioGroup row defaultValue={1} onChange={roleHandler}>
            <FormControlLabel value={1} control={<Radio />} label="작업자" />
            <FormControlLabel value={2} control={<Radio />} label="검수자" />
            <FormControlLabel value={3} control={<Radio />} label="관리자" />
          </RadioGroup>
          <br />
          <Button variant="contained" onClick={submitHandler}>
            회원가입
          </Button>
        </FormControl>
      </Box>
    </Container>
  )
}

export default withRouter(RegisterPage)
