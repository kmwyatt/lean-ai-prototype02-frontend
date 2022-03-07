// @ts-check

import { Download } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'

// @ts-ignore
function DataListTableRow(props) {
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
        <TableCell align="center">{props.info.workerId}</TableCell>
        <TableCell align="center">{props.info.projectName}</TableCell>
        <TableCell align="center">{props.info.dataNum}</TableCell>
        <TableCell align="center">
          {moment(props.info.date).format('YYYY-MM-DD hh:mmA')}
        </TableCell>
      </TableRow>
      <Dialog open={open} onClose={closeHandler} fullWidth>
        <DialogTitle>{`검수완료 데이터 No.${props.info.index}`}</DialogTitle>
        <DialogContent>
          <Box sx={{ mx: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Typography
                sx={{ flexGrow: 1 }}
              >{`작업자 : ${props.info.workerId}`}</Typography>
              <Typography
                sx={{ flexGrow: 1 }}
              >{`검수자 : ${props.info.checkerId}`}</Typography>
              <Typography
                sx={{ flexGrow: 1 }}
              >{`데이터 개수 : ${props.info.dataNum}`}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>{`프로젝트명 : ${props.info.projectName}`}</Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography>{`검수자 피드백 : ${props.info.feedback}`}</Typography>
            </Box>
            <Box>
              <Button
                href={`/staticfiles/${props.info.file}`}
                download={`잡쇼퍼_${props.info.projectName}_${
                  props.info.dataNum
                }_${moment(Date.now()).format('YYYY-MM-DD-hhmmA')}`}
              >
                <Avatar sx={{ width: 24, height: 24, backgroundColor: '#555' }}>
                  <Download sx={{ width: 16, height: 16 }} />
                </Avatar>
                &nbsp;&nbsp;파일 다운로드
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DataListTableRow
