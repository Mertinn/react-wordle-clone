import styled, { css, keyframes } from "styled-components";

const CharactersGap = "0.5em";
export const ShakeAnimationDuration = "700ms";

export const WordsContainer = styled.div`
  display: grid;
  gap: ${CharactersGap};
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

const ShakeAnimation = keyframes`
  10%, 90% {
    transform: translateX(-1px);
  }
  
  20%, 80% {
    transform: translateX(2px);
  }

  30%, 50%, 70% {
    transform: translateX(-4px);
  }

  40%, 60% {
    transform: translateX(4px);
  }
`;

export const WordsRow = styled.div<{ shaken?: boolean }>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${CharactersGap};
  ${(props) =>
    props.shaken &&
    css`
      animation: ${ShakeAnimation} ${ShakeAnimationDuration};
    `};
  z-index: -1;
`;

WordsRow.defaultProps = {
  shaken: false,
};

export const FlipAnimationDuration = "400ms";
const FlipAnimation = (background: string) => keyframes`
  0% {
    transform: rotateX(0);
  }

  50% {
    transform: rotateX(-90deg);
    background: none;
  }

  100% {
    background: ${background};
    transform: rotateX(0);
    border: 1px solid transparent;
  }
`;

const AnimationDelayMixin = css`
  &:nth-child(2) {
    animation-delay: calc(${FlipAnimationDuration});
  }
  &:nth-child(3) {
    animation-delay: calc(${FlipAnimationDuration} * 2);
  }
  &:nth-child(4) {
    animation-delay: calc(${FlipAnimationDuration} * 3);
  }
  &:nth-child(5) {
    animation-delay: calc(${FlipAnimationDuration} * 4);
  }
`;

const CharacterStatuses = {
  default: null,
  green: css`
    animation: ${FlipAnimation("#538d4e")} ${FlipAnimationDuration} forwards;
    ${AnimationDelayMixin};
  `,
  yellow: css`
    animation: ${FlipAnimation("#b59f3b")} ${FlipAnimationDuration} forwards;
    ${AnimationDelayMixin};
  `,
  filled: css`
    border: 2px solid #565758;
    animation: ${StartingAnimation} 0.15s;
  `,
  notGuessed: css`
    animation: ${FlipAnimation("rgb(58, 58, 60)")} ${FlipAnimationDuration}
      forwards;
    ${AnimationDelayMixin};
  `,
};

export type CharacterStatusType = keyof typeof CharacterStatuses;

export const Character = styled.div<{ status: CharacterStatusType }>`
  border: 2px solid #3a3a3c;
  color: white;
  font-size: 2.3em;
  font-weight: 600;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  ${(props) => CharacterStatuses[props.status]};
`;
