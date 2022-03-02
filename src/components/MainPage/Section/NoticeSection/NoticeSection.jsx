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
import NoticePlusBtn from './NoticePlusBtn'

function NoticeSection(props) {
  const state = props.location.state || 'new'
  const userState = useUserState()
  const [list, setList] = useState([])

  async function getList() {
    const body = {
      index: userState.index,
    }
    const res = axios.post('/api/account/noticelist', body)
    setList((await res).data)
  }

  useEffect(() => {
    getList()
    console.log(list)
  }, [state])

  return (
    <Box sx={{ m: 5, width: '100%', position: 'relative' }}>
      <SectionTitle text="공지사항" />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작성자</TableCell>
                <TableCell align="center">작성일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((notice) => {
                return (
                  <TableRow
                    hover
                    onClick={() =>
                      props.history.push({
                        pathname: '/main/noticecontent',
                        state: {
                          ...notice,
                        },
                      })
                    }
                  >
                    <TableCell align="center">{notice.index}</TableCell>
                    <TableCell align="center">{notice.title}</TableCell>
                    <TableCell align="center">{notice.writerId}</TableCell>
                    <TableCell align="center">
                      {moment(notice.date).format('YYYY-MM-DD hh:mmA')}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ position: 'absolute', right: 0, mt: 2 }}>
          {userState.role === 3 && (
            <NoticePlusBtn
              info={{ writerIndex: userState.Index, writerId: userState.id }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default withRouter(NoticeSection)
