// @ts-check

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'

// @ts-ignore
function RAListTableRow(props) {
  const [open, setOpen] = useState(false)

  const openHandler = () => {
    setOpen(true)
  }

  const closeHandler = () => {
    setOpen(false)
  }

  return (
    <>
      <TableRow hover onClick={openHandler}>
        <TableCell align="center">{props.info.index}</TableCell>
        <TableCell align="center">{props.info.name}</TableCell>
        <TableCell align="center">{props.info.id}</TableCell>
        <TableCell align="center">
          {props.info.role === 1 ? '작업자' : '검수자'}
        </TableCell>
        <TableCell align="center">{props.info.projectList.length}</TableCell>
        <TableCell align="center">{props.info.workNum}</TableCell>
        <TableCell align="center">
          {moment(props.info.date).format('YYYY-MM-DD hh:mmA')}
        </TableCell>
      </TableRow>
      <Dialog open={open} onClose={closeHandler} fullWidth>
        <DialogTitle>회원 정보</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">이름</TableCell>
                  <TableCell>{props.info.name}</TableCell>
                  <TableCell align="right">아이디</TableCell>
                  <TableCell>{props.info.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">상태</TableCell>
                  <TableCell>
                    {props.info.role === 1 ? '작업자' : '검수자'}
                  </TableCell>
                  <TableCell align="right">제출한 데이터 수</TableCell>
                  <TableCell>{props.info.workNum}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">이메일</TableCell>
                  <TableCell colSpan={3}>{props.info.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">참여중인 프로젝트</TableCell>
                  <TableCell colSpan={3}>
                    {props.info.projectList.map(
                      // @ts-ignore
                      (projectName) => `[${projectName}] `
                    )}
                    {props.info.projectList.length === 0 && '없음'}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RAListTableRow
