// @ts-check

import { ArrowForward, Download } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

// @ts-ignore
function CommentCard(props) {
  const [profileColor, setProfileColor] = useState('gray')
  const [userId, setUserId] = useState('guest')

  useEffect(() => {
    if (props.content.role === 1) {
      setProfileColor('royalblue')
      setUserId(props.info.workerId)
    } else if (props.content.role === 2) {
      setProfileColor('darkorange')
      setUserId(props.info.checkerId)
    } else if (props.content.role === 3) {
      setProfileColor('darkgreen')
      setUserId(props.info.checkerId)
    }
  }, [props])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ArrowForward sx={{ mx: 3, mt: 1, color: '#999' }} />
      <Card sx={{ m: 1, pb: 0, flexGrow: 1 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              my: 1,
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: 12,
                bgcolor: profileColor,
              }}
            >
              {userId[0].toUpperCase()}
            </Avatar>
            &nbsp;
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {userId}
            </Typography>
            {props.content.modified && (
              <Typography variant="body2" color="#d33" sx={{ mr: 3 }}>
                승인 수정
              </Typography>
            )}
            <Typography
              variant="body1"
              color="#999"
              sx={{ justifyContent: 'right' }}
            >
              {moment(props.content.date).format('YYYY-MM-DD hh:mmA')}
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mx: 1 }}>
            {props.content.comment}
          </Typography>
          {props.content.file && (
            <Box>
              <Button
                href={`/staticfiles/${props.content.file}`}
                target="_blank"
              >
                <Avatar sx={{ width: 24, height: 24, backgroundColor: '#555' }}>
                  <Download sx={{ width: 16, height: 16 }} />
                </Avatar>
                &nbsp;{props.content.file}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default CommentCard
