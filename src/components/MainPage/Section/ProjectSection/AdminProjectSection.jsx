// @ts-check

import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'
import AddProjectCard from './AddProjectCard'
import AdminProjectCard from './AdminProjectCard'

// @ts-ignore
function AdminProjectSection(props) {
  const state = props.location.state || 'new'
  const userState = useUserState()
  const [list, setList] = useState([])

  async function getList() {
    const res = await axios.get('/api/admin/projectlist')
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
      <SectionTitle text="프로젝트 관리" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {list.map((project) => (
          <AdminProjectCard info={project} userIndex={userState.index} />
        ))}
        <AddProjectCard />
      </Box>
    </Box>
  )
}

export default withRouter(AdminProjectSection)
