// @ts-check

import { Box, List } from '@mui/material'
import React from 'react'
import CommentAlert from './CommentAlert'
import FeedbackAlert from './FeedbackAlert'
import JoinedAlert from './JoinedAlert'

// @ts-ignore
function AlertList(props) {
  // @ts-ignore
  const pickAlert = (alert) => {
    console.log(alert)
    if (alert.type === 'FEEDBACK') {
      return <FeedbackAlert info={alert} />
    } else if (alert.type === 'COMMENT') {
      return <CommentAlert info={alert} />
    } else if (alert.type === 'JOINED') {
      return <JoinedAlert info={alert} />
    }
  }

  return (
    <List sx={{ width: 300 }}>
      {props.alertList.map(
        // @ts-ignore
        (alert) => pickAlert(alert)
      )}
      {props.alertList.length === 0 && (
        <Box
          sx={{
            py: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          알림이 없습니다.
        </Box>
      )}
    </List>
  )
}

export default AlertList
