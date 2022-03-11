// @ts-check

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'

// @ts-ignore
function NoticeModify(props) {
  const state = props.location.state
  const userState = useUserState()

  const [title, setTitle] = useState()
  const [content, setContent] = useState()

  useEffect(() => {
    setTitle(state.title)
    setContent(state.content)
  }, [])

  // @ts-ignore
  const titleHandler = (event) => {
    setTitle(event.target.value)
  }

  // @ts-ignore
  const contentHandler = (event) => {
    setContent(event.target.value)
  }

  const submitHandler = async () => {
    try {
      const body = {
        ...state,
        title: title,
        content: content,
      }
      await axios.post('/api/admin/modifynotice', body)
      alert('수정되었습니다.')
      props.history.push({
        pathname: '/main/noticecontent',
        state: body,
      })
    } catch (err) {
      alert('공지사항 수정에 실패했습니다.')
    }
  }

  const cancelHandler = () => {
    props.history.push({
      pathname: '/main/noticecontent',
      state: {
        ...state,
      },
    })
  }

  return (
    <Box sx={{ m: 5, width: '100%', position: 'relative' }}>
      <SectionTitle text="공지사항" />
      <Box>
        <Card sx={{ m: 1, pb: 0 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                my: 1,
              }}
            >
              작성자&nbsp;&nbsp;
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 12,
                  bgcolor: 'darkgreen',
                }}
              >
                {state.writerId[0].toUpperCase()}
              </Avatar>
              &nbsp;
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {state.writerId}
              </Typography>
              <Typography
                variant="body1"
                color="#999"
                sx={{ justifyContent: 'right' }}
              >
                {moment(state.date).format('YYYY-MM-DD hh:mmA')}
              </Typography>
            </Box>
            <br />
            <Box sx={{ mr: 2 }}>
              <TextField
                sx={{ mx: 1, mb: 2 }}
                size="small"
                label="제목"
                value={title}
                onChange={titleHandler}
                fullWidth
              />
              <TextField
                sx={{ mx: 1, minHeight: 291 }}
                multiline
                rows={12}
                size="small"
                label="내용"
                value={content}
                onChange={contentHandler}
                fullWidth
              />
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'right', my: 1 }}>
          <Button variant="contained" sx={{ mr: 1 }} onClick={submitHandler}>
            수정
          </Button>
          <Button variant="contained" sx={{ mr: 1 }} onClick={cancelHandler}>
            취소
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default withRouter(NoticeModify)
