import React from "react";
import styled from "styled-components";
import { Emerge } from "../util/Effect";
import { Inner, H2 } from "../util/Common";

const StepBase = styled.section`
  position: relative;
  background-image: url("./images/step-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  padding: 60px 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(220, 220, 220, 0.85);
  }
`;

const StepGroup = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
`;

export default function StepSection() {
  return (
    <StepBase>
      <Inner>
        <StepGroup>
          <Emerge>
            <H2>5단계로 알아보는 LEAN-AI 작업</H2>
            <img src="./images/main-step.png" />
          </Emerge>
        </StepGroup>
      </Inner>
    </StepBase>
  );
}
