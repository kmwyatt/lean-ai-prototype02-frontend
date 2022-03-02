// @ts-check

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
import { useUserState } from '../../../../context/UserContext'

// @ts-ignore
function JoinedProjectCard(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const userState = useUserState()
  const [comment, setComment] = useState('')
  const [dataNum, setDataNum] = useState('')
  const [file, setFile] = useState(undefined)

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
      formData.append('projectIndex', props.info.index)
      formData.append('projectName', props.info.name)
      formData.append('workerIndex', userState.index)
      formData.append('workerId', userState.id)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      try {
        await axios.post('/api/worker/uploaddata', formData, config)
        alert('업로드가 완료되었습니다.')
        handleClose()
      } catch (err) {
        alert('업로드에 실패했습니다.')
      }
    } else {
      alert('파일이 없습니다.')
    }
  }

  return (
    <>
      <Card sx={{ m: 1, width: 270, height: 330, position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={`/staticfiles/${props.info.image}`}
        />
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h6" component="div">
            {props.info.name}
          </Typography>
          <Typography sx={{ mb: 1, fontSize: 14 }} color="text.secondary">
            작업 단가 : {props.info.point}P
          </Typography>
          <Typography variant="body2">{props.info.period}</Typography>
        </CardContent>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            mx: 'auto',
            bottom: 0,
          }}
        >
          <CardActions sx={{ mx: 1, display: 'flex' }}>
            <Button
              size="small"
              variant="contained"
              sx={{ flexGrow: 1 }}
              href={props.info.link}
              target="_blank"
            >
              상세정보 확인
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ flexGrow: 1, ml: 1 }}
              onClick={handleClickOpen}
            >
              데이터 업로드
            </Button>
          </CardActions>
          <Box
            sx={{
              mb: 1,
              ml: -0.5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: 14 }} color="error">
              &nbsp;
            </Typography>
          </Box>
        </Box>
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
    </>
  )
}

export default JoinedProjectCard
