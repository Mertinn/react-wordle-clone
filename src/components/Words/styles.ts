import styled from "styled-components";

export const WordsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5em;
  width: min(100%, 329px);
`;

export const Character = styled.div`
  border: 2px solid #3a3a3c;
  color: white;
  font-size: 2.5em;
  font-weight: 500;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
