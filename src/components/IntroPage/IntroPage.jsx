// @ts-check

import React from 'react'
import PageBase from '../util/PageBase'
import IntroBanner from './IntroBanner'
import MainSection from './MainSection'
import QnaSection from './QnaSection'
import StepSection from './StepSection'

function IntroPage() {
  return (
    <>
      <IntroBanner />
      <MainSection />
      <StepSection />
      <QnaSection />
    </>
  )
}

export default IntroPage
