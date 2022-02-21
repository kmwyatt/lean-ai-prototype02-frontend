// @ts-check

import { PriorityHigh } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import React from 'react'

function ProjectCard() {
  return (
    <Card sx={{ m: 1, width: 210, height: 240, position: 'relative' }}>
      <CardContent sx={{ pb: 0 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          No. 1
        </Typography>
        <Typography variant="h6" component="div">
          AI 학습용 데이터 수집
        </Typography>
        <Typography sx={{ mb: 1, fontSize: 14 }} color="text.secondary">
          작업 조건 : 20세 이상
        </Typography>
        <Typography variant="body2">
          재택근무 / 건당 300원 / PC업로드
        </Typography>
      </CardContent>
      <Box sx={{ position: 'absolute', bottom: 0 }}>
        <CardActions sx={{ mx: 1, display: 'flex' }}>
          <Button size="small" variant="contained" sx={{ flexGrow: 1 }}>
            상세정보 확인
          </Button>
          <Button size="small" variant="contained" sx={{ flexGrow: 1 }}>
            작업 신청
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
            상세정보 확인 후 작업 신청
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default ProjectCard
