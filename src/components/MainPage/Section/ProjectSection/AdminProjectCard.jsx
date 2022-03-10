// @ts-check

import { PriorityHigh } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// @ts-ignore
function AdminProjectCard(props) {
  const [warning, setWarning] = useState(false)

  const warningOpenHandler = () => {
    setWarning(true)
  }

  const warningCloseHandler = () => {
    setWarning(false)
  }

  const deleteHandler = async () => {
    const body = {
      index: props.info.index,
    }
    setWarning(false)
    try {
      await axios.post('/api/admin/deleteproject', body)
      alert('정상적으로 삭제되었습니다.')
      props.history.push({
        pathname: '/main/project',
        state: props.info.index,
      })
    } catch (err) {
      alert('프로젝트 삭제에 실패했습니다.')
    }
  }

  const [openDialog, setOpenDialog] = useState(false)

  const dialogOpenHandler = () => {
    setName(props.info.name)
    setPoint(props.info.point)
    setPeriod(props.info.period)
    setLink(props.info.link)
    setNoImage(true)
    setFile(undefined)
    setOpenDialog(true)
  }

  const dialogCloseHandler = () => {
    setOpenDialog(false)
  }

  const [name, setName] = useState('')
  const [point, setPoint] = useState('')
  const [period, setPeriod] = useState('')
  const [link, setLink] = useState('')
  const [noImage, setNoImage] = useState(true)
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
  const checkHandler = (event) => {
    if (event.target.checked) {
      setNoImage(false)
    } else {
      setNoImage(true)
    }
  }

  // @ts-ignore
  const saveFile = (event) => {
    setFile(event.target.files[0])
  }

  // @ts-ignore
  const submitHandler = async (event) => {
    event.preventDefault()
    if (noImage) {
      const body = {
        index: props.info.index,
        name: name,
        point: point,
        period: period,
        link: link,
        file: file,
      }

      try {
        await axios.post('/api/admin/modifyproject', body)
        alert('프로젝트가 수정되었습니다.')
        setOpenDialog(false)
        props.history.push({
          pathname: '/main/project',
          state: {
            name: name,
            point: point,
            period: period,
            link: link,
          },
        })
      } catch (err) {
        alert('프로젝트 수정에 실패했습니다.')
      }
    } else {
      const formData = new FormData()
      // @ts-ignore
      formData.append('file', file)
      formData.append('index', props.info.index)
      formData.append('name', name)
      formData.append('point', point)
      formData.append('period', period)
      formData.append('link', link)

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      try {
        await axios.post('/api/admin/modifyprojectwithimage', formData, config)
        alert('프로젝트가 수정되었습니다.')
        setOpenDialog(false)
        props.history.push({
          pathname: '/main/project',
          state: {
            name: name,
            point: point,
            period: period,
            link: link,
          },
        })
      } catch (err) {
        alert('프로젝트 수정에 실패했습니다.')
      }
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
              onClick={dialogOpenHandler}
            >
              수정
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ flexGrow: 1 }}
              onClick={warningOpenHandler}
            >
              삭제
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
            <PriorityHigh fontSize="small" color="error" />
            <Typography sx={{ fontSize: 14 }} color="error">
              삭제 후 복구 불가
            </Typography>
          </Box>
        </Box>
      </Card>
      <Dialog open={warning} onClose={warningCloseHandler}>
        <DialogTitle>프로젝트 삭제</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
            [{props.info.name}]
          </Typography>
          <Typography>
            프로젝트를 삭제하시겠습니까? 삭제 후에는 취소할 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteHandler}>삭제</Button>
          <Button onClick={warningCloseHandler}>취소</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialog} onClose={dialogCloseHandler} fullWidth>
        <DialogTitle>프로젝트 수정</DialogTitle>
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
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="대표 이미지 수정"
              onChange={checkHandler}
            />
            &nbsp;&nbsp;
            <input type="file" disabled={noImage} onChange={saveFile} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>수정</Button>
          <Button onClick={dialogCloseHandler}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withRouter(AdminProjectCard)
