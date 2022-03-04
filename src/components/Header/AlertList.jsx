// @ts-check

import { Box, List, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import FeedbackAlert from './FeedbackAlert'

// @ts-ignore
function AlertList(props) {
  // @ts-ignore
  const pickAlert = (alert) => {
    console.log(alert)
    if (alert.type === 'FEEDBACK') {
      return <FeedbackAlert info={alert} />
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