// @ts-check

import { Download } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
  login,
  useUserDispatch,
  useUserState,
} from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'

// @ts-ignore
function CheckDataSection(props) {
  const userState = useUserState()
  const userDispatch = useUserDispatch()
  const state = props.location.state

  const [okData, setOkData] = useState('')
  const [noData, setNoData] = useState('')
  const [comment, setComment] = useState('')

  const downloadHandler = async () => {
    const body = {
      checkerIndex: userState.index,
      postIndex: state.index,
    }
    await axios.post('/api/checker/checking', body)
    const user = {
      id: userState.id,
    }
    await login(userDispatch, user)
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
  const commentHandler = (event) => {
    setComment(event.target.value)
  }

  // @ts-ignore
  const submitHandler = async (event) => {
    event.preventDefault()
    const body = {
      postIndex: state.index,
      projectIndex: state.projectIndex,
      workerIndex: state.workerIndex,
      checkerIndex: userState.index,
      checkerId: userState.id,
      role: userState.role,
      okData: okData,
      noData: noData,
      comment: comment,
    }
    const user = {
      id: userState.id,
    }
    try {
      await axios.post('/api/checker/feedback', body)
      alert('검수 완료되었습니다.')
      login(userDispatch, user)
      props.history.push({
        pathname: '/main/check',
        state: {
          index: state.projectIndex,
          name: state.projectName,
        },
      })
    } catch (err) {
      alert('데이터 검수에 실패했습니다.')
    }
  }
  return (
    <Box
      sx={{
        p: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SectionTitle
        text={`[${state.projectName}] Data No.${state.index} 검수`}
      />
      <Box sx={{ m: 'auto', width: 500 }}>
        <Card sx={{ mb: 3, pb: 0 }}>
          <CardContent>
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
                  bgcolor: 'royalblue',
                }}
              >
                {state.workerId[0].toUpperCase()}
              </Avatar>
              &nbsp;
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {state.workerId}
              </Typography>
              {state.reuploaded && (
                <Typography variant="body2" color="#d33" sx={{ mr: 3 }}>
                  재제출
                </Typography>
              )}
              {state.dataNum && (
                <Typography variant="body2" color="#333">
                  {`데이터 수 ${state.dataNum}`}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              )}
              <Typography
                variant="body1"
                color="#999"
                sx={{ justifyContent: 'right' }}
              >
                {moment(state.date).format('YYYY-MM-DD hh:mmA')}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ mx: 1 }}>
              {state.comment}
            </Typography>
            {state.file && (
              <Box>
                <Button
                  href={`/staticfiles/${state.file}`}
                  target="_blank"
                  onClick={downloadHandler}
                >
                  <Avatar
                    sx={{ width: 24, height: 24, backgroundColor: '#555' }}
                  >
                    <Download sx={{ width: 16, height: 16 }} />
                  </Avatar>
                  &nbsp;{state.file}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
        <FormControl variant="standard" fullWidth>
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
        </FormControl>
      </Box>
    </Box>
  )
}

export default withRouter(CheckDataSection)
