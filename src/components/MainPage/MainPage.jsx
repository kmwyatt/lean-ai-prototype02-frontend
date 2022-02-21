// @ts-check

import { Container } from '@mui/material'
import React from 'react'
import WorkerMenu from './AsideMenu/WorkerMenu'
import ProjectSection from './Section/ProjectSection'

function MainPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: '100vh', display: 'flex', pt: 8 }}
    >
      <WorkerMenu />
      <ProjectSection />
    </Container>
  )
}

export default MainPage
