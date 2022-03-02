// @ts-check

import { Download } from '@mui/icons-material'
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
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'

// @ts-ignore
function WorkHistoryCard(props) {
  const [bgcolor, setBgcolor] = useState('#fff')
  const [thisPost, setThisPost] = useState(false)

  useEffect(() => {
    if (props.info.index === props.state.postIndex) {
      setBgcolor('#ffe')
      setThisPost(true)
    }
  }, [])

  return (
    <>
      <Card sx={{ m: 1, pb: 0, backgroundColor: bgcolor }}>
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
              sx={{ width: 24, height: 24, fontSize: 12, bgcolor: 'royalblue' }}
            >
              {props.info.workerId[0].toUpperCase()}
            </Avatar>
            &nbsp;
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {props.info.workerId}
            </Typography>
            {props.info.reuploaded && (
              <Typography variant="body2" color="#d33" sx={{ mr: 3 }}>
                재제출
              </Typography>
            )}
            {props.info.dataNum && (
              <Typography variant="body2" color="#333">
                {`데이터 수 ${props.info.dataNum}`}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`승인 ${props.info.okData}`}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`반려 ${props.info.noData}`}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`수입액 ${props.info.point}`}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            )}
            <Typography
              variant="body1"
              color="#999"
              sx={{ justifyContent: 'right' }}
            >
              {moment(props.info.date).format('YYYY-MM-DD hh:mmA')}
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mx: 1 }}>
            {props.info.comment}
          </Typography>
          {props.info.file && (
            <Box>
              <Button href={`/staticfiles/${props.info.file}`} target="_blank">
                <Avatar sx={{ width: 24, height: 24, backgroundColor: '#555' }}>
                  <Download sx={{ width: 16, height: 16 }} />
                </Avatar>
                &nbsp;{props.info.file}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      {props.info.commentList &&
        // @ts-ignore
        props.info.commentList.map((_comment) => (
          <CommentCard content={_comment} info={props.info} />
        ))}
      {thisPost && <CommentForm info={props.state} />}
    </>
  )
}

export default WorkHistoryCard
