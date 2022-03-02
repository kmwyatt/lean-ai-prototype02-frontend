// @ts-check

import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

// @ts-ignore
function SectionTitle(props) {
  return (
    <Box width="100%">
      <Typography variant="h5" color="#333">
        {props.text}
      </Typography>
      <Divider sx={{ mt: 0.5, mb: 2, border: 1, color: '#ccc' }} />
    </Box>
  )
}

export default SectionTitle
