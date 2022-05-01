import styled, { css, keyframes } from "styled-components";

export const WordsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5em;
  width: min(100%, 329px);
`;

const StartingAnimation = keyframes`
  0%, 100% {
    transform: scale(1)
  }
  50% {
    transform: scale(1.2)
  }
`;

export const Character = styled.div<{ containsCharacter: boolean }>`
  border: 2px solid #3a3a3c;
  color: white;
  font-size: 2.3em;
  font-weight: 500;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  ${(props) =>
    props.containsCharacter &&
    css`
      animation: ${StartingAnimation} 0.2s;
    `}
`;
