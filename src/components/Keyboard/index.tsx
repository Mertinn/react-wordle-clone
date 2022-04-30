import React from "react";
import {
  DefaultKeyboardKey,
  KeyboardContainer,
  LargeKeyboardKey,
} from "./styles";
import { ReactComponent as BackspaceIcon } from "../../assets/backspaceIcon.svg";

const Keyboard = () => {
  return (
    <KeyboardContainer>
      <DefaultKeyboardKey>Q</DefaultKeyboardKey>
      <DefaultKeyboardKey>W</DefaultKeyboardKey>
      <DefaultKeyboardKey>E</DefaultKeyboardKey>
      <DefaultKeyboardKey>R</DefaultKeyboardKey>
      <DefaultKeyboardKey>T</DefaultKeyboardKey>
      <DefaultKeyboardKey>Y</DefaultKeyboardKey>
      <DefaultKeyboardKey>U</DefaultKeyboardKey>
      <DefaultKeyboardKey>I</DefaultKeyboardKey>
      <DefaultKeyboardKey>O</DefaultKeyboardKey>
      <DefaultKeyboardKey>P</DefaultKeyboardKey>

      <div />
      <DefaultKeyboardKey>A</DefaultKeyboardKey>
      <DefaultKeyboardKey>S</DefaultKeyboardKey>
      <DefaultKeyboardKey>D</DefaultKeyboardKey>
      <DefaultKeyboardKey>F</DefaultKeyboardKey>
      <DefaultKeyboardKey>G</DefaultKeyboardKey>
      <DefaultKeyboardKey>H</DefaultKeyboardKey>
      <DefaultKeyboardKey>J</DefaultKeyboardKey>
      <DefaultKeyboardKey>K</DefaultKeyboardKey>
      <DefaultKeyboardKey>L</DefaultKeyboardKey>
      <div />

      <LargeKeyboardKey>ENTER</LargeKeyboardKey>
      <DefaultKeyboardKey>Z</DefaultKeyboardKey>
      <DefaultKeyboardKey>X</DefaultKeyboardKey>
      <DefaultKeyboardKey>C</DefaultKeyboardKey>
      <DefaultKeyboardKey>V</DefaultKeyboardKey>
      <DefaultKeyboardKey>B</DefaultKeyboardKey>
      <DefaultKeyboardKey>N</DefaultKeyboardKey>
      <DefaultKeyboardKey>M</DefaultKeyboardKey>
      <LargeKeyboardKey>
        <BackspaceIcon />
      </LargeKeyboardKey>
    </KeyboardContainer>
  );
};

export default Keyboard;
