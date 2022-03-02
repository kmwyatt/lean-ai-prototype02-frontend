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
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useUserState } from '../../../../context/UserContext'
import SectionTitle from '../../../util/SectionTitle'

function WorkSection(props) {
  const userState = useUserState()
  const [list, setList] = useState([])

  async function getList() {
    const body = {
      index: userState.index,
    }
    const res = await axios.post('/api/worker/worklist', body)
    setList(res.data)
  }

  useEffect(() => {
    getList()
    console.log(list)
  }, [])

  return (
    <Box sx={{ m: 5, width: '100%' }}>
      <SectionTitle text="작업 현황" />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">프로젝트명</TableCell>
                <TableCell align="center">제출 파일 갯수</TableCell>
                <TableCell align="center">승인 갯수</TableCell>
                <TableCell align="center">반려 갯수</TableCell>
                <TableCell align="center">수입액</TableCell>
                <TableCell align="center">검수자 피드백</TableCell>
                <TableCell align="center">제출일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((work) => {
                return (
                  <TableRow>
                    <TableCell align="center">{work.projectName}</TableCell>
                    <TableCell align="center">{work.dataNum}</TableCell>
                    <TableCell align="center">{work.okData}</TableCell>
                    <TableCell align="center">{work.noData}</TableCell>
                    <TableCell align="center">{work.point}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          props.history.push({
                            pathname: '/main/workhistory',
                            state: {
                              workerIndex: userState.index,
                              postIndex: work.index,
                              projectIndex: work.projectIndex,
                              projectName: work.projectName,
                            },
                          })
                        }
                      >
                        보기
                      </Button>
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

export default withRouter(WorkSection)
