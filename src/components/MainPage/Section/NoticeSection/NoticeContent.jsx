// @ts-check

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'

// @ts-ignore
function NoticeContent(props) {
  const state = props.location.state
  const userState = useUserState()

  const modifyHandler = () => {
    props.history.push({
      pathname: '/main/noticemodify',
      state: {
        ...state,
      },
    })
  }

  const deleteHandler = async () => {
    try {
      const body = {
        index: state.index,
      }
      axios.post('/api/admin/deletenotice', body)
      alert('삭제되었습니다.')
      props.history.push('/main/notice')
    } catch (err) {
      alert('삭제에 실패했습니다.')
    }
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
            <Typography variant="h6" sx={{ mx: 1 }}>
              {state.title}
            </Typography>
            <br />
            <Typography variant="body1" sx={{ mx: 1, minHeight: 300 }}>
              {state.content}
            </Typography>
          </CardContent>
        </Card>
        {userState.index === state.writerIndex && (
          <Box sx={{ display: 'flex', justifyContent: 'right', my: 1 }}>
            <Button variant="contained" sx={{ mr: 1 }} onClick={modifyHandler}>
              수정하기
            </Button>
            <Button variant="contained" sx={{ mr: 1 }} onClick={deleteHandler}>
              삭제하기
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default withRouter(NoticeContent)
