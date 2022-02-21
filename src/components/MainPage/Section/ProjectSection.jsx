// @ts-check

import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from '../../util/SectionTitle'
import ProjectCard from './ProjectCard'

function ProjectSection() {
  return (
    <Box sx={{ margin: 5, width: '100%' }}>
      <SectionTitle />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </Box>
    </Box>
  )
}

export default ProjectSection
