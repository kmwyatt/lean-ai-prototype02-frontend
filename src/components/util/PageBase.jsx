// @ts-check

import React from 'react'
import styled from '@emotion/styled'
import { Container } from '@mui/material'

const Base = styled.div`
  margin-top: 80px;
`

// @ts-ignore
function PageBase({ children }) {
  return (
    <Base>
      <Container>{children}</Container>
    </Base>
  )
}

export default PageBase
