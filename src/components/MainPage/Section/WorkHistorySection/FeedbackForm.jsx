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
import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'

// @ts-ignore
function FeedbackForm(props) {
  const userState = useUserState()
  const fileInput = useRef()

  const [profileColor, setProfileColor] = useState('gray')

  useEffect(() => {
    if (userState.role === 1) {
      setProfileColor('royalblue')
    } else if (userState.role === 2) {
      setProfileColor('darkorange')
    } else if (userState.role === 3) {
      setProfileColor('darkgreen')
    }
    console.log(props.post)
  }, [props])

  const [writeComment, setWriteComment] = useState('')
  const [file, setFile] = useState(undefined)

  // @ts-ignore
  const writeCommentHandler = (event) => {
    setWriteComment(event.target.value)
  }

  // @ts-ignore
  const fileHandler = (event) => {
    setFile(event.target.files[0])
  }

  // @ts-ignore
  const sendHandler = async (event) => {
    let success = false
    event.preventDefault()

    if (!file) {
      const body = {
        checkerIndex: userState.index,
        role: userState.role,
        postIndex: props.info.postIndex,
        comment: writeComment,
      }
      try {
        await axios.post('/api/checker/comment', body)
        success = true
        alert('코멘트를 남겼습니다.')
      } catch (err) {
        console.log(err)
        alert('코멘트를 남기는데 실패했습니다.')
      }
    } else {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const formData = new FormData()

      // @ts-ignore
      formData.append('file', file)
      formData.append('checkerIndex', userState.index)
      formData.append('role', userState.role)
      formData.append('postIndex', props.info.postIndex)
      formData.append('comment', writeComment)

      try {
        await axios.post('/api/checker/commentwithfile', formData, config)
        success = true
        alert('코멘트를 남겼습니다.')
      } catch (err) {
        console.log(err)
        alert('코멘트를 남기는데 실패했습니다.')
      }
    }

    if (success) {
      setWriteComment('')
      setFile(undefined)
      // @ts-ignore
      fileInput.current.value = ''
      props.history.push({
        pathname: '/main/workhistory',
        state: {
          userIndex: userState.index,
          postIndex: props.info.postIndex,
          projectIndex: props.info.projectIndex,
          projectName: props.info.projectName,
        },
      })
    }
  }

  const [okData, setOkData] = useState(props.post.okData)
  const [noData, setNoData] = useState(props.post.noData)
  const [comment, setComment] = useState('')

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOkData(props.post.okData)
    setNoData(props.post.noData)
    setComment('')
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
      postIndex: props.post.index,
      projectIndex: props.info.projectIndex,
      role: userState.role,
      okData: okData,
      noData: noData,
      comment: comment,
    }
    console.log(body)
    try {
      await axios.post('/api/checker/modifyfeedback', body)
      alert('승인 수정되었습니다.')
      handleClose()
      props.history.push({
        pathname: '/main/workhistory',
        state: {
          userIndex: userState.index,
          projectIndex: props.info.projectIndex,
          projectName: props.info.projectName,
        },
      })
    } catch (err) {
      alert('승인 수정에 실패했습니다.')
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
                bgcolor: profileColor,
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
        <CardContent sx={{ mx: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
          </Box>
          <input
            type="file"
            // @ts-ignore
            ref={fileInput}
            onChange={fileHandler}
          />
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>승인 수정</DialogTitle>
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
          <TextField
            variant="standard"
            label="코멘트"
            value={comment}
            fullWidth
            sx={{ mr: 2 }}
            onChange={commentHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>전송</Button>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default withRouter(FeedbackForm)
