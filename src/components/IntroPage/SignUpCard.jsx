// @ts-check

import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Info } from '../util/Common'

const CardBase = styled.div`
  width: 100%;
  border: 1px solid #cccccc;
  padding: 40px 20px 0 40px;
  box-sizing: border-box;
`

const TextGroup = styled.div`
  position: absolute;
`

const GoSignUp = styled.div`
  display: block;
  text-decoration: none;
  color: #30a9de;
  font-weight: 700;
  font-size: 18px;
  padding: 20px 0;
  cursor: pointer;
`

// @ts-ignore
function SignUpCard(props) {
  const onRegisterHandler = () => {
    props.history.push('/')
  }

  return (
    <CardBase>
      <TextGroup>
        <Info>
          집에서 편하게 작업하고
          <br />
          일한 만큼 받아가세요
        </Info>
        <GoSignUp onClick={onRegisterHandler}>
          회원가입 후 작업 시작하기 &gt;
        </GoSignUp>
      </TextGroup>
      <img src="./images/main-image.png" alt="" />
    </CardBase>
  )
}

export default withRouter(SignUpCard)
