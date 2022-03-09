// @ts-check

import {
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  const [showList, setShowList] = useState([])
  // @ts-ignore
  const [sortType, setSortType] = useState(0)
  const [worker, setWorker] = useState(-1)
  const [checker, setChecker] = useState(-1)

  async function getList() {
    const res = await axios.get('/api/admin/ralist')
    setShowList(res.data)
    setSortType(1)
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    console.log('showList updated')
  }, [showList])

  // @ts-ignore
  const workerHandler = (event) => {
    if (event.target.checked) {
      setWorker(-1)
    } else {
      setWorker(1)
    }
  }

  // @ts-ignore
  const checkerHandler = (event) => {
    if (event.target.checked) {
      setChecker(-1)
    } else {
      setChecker(2)
    }
  }

  // @ts-ignore
  const selectHandler = (event) => {
    setSortType(event.target.value)
    // @ts-ignore
    let updateList = showList
    console.log('updateList', updateList)

    if (event.target.value === 1) {
      // @ts-ignore
      updateList.sort((a, b) => {
        if (a.index < b.index) {
          return 1
        }
        if (a.index > b.index) {
          return -1
        }
      })
    } else if (event.target.value === 2) {
      // @ts-ignore
      updateList.sort((a, b) => {
        if (a.index < b.index) {
          return -1
        }
        if (a.index > b.index) {
          return 1
        }
      })
    } else if (event.target.value === 3) {
      // @ts-ignore
      updateList.sort((a, b) => {
        if (a.workNum < b.workNum) {
          return 1
        }
        if (a.workNum > b.workNum) {
          return -1
        }
      })
    } else if (event.target.value === 4) {
      // @ts-ignore
      updateList.sort((a, b) => {
        if (a.workNum < b.workNum) {
          return -1
        }
        if (a.workNum > b.workNum) {
          return 1
        }
      })
    }
    // @ts-ignore
    setShowList(updateList)
  }

  return (
    <Box sx={{ m: 5, width: '100%' }}>
      <SectionTitle text="RA 관리" />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
          mb: 2,
        }}
      >
        <Box sx={{ mr: 2 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" />}
            onChange={workerHandler}
            label="작업 RA"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" />}
            onChange={checkerHandler}
            label="검수 RA"
          />
        </Box>
        <InputLabel>정렬 기준&nbsp;&nbsp;</InputLabel>
        <Select size="small" defaultValue={1} onChange={selectHandler}>
          <MenuItem value={1}>가입일자 ↓</MenuItem>
          <MenuItem value={2}>가입일자 ↑</MenuItem>
          <MenuItem value={3}>작업량 ↓</MenuItem>
          <MenuItem value={4}>작업량 ↑</MenuItem>
        </Select>
      </Box>
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
            {showList
              // @ts-ignore
              .filter((ra) => ra.role !== worker && ra.role !== checker)
              .map((ra) => (
                <RAListTableRow info={ra} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RAListSection
