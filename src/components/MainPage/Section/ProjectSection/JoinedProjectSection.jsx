// @ts-check

import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'
import JoinedProjectCard from './JoinedProjectCard'

function JoinedProjectSection() {
  const userState = useUserState()
  const [list, setList] = useState([])

  async function getList() {
    const body = {
      userIndex: userState.index,
    }
    const res = await axios.post('/api/worker/joinedlist', body)
    if (res.data && list !== res.data) {
      setList(res.data)
      console.log(res.data)
    }
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <Box sx={{ p: 5, width: '100%' }}>
      <SectionTitle text="할당된 작업 목록" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {list.map((project) => (
          <JoinedProjectCard info={project} userIndex={userState.index} />
        ))}
      </Box>
    </Box>
  )
}

export default JoinedProjectSection
