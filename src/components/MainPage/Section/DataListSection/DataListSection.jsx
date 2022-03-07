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
import React, { useState } from 'react'
import { useEffect } from 'react'
import SectionTitle from '../../../util/SectionTitle'
import DataListTableRow from './DataListTableRow'

function DataListSection() {
  const [list, setList] = useState([])

  async function getList() {
    const res = await axios.get('/api/admin/datalist')
    setList(res.data)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <Box sx={{ m: 5, width: '100%' }}>
      <SectionTitle text="검수완료 데이터" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">작업자</TableCell>
              <TableCell align="center">프로젝트명</TableCell>
              <TableCell align="center">데이터 개수</TableCell>
              <TableCell align="center">작성일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((data) => (
              <DataListTableRow info={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default DataListSection
