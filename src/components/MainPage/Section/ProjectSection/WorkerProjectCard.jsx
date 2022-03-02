// @ts-check

import { PriorityHigh } from '@mui/icons-material'
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
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'

// @ts-ignore
function WorkerProjectCard(props) {
  const userState = useUserState()

  const [comment, setComment] = useState('')
  const [guideline, setGuideline] = useState(2)

  // @ts-ignore
  const commentHandler = (event) => {
    setComment(event.target.value)
  }

  // @ts-ignore
  const guidelineHandler = (event) => {
    setGuideline(event.target.value)
  }

  const submitHandler = async () => {
    const body = {
      userIndex: props.userInfo.index,
      userId: props.userInfo.id,
      projectIndex: props.info.index,
      projectName: props.info.name,
      name: props.userInfo.name,
      email: props.userInfo.email,
      guideline: guideline,
      comment: comment,
    }
    try {
      await axios.post('/api/worker/joinrequest', body)
      alert('신청되었습니다.')
      handleClose()
      props.history.push({
        pathname: '/main/project',
        state: props.info.index,
      })
    } catch (err) {
      alert('신청에 실패했습니다.')
    }
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setComment('')
    setGuideline(2)
    setOpen(false)
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
              onClick={handleOpen}
            >
              작업 신청
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
              상세정보 확인 후 작업 신청
            </Typography>
          </Box>
        </Box>
      </Card>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>프로젝트 참여 신청</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            fullWidth
            label="이름"
            defaultValue={userState.name}
            margin="normal"
          />
          <br />
          <TextField
            disabled
            fullWidth
            label="아이디"
            defaultValue={userState.id}
            margin="normal"
          />
          <br />
          <TextField
            disabled
            fullWidth
            label="이메일 주소"
            defaultValue={userState.email}
            margin="normal"
          />
          <br />
          <RadioGroup
            row
            defaultValue={2}
            onChange={guidelineHandler}
            sx={{ display: 'flex', alignItems: 'center', mx: 1, mb: -1 }}
          >
            <Typography variant="body2">
              가이드라인 확인 여부&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
            <FormControlLabel
              value={1}
              control={<Radio size="small" />}
              label="예"
            />
            <FormControlLabel
              value={2}
              control={<Radio size="small" />}
              label="아니오"
            />
          </RadioGroup>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="신청 사유"
            value={comment}
            onChange={commentHandler}
            margin="normal"
          />
          <Typography
            variant="body1"
            sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
          >
            위 내용이 관리자에게 전송됩니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>신청</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withRouter(WorkerProjectCard)
