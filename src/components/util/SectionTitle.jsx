// @ts-check

import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function SectionTitle() {
  return (
    <Box>
      <Typography variant="h5" color="#333">
        신청 가능 작업 목록
      </Typography>
      <Divider sx={{ mt: 0.5, mb: 1, border: 1, color: '#ccc' }} />
    </Box>
  )
}

export default SectionTitle
