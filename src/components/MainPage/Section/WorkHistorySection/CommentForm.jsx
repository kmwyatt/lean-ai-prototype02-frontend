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
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'

// @ts-ignore
function CommentForm(props) {
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

  const [comment, setComment] = useState('')
  const [dataNum, setDataNum] = useState('')
  const [file, setFile] = useState(undefined)

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setComment('')
    setDataNum('')
    setFile(undefined)
    setOpen(false)
  }

  // @ts-ignore
  const commentHandler = (event) => {
    setComment(event.target.value)
  }

  // @ts-ignore
  const dataNumHandler = (event) => {
    setDataNum(event.target.value)
  }

  // @ts-ignore
  const saveFile = (event) => {
    setFile(event.target.files[0])
  }

  const submitHandler = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('comment', comment)
      formData.append('dataNum', dataNum)
      // @ts-ignore
      formData.append('file', file)
      formData.append('projectIndex', props.info.projectIndex)
      formData.append('projectName', props.info.projectName)
      formData.append('workerIndex', userState.index)
      formData.append('workerId', userState.id)
      formData.append('reuploaded', 'true')

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      try {
        await axios.post('/api/worker/uploaddata', formData, config)
        alert('업로드가 완료되었습니다.')
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
        alert('업로드에 실패했습니다.')
      }
    } else {
      alert('파일이 없습니다.')
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
              sx={{ width: 24, height: 24, fontSize: 12, bgcolor: 'royalblue' }}
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
            재제출하기
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>작업물 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            작업물 업로드 주의 사항 <br />
            1. Apple <br />
            2. Banana <br />
            3. Cherry
          </DialogContentText>
          <TextField
            margin="dense"
            fullWidth
            label="Comment"
            variant="standard"
            value={comment}
            onChange={commentHandler}
          />
          <Box>
            <input type="file" onChange={saveFile} />
            <TextField
              variant="standard"
              label="데이터 수"
              value={dataNum}
              onChange={dataNumHandler}
            />
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

export default withRouter(CommentForm)
