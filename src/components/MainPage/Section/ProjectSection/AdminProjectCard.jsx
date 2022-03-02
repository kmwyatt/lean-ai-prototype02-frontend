// @ts-check

import { PriorityHigh } from '@mui/icons-material'
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

// @ts-ignore
function AdminProjectCard(props) {
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
        sx={{ position: 'absolute', left: 0, right: 0, mx: 'auto', bottom: 0 }}
      >
        <CardActions sx={{ mx: 1, display: 'flex' }}>
          <Button size="small" variant="contained" sx={{ flexGrow: 1 }}>
            수정
          </Button>
          <Button size="small" variant="contained" sx={{ flexGrow: 1 }}>
            삭제
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
          <PriorityHigh fontSize="small" color="error" />
          <Typography sx={{ fontSize: 14 }} color="error">
            삭제 후 복구 불가
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default AdminProjectCard
