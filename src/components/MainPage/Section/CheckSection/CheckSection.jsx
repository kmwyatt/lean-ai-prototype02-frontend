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
import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'

function CheckSection(props) {
  const state = props.location.state

  console.log(state)

  const userState = useUserState()
  const [list, setList] = useState([])

  async function getList() {
    const body = {
      index: state.index,
    }
    const res = await axios.post('/api/checker/checklist', body)
    setList(res.data)
  }

  useEffect(() => {
    getList()
  }, [state])

  function rowClickHandler(work) {
    if (work.checking < 0) {
      alert('검수 완료된 데이터입니다.')
      return
    } else if (work.checking > 0) {
      if (work.checking !== userState.index) {
        alert('다른 검수자가 검수중인 데이터입니다.')
        return
      }
    }
    if (userState.checking && userState.index !== work.checking) {
      alert(`진행중인 ${userState.checking}번 데이터 검수를 완료해주세요.`)
      return
    }
    props.history.push({
      pathname: '/main/checkdata',
      state: {
        ...work,
      },
    })
    console.log(work)
  }

  return (
    <Box sx={{ m: 5, width: '100%' }}>
      <SectionTitle text={`No. ${state.index} [${state.name}] 데이터 검수`} />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">작성자</TableCell>
                <TableCell align="center">데이터 수</TableCell>
                <TableCell align="center">상태</TableCell>
                <TableCell align="center">제출일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((work) => {
                return (
                  <TableRow hover onClick={() => rowClickHandler(work)}>
                    <TableCell align="center">{work.index}</TableCell>
                    <TableCell align="center">{work.workerId}</TableCell>
                    <TableCell align="center">{work.dataNum}</TableCell>
                    <TableCell align="center">
                      {work.checking === 0 && '검수 전'}
                      {work.checking > 0 && '검수 중'}
                      {work.checking < 0 && '검수 완료'}
                    </TableCell>
                    <TableCell align="center">
                      {moment(work.date).format('YYYY-MM-DD hh:mmA')}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default withRouter(CheckSection)
