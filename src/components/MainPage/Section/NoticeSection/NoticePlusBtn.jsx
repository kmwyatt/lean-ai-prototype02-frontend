// @ts-check

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// @ts-ignore
function NoticePlusBtn(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // @ts-ignore
  const titleHandler = (event) => {
    setTitle(event.target.value)
  }

  // @ts-ignore
  const contentHandler = (event) => {
    setContent(event.target.value)
  }

  const submitHandler = async () => {
    const body = {
      title: title,
      content: content,
      writerIndex: props.info.writerIndex,
      writerId: props.info.writerId,
    }
    try {
      await axios.post('/api/admin/writenotice', body)
      alert('공지사항이 작성되었습니다.')
      handleClose()
      props.history.push({
        pathname: '/main/notice',
        state: title,
      })
    } catch (err) {
      console.log(err)
      alert('공지사항 작성에 실패했습니다.')
    }
  }

  const resetForm = () => {
    setTitle('')
    setContent('')
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    resetForm()
    setOpen(false)
  }
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        새로 작성하기
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>공지사항 작성</DialogTitle>
        <DialogContent>
          <TextField
            label="제목"
            fullWidth
            margin="normal"
            value={title}
            onChange={titleHandler}
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            rows={8}
            margin="normal"
            value={content}
            onChange={contentHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>작성</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withRouter(NoticePlusBtn)
