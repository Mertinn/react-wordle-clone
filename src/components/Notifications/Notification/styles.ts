import styled, { css } from "styled-components";

export const AnimationDuration = "500ms";

export const NotificationContainer = styled.div<{ animating: boolean }>`
  color: black;
  background: white;
  font-weight: bold;
  padding: 0.8em 1.5em;
  border-radius: 0.3em;
  max-width: 70%;
  transition: ${AnimationDuration};
  ${(props) =>
    props.animating &&
    css`
      opacity: 0;
    `}
`;
