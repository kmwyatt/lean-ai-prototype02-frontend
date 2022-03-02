// @ts-check

import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'
import CheckerProjectCard from './CheckerProjectCard'

// @ts-ignore
function CheckerProjectSection(props) {
  const state = props.location.state || 'new'
  const userState = useUserState()
  const [list, setList] = useState([])

  async function getList() {
    const body = {
      userIndex: userState.index,
    }
    const res = await axios.post('/api/checker/projectlist', body)
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
      <SectionTitle text="신청 가능 작업 목록" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {list.map((project) => (
          <CheckerProjectCard info={project} userInfo={userState} />
        ))}
      </Box>
    </Box>
  )
}

export default withRouter(CheckerProjectSection)
