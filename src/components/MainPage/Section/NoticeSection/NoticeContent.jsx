// @ts-check

import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import SectionTitle from '../../../util/SectionTitle'

// @ts-ignore
function NoticeContent(props) {
  const state = props.location.state

  return (
    <Box sx={{ m: 5, width: '100%', position: 'relative' }}>
      <SectionTitle text="공지사항" />
      <Box>
        <Card sx={{ m: 1, pb: 0 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                my: 1,
              }}
            >
              작성자&nbsp;&nbsp;
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 12,
                  bgcolor: 'navy',
                }}
              >
                {state.writerId[0].toUpperCase()}
              </Avatar>
              &nbsp;
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {state.writerId}
              </Typography>
              <Typography
                variant="body1"
                color="#999"
                sx={{ justifyContent: 'right' }}
              >
                {moment(state.date).format('YYYY-MM-DD hh:mmA')}
              </Typography>
            </Box>
            <br />
            <Typography variant="h6" sx={{ mx: 1 }}>
              {state.title}
            </Typography>
            <br />
            <Typography variant="body1" sx={{ mx: 1, minHeight: 300 }}>
              {state.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default NoticeContent
