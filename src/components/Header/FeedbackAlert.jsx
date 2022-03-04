// @ts-check

import { FactCheck } from '@mui/icons-material'
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
function FeedbackAlert(props) {
  const clickHandler = () => {
    const body = {
      index: props.info.index,
    }
    console.log('body:', body)
    axios.post('/api/account/removealert', body)
    props.history.push({
      pathname: '/main/workhistory',
      state: {
        workerIndex: props.info.userIndex,
        postIndex: props.info.content.postIndex,
        projectIndex: props.info.content.projectIndex,
        projectName: props.info.content.projectName,
      },
    })
  }

  return (
    <ListItemButton onClick={clickHandler}>
      <ListItemAvatar>
        <Avatar sx={{ backgroundColor: '#555' }}>
          <FactCheck />
        </Avatar>
      </ListItemAvatar>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2">
          {`${moment(props.info.content.postDate).format(
            'YYYY-MM-DD hh:mmA'
          )}에 제출하신 [${props.info.content.projectName}] 데이터에
          피드백이 달렸습니다. 지금 확인해보세요!`}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'right' }} color="gray">
          {moment(props.info.date).format('YYYY-MM-DD hh:mmA')}
        </Typography>
      </Box>
    </ListItemButton>
  )
}

export default withRouter(FeedbackAlert)
