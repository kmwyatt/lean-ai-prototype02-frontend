// @ts-nocheck

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import SectionTitle from '../../../util/SectionTitle'
import JoinRequestTableRow from './JoinRequestTableRow'

function JoinRequestSection(props) {
  const state = props.location.state || 'new'
  const [list, setList] = useState([])

  async function getList() {
    const res = await axios.get('/api/admin/joinrequestlist')
    setList(res.data)
  }

  useEffect(() => {
    getList()
    console.log(list)
  }, [state])

  return (
    <Box sx={{ m: 5, width: '100%', position: 'relative' }}>
      <SectionTitle text="프로젝트 신청 승인" />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">신청자</TableCell>
                <TableCell align="center">신청 프로젝트</TableCell>
                <TableCell align="center">작성일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((request) => (
                <JoinRequestTableRow info={request} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default withRouter(JoinRequestSection)
