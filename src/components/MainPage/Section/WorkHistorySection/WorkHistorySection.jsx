// @ts-check

import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'
import WorkHistoryCard from './WorkHistoryCard'

// @ts-ignore
function WorkHistorySection(props) {
  const userState = useUserState()
  const [list, setList] = useState([])
  const state = props.location.state

  const prevHandler = () => {
    props.history.push('/main/work')
  }

  async function getList() {
    if (userState.role === 1) {
      const body = {
        workerIndex: state.userIndex,
        projectIndex: state.projectIndex,
      }
      const res = await axios.post('/api/worker/workhistory', body)
      if (res.data && list !== res.data) {
        setList(res.data)
        console.log(res.data)
      }
    } else if (userState.role > 1) {
      const body = {
        checkerIndex: state.userIndex,
        projectIndex: state.projectIndex,
      }
      const res = await axios.post('/api/checker/workhistory', body)
      if (res.data && list !== res.data) {
        setList(res.data)
        console.log(res.data)
      }
    }
  }

  useEffect(() => {
    getList()
  }, [state])
  return (
    <Box sx={{ p: 5, width: '100%' }}>
      <Button
        variant="contained"
        size="small"
        sx={{ mb: 1 }}
        onClick={prevHandler}
      >
        이전으로
      </Button>
      <SectionTitle text={`No.${state.projectIndex} [${state.projectName}]`} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {list.map((post) => (
          <WorkHistoryCard info={post} state={state} />
        ))}
      </Box>
    </Box>
  )
}

export default withRouter(WorkHistorySection)
