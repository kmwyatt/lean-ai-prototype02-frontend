// @ts-check

import { Button, FormControl, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect } from 'react'
import {
  login,
  useUserDispatch,
  useUserState,
} from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'

// @ts-ignore
function MyPageSection(props) {
  const userState = useUserState()
  const userDispatch = useUserDispatch()

  const [role, setRole] = React.useState('')
  const [name, setName] = React.useState(userState.name)
  const [email, setEmail] = React.useState(userState.email)

  useEffect(() => {
    if (userState.role === 1) {
      setRole('작업자')
    } else if (userState.role === 2) {
      setRole('검수자')
    } else if (userState.role === 3) {
      setRole('관리자')
    }
  }, [])

  // @ts-ignore
  const nameHandler = (event) => {
    setName(event.target.value)
  }

  // @ts-ignore
  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  // @ts-ignore
  const submitHandler = async (event) => {
    event.preventDefault()
    const body = {
      index: userState.index,
      name: name,
      email: email,
    }
    try {
      await axios.post('/api/account/modifyuserinfo', body)
      alert('회원 정보가 수정되었습니다.')
      const _body = {
        id: userState.id,
      }
      await login(userDispatch, _body)
    } catch (err) {
      alert('회원 정보 수정에 실패했습니다.')
    }
  }

  return (
    <Box sx={{ p: 5, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <SectionTitle text="회원 정보" />
      <Box sx={{ m: 'auto' }}>
        <FormControl variant="standard" sx={{ width: 400 }}>
          <TextField
            disabled
            label="아이디"
            defaultValue={userState.id}
            variant="standard"
          />
          <br />
          <TextField disabled label="상태" value={role} variant="standard" />
          <br />
          <TextField
            disabled
            label="보유 포인트"
            defaultValue={userState.point}
            variant="standard"
          />
          <br />
          <TextField
            variant="standard"
            label="이름"
            // defaultValue={userState.name}
            value={name}
            onChange={nameHandler}
          />
          <br />
          <TextField
            variant="standard"
            label="이메일"
            // defaultValue={userState.email}
            value={email}
            onChange={emailHandler}
          />
          <br />
          <Button variant="contained" onClick={submitHandler}>
            수정
          </Button>
        </FormControl>
      </Box>
    </Box>
  )
}

export default MyPageSection
