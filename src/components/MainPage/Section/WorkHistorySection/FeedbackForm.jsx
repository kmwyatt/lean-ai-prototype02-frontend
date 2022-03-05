// @ts-check

import { ArrowForward } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'

// @ts-ignore
function FeedbackForm(props) {
  const userState = useUserState()

  const [writeComment, setWriteComment] = useState('')

  // @ts-ignore
  const writeCommentHandler = (event) => {
    setWriteComment(event.target.value)
  }

  const sendHandler = async () => {
    const body = {
      workerIndex: userState.index,
      role: userState.role,
      postIndex: props.info.postIndex,
      comment: writeComment,
    }
    console.log('post.info', props.info)
    try {
      await axios.post('/api/worker/comment', body)
      alert('코멘트를 남겼습니다.')
      props.history.push({
        pathname: '/main/workhistory',
        state: {
          userIndex: userState.index,
          postIndex: props.info.postIndex,
          projectIndex: props.info.projectIndex,
          projectName: props.info.projectName,
        },
      })
      setWriteComment('')
    } catch (err) {
      console.log(err)
      alert('코멘트를 남기는데 실패했습니다.')
    }
  }

  const [okData, setOkData] = useState('')
  const [noData, setNoData] = useState('')
  const [comment, setComment] = useState('')

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // @ts-ignore
  const commentHandler = (event) => {
    setComment(event.target.value)
  }

  // @ts-ignore
  const okDataHandler = (event) => {
    setOkData(event.target.value)
  }

  // @ts-ignore
  const noDataHandler = (event) => {
    setNoData(event.target.value)
  }

  // @ts-ignore
  const submitHandler = async (event) => {
    event.preventDefault()
    const body = {
      postIndex: props.info.postIndex,
      projectIndex: props.info.projectIndex,
      workerIndex: props.info.workerIndex,
      checkerIndex: userState.index,
      checkerId: userState.id,
      role: userState.role,
      okData: okData,
      noData: noData,
      comment: comment,
    }
    try {
      await axios.post('/api/checker/feedback', body)
      alert('검수 완료되었습니다.')
    } catch (err) {
      alert('데이터 검수에 실패했습니다.')
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <ArrowForward sx={{ mx: 3, mt: 1, color: '#999' }} />
      <Card sx={{ m: 1, mb: 0, flexGrow: 1 }}>
        <CardContent sx={{ mb: -3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              my: 1,
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: 12,
                bgcolor: 'darkorange',
              }}
            >
              {userState.id[0].toUpperCase()}
            </Avatar>
            &nbsp;
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {userState.id}
            </Typography>
          </Box>
        </CardContent>
        <CardContent sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
          <TextField
            sx={{ mr: 2 }}
            fullWidth
            margin="none"
            variant="standard"
            value={writeComment}
            onChange={writeCommentHandler}
          />
          <Button
            size="small"
            variant="contained"
            onClick={sendHandler}
            sx={{ mr: 1 }}
          >
            전송
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ width: 120 }}
            onClick={handleClickOpen}
          >
            승인 수정
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>작업물 업로드</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex' }}>
            <TextField
              variant="standard"
              label="승인 갯수"
              value={okData}
              fullWidth
              sx={{ mr: 1 }}
              onChange={okDataHandler}
            />
            <TextField
              variant="standard"
              label="반려 갯수"
              value={noData}
              fullWidth
              sx={{ ml: 1 }}
              onChange={noDataHandler}
            />
          </Box>
          <br />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="standard"
              label="코멘트"
              value={comment}
              fullWidth
              sx={{ mr: 2 }}
              onChange={commentHandler}
            />
            <Button
              variant="contained"
              sx={{ width: 120 }}
              onClick={submitHandler}
            >
              검수 완료
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>업로드</Button>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default withRouter(FeedbackForm)
