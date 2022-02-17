import React from "react";
import styled from "styled-components";

const Base = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
`;

function Empty(props) {
  return <Base>{props.text} 없습니다.</Base>;
}

export default Empty;
