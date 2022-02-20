// @ts-check

import React from 'react'
import styled from 'styled-components'
import { FadeIn, Floating } from '../util/Effect'
import { Inner, CoverImg } from '../util/Common'
import { Container } from '@mui/material'

const BannerBase = styled.section`
  background: #30a9de;
  padding-top: 100px;
`

const ImageGroup = styled.div`
  width: 100%;
  height: 414px;
`

function IntroBanner() {
  return (
    <BannerBase>
      <Container maxWidth="lg">
        <Inner>
          <ImageGroup>
            <FadeIn>
              <CoverImg src="./images/main-banner01.png" />
              <CoverImg src="./images/main-banner02.png" />
              <CoverImg src="./images/main-banner03.png" />
            </FadeIn>
            <Floating>
              <></>
              <CoverImg src="./images/main-banner04.png" />
            </Floating>
          </ImageGroup>
        </Inner>
      </Container>
    </BannerBase>
  )
}

export default IntroBanner
