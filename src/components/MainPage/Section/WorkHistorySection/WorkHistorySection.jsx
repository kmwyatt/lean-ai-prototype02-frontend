// @ts-check

import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SectionTitle from '../../../util/SectionTitle'
import CommentForm from './CommentForm'
import WorkHistoryCard from './WorkHistoryCard'

// @ts-ignore
function WorkHistorySection(props) {
  const [list, setList] = useState([])
  const state = props.location.state

  const prevHandler = () => {
    props.history.push('/main/work')
  }

  async function getList() {
    const body = {
      workerIndex: state.workerIndex,
      projectIndex: state.projectIndex,
    }
    const res = await axios.post('/api/worker/workhistory', body)
    if (res.data && list !== res.data) {
      setList(res.data)
      console.log(res.data)
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
        {list.map((project) => (
          <WorkHistoryCard info={project} postIndex={state.postIndex} />
        ))}
        <CommentForm info={state} />
      </Box>
    </Box>
  )
}

export default withRouter(WorkHistorySection)
