// @ts-check

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
import React, { useState } from 'react'
import { useEffect } from 'react'
import SectionTitle from '../../../util/SectionTitle'
import RAListTableRow from './RAListTableRow'

function RAListSection() {
  const [list, setList] = useState([])

  async function getList() {
    const res = await axios.get('/api/admin/ralist')
    setList(res.data)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <Box sx={{ m: 5, width: '100%' }}>
      <SectionTitle text="RA 관리" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">아이디</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">참여중인 프로젝트 개수</TableCell>
              <TableCell align="center">작업량</TableCell>
              <TableCell align="center">가입 일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((ra) => (
              <RAListTableRow info={ra} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RAListSection
