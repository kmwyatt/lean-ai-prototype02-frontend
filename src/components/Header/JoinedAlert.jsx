// @ts-check

import { Check } from '@mui/icons-material'
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { withRouter } from 'react-router-dom'

// @ts-ignore
function JoinedAlert(props) {
  const clickHandler = () => {
    const body = {
      index: props.info.index,
    }
    console.log('body:', body)
    axios.post('/api/account/removealert', body)
    props.history.push('/main/joined')
  }

  return (
    <ListItemButton onClick={clickHandler}>
      <ListItemAvatar>
        <Avatar sx={{ backgroundColor: '#555' }}>
          <Check />
        </Avatar>
      </ListItemAvatar>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2">
          {`${props.info.content.userId}님이 신청하신 
          [${props.info.content.projectName}]이 최종 승인되었습니다. 
          가이드라인 확인 후 작업하세요.`}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'right' }} color="gray">
          {moment(props.info.date).format('YYYY-MM-DD hh:mmA')}
        </Typography>
      </Box>
    </ListItemButton>
  )
}

export default withRouter(JoinedAlert)
