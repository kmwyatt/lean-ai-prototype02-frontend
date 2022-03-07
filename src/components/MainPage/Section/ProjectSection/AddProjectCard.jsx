// @ts-check

import {
  Box,
  Button,
  Card,
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
function AddProjectCard(props) {
  const [name, setName] = useState('')
  const [point, setPoint] = useState('')
  const [period, setPeriod] = useState('')
  const [link, setLink] = useState('')
  const [file, setFile] = useState(undefined)

  // @ts-ignore
  const nameHandler = (event) => {
    setName(event.target.value)
  }

  // @ts-ignore
  const pointHandler = (event) => {
    setPoint(event.target.value)
  }

  // @ts-ignore
  const periodHandler = (event) => {
    setPeriod(event.target.value)
  }

  // @ts-ignore
  const linkHandler = (event) => {
    setLink(event.target.value)
  }

  // @ts-ignore
  const saveFile = (event) => {
    setFile(event.target.files[0])
  }

  const resetForm = () => {
    setName('')
    setPoint('')
    setPeriod('')
    setLink('')
    setFile(undefined)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    resetForm()
    setOpen(false)
  }

  // @ts-ignore
  const submitHandler = async (event) => {
    event.preventDefault()
    if (file) {
      const formData = new FormData()
      // @ts-ignore
      formData.append('file', file)
      formData.append('name', name)
      formData.append('point', point)
      formData.append('period', period)
      formData.append('link', link)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      try {
        await axios.post('/api/admin/createproject', formData, config)
        alert('프로젝트가 생성되었습니다.')
        handleClose()
        props.history.push({
          pathname: '/main/project',
          state: name,
        })
      } catch (err) {
        alert('프로젝트 생성에 실패했습니다.')
      }
    }
  }

  return (
    <>
      <Card
        sx={{
          m: 1,
          width: 270,
          height: 330,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          size="large"
          variant="contained"
          sx={{ position: 'absolute', m: 'auto' }}
          onClick={handleOpen}
        >
          신규 프로젝트 생성
        </Button>
      </Card>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>프로젝트 생성</DialogTitle>
        <DialogContent>
          <TextField
            label="프로젝트명"
            variant="standard"
            fullWidth
            margin="normal"
            value={name}
            onChange={nameHandler}
          />
          <TextField
            label="단가"
            variant="standard"
            fullWidth
            margin="normal"
            value={point}
            onChange={pointHandler}
          />
          <TextField
            label="작업 기간"
            variant="standard"
            fullWidth
            margin="normal"
            value={period}
            onChange={periodHandler}
          />
          <TextField
            label="가이드라인 링크"
            variant="standard"
            fullWidth
            margin="normal"
            value={link}
            onChange={linkHandler}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            대표 이미지&nbsp;&nbsp;
            <input type="file" onChange={saveFile} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>생성</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withRouter(AddProjectCard)
