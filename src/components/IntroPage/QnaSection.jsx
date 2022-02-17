import React from "react";
import styled from "styled-components";
import { Inner, H3 } from "../util/Common";

// QNA-SECTION
const QnaBase = styled.section`
  background: #ffffff;
  padding: 60px 0;
`;

const QnaGroup = styled.div`
  margin-left: 60px;
  line-height: 2;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default function QnaSection() {
  return (
    <QnaBase>
      <Inner>
        <img src="./images/main-qna.png" />
        <QnaGroup>
          <H3>궁금하신 점이 있으신가요?</H3>
          <p>
            우측 하단의 채널톡 아이콘을 클릭해서 문의를 진행해주세요! <br />
            최대한 빠른 시간 안에 답변 드리겠습니다.
          </p>
          <p>상담 가능 시간 (평일 오전 10시 ~ 오후 5시)</p>
          <br />
        </QnaGroup>
      </Inner>
    </QnaBase>
  );
}
