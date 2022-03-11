// @ts-nocheck

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { CSVLink } from 'react-csv'
import SectionTitle from '../../../util/SectionTitle'

function PointSection(props) {
  const [list, setList] = useState([])

  let csvData = []

  async function getList() {
    const res = axios.get('/api/admin/pointlist')
    setList((await res).data)
  }

  useEffect(() => {
    getList()
    console.log(list)
  }, [])

  return (
    <Box sx={{ m: 5, width: '100%' }}>
      <SectionTitle text="포인트 정산" />

      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">이름</TableCell>
                <TableCell align="center">아이디</TableCell>
                <TableCell align="center">포인트</TableCell>
                <TableCell align="center">마지막 정산일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((data) => {
                csvData.push({
                  이름: data.name,
                  휴대폰번호: '-',
                  이메일주소: data.email,
                  지급총액: data.point,
                  주민등록번호: '',
                  은행명: '-',
                  계좌번호: '-',
                })
                return (
                  <TableRow>
                    <TableCell align="center">{data.index}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.id}</TableCell>
                    <TableCell align="center">{data.point}</TableCell>
                    <TableCell align="center">
                      {moment(data.pointUpdated).format('YYYY-MM-DD hh:mmA')}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
          <CSVLink
            data={csvData}
            filename={`${moment(Date.now()).format(
              'YYYY년 MM월 DD일'
            )} LEAN-AI 포인트 정산`}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained">정산하기</Button>
          </CSVLink>
        </Box>
      </Box>
    </Box>
  )
}

export default PointSection
