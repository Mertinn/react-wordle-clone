import styled from "styled-components";

export const KeyboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 0.4em;
  width: min(100%, 460px);
`;

const BaseKey = styled.div`
  background: #818384;
  color: white;
  fill: white;
  padding: 1.5em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3em;
  font-size: 0.83em;
  font-weight: 600;
`;

export const DefaultKeyboardKey = styled(BaseKey)`
  grid-column-start: span 2;
`;

export const LargeKeyboardKey = styled(BaseKey)`
  grid-column-start: span 3;
`;
