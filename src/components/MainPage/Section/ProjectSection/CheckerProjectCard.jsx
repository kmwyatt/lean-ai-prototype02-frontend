// @ts-check

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React from 'react'
import { withRouter } from 'react-router-dom'

// @ts-ignore
function CheckerProjectCard(props) {
  return (
    <Card sx={{ m: 1, width: 270, height: 330, position: 'relative' }}>
      <CardMedia
        component="img"
        height="140"
        image={`/staticfiles/${props.info.image}`}
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h6" component="div">
          {props.info.name}
        </Typography>
        <Typography sx={{ mb: 1, fontSize: 14 }} color="text.secondary">
          작업 단가 : {props.info.point}P
        </Typography>
        <Typography variant="body2">{props.info.period}</Typography>
      </CardContent>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          mx: 'auto',
          bottom: 0,
        }}
      >
        <CardActions sx={{ mx: 1, display: 'flex' }}>
          <Button
            size="small"
            variant="contained"
            sx={{ flexGrow: 1 }}
            href={props.info.link}
            target="_blank"
          >
            상세정보 확인
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ flexGrow: 1, ml: 1 }}
            onClick={() =>
              props.history.push({
                pathname: '/main/check',
                state: {
                  ...props.info,
                },
              })
            }
          >
            데이터 검수
          </Button>
        </CardActions>
        <Box
          sx={{
            mb: 1,
            ml: -0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="error">
            &nbsp;
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default withRouter(CheckerProjectCard)
