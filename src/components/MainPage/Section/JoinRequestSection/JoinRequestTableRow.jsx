// @ts-check

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// @ts-ignore
function JoinRequestTableRow(props) {
  const [feedback, setFeedback] = useState('')
  const [answer, setAnswer] = useState(0)

  // @ts-ignore
  const feedbackHandler = (event) => {
    setFeedback(event.target.value)
  }

  const okHandler = () => {
    setAnswer(1)
    setFeedback('')
  }

  const noHandler = () => {
    setAnswer(2)
  }

  useEffect(() => {
    if (answer) {
      submit()
    }
  }, [answer])

  const submit = async () => {
    console.log('answer', answer)
    const body = {
      index: props.info.index,
      userIndex: props.info.content.userIndex,
      projectIndex: props.info.content.projectIndex,
      answer: answer,
      feedback: feedback,
    }
    try {
      await axios.post('/api/admin/joinresponse', body)
      alert('처리되었습니다.')
      handleClose()
      props.history.push({
        pathname: '/main/joinrequest',
        state: props.info.index,
      })
    } catch (err) {
      console.log(err)
      alert('처리되지 못했습니다.')
    }
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setFeedback('')
    setAnswer(0)
    setOpen(false)
  }
  return (
    <>
      <TableRow hover onClick={handleOpen}>
        <TableCell align="center">{props.info.index}</TableCell>
        <TableCell align="center">{props.info.content.userId}</TableCell>
        <TableCell align="center">{props.info.content.projectName}</TableCell>
        <TableCell align="center">
          {moment(props.info.date).format('YYYY-MM-DD hh:mmA')}
        </TableCell>
      </TableRow>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>프로젝트 참여 신청</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            fullWidth
            label="이름"
            defaultValue={props.info.content.name}
            margin="normal"
          />
          <br />
          <TextField
            disabled
            fullWidth
            label="아이디"
            defaultValue={props.info.content.userId}
            margin="normal"
          />
          <br />
          <TextField
            disabled
            fullWidth
            label="이메일 주소"
            defaultValue={props.info.content.email}
            margin="normal"
          />
          <br />
          <RadioGroup
            row
            defaultValue={props.info.content.guideline}
            sx={{ display: 'flex', alignItems: 'center', mx: 1, mb: -1 }}
          >
            <Typography variant="body2">
              가이드라인 확인 여부&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
            <FormControlLabel
              disabled
              value={1}
              control={<Radio size="small" />}
              label="예"
            />
            <FormControlLabel
              disabled
              value={2}
              control={<Radio size="small" />}
              label="아니오"
            />
          </RadioGroup>
          <TextField
            disabled
            multiline
            rows={3}
            fullWidth
            label="신청 사유"
            defaultValue={props.info.content.comment}
            margin="normal"
          />
          <TextField
            multiline
            rows={3}
            fullWidth
            label="반려 사유 (반려시에만 입력)"
            value={feedback}
            onChange={feedbackHandler}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={okHandler}>승인</Button>
          <Button onClick={noHandler}>반려</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withRouter(JoinRequestTableRow)
