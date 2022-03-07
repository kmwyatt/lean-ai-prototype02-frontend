// @ts-check

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'

// @ts-ignore
function CheckedUploadSection(props) {
  const userState = useUserState()

  const [worker, setWorker] = useState('')
  const [checker, setChecker] = useState(userState.id)
  const [project, setProject] = useState('')
  const [dataNum, setDataNum] = useState('')
  const [feedback, setFeedback] = useState('')
  const [file, setFile] = useState(undefined)

  // @ts-ignore
  const workerHandler = (event) => {
    setWorker(event.target.value)
  }

  // @ts-ignore
  const checkerHandler = (event) => {
    setChecker(event.target.value)
  }

  // @ts-ignore
  const projectHandler = (event) => {
    setProject(event.target.value)
  }

  //@ts-ignore
  const dataNumHandler = (event) => {
    setDataNum(event.target.value)
  }

  // @ts-ignore
  const feedbackHandler = (event) => {
    setFeedback(event.target.value)
  }

  // @ts-ignore
  const fileHandler = (event) => {
    setFile(event.target.files[0])
  }

  // @ts-ignore
  const submitHandler = async (event) => {
    event.preventDefault()
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const formData = new FormData()

    // @ts-ignore
    formData.append('file', file)
    formData.append('workerId', worker)
    formData.append('checkerId', checker)
    formData.append('projectName', project)
    formData.append('dataNum', dataNum)
    formData.append('feedback', feedback)

    try {
      await axios.post('/api/checker/checkedupload', formData, config)
      alert('업로드 되었습니다.')
      props.history.push('/main/project')
    } catch (err) {
      alert('업로드에 실패했습니다.')
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
      <SectionTitle text="검수완료 데이터 업로드" />
      <Box sx={{ m: 'auto', width: 500 }}>
        <Card variant="outlined">
          <CardContent>
            업로드 전 주의 사항 <br />
            <br />
            1. Apple <br />
            2. Banana <br />
            3. Cherry
          </CardContent>
        </Card>
        <br />
        <Card variant="outlined">
          <CardContent>
            <FormControl variant="standard" fullWidth>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  variant="standard"
                  label="작업자"
                  value={worker}
                  fullWidth
                  sx={{ mr: 1 }}
                  onChange={workerHandler}
                />
                <TextField
                  variant="standard"
                  disabled
                  label="검수자"
                  value={checker}
                  fullWidth
                  sx={{ ml: 1 }}
                  onChange={checkerHandler}
                />
              </Box>
              <br />
              <Box sx={{ display: 'flex' }}>
                <TextField
                  variant="standard"
                  label="프로젝트명"
                  value={project}
                  fullWidth
                  sx={{ mr: 1 }}
                  onChange={projectHandler}
                />
                <TextField
                  variant="standard"
                  label="데이터 수"
                  value={dataNum}
                  sx={{ ml: 1 }}
                  onChange={dataNumHandler}
                />
              </Box>
              <br />
              <TextField
                variant="standard"
                label="검수자 피드백"
                value={feedback}
                fullWidth
                onChange={feedbackHandler}
              />
              <br />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="file"
                  style={{ width: '100%' }}
                  onChange={fileHandler}
                />
                <Button
                  variant="contained"
                  sx={{ width: 80 }}
                  onClick={submitHandler}
                >
                  업로드
                </Button>
              </Box>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default withRouter(CheckedUploadSection)
