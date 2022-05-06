import React from "react";
import {
  DefaultKeyboardKey,
  KeyboardContainer,
  LargeKeyboardKey,
} from "./styles";
import { ReactComponent as BackspaceIcon } from "../../assets/backspaceIcon.svg";
import { useCharacters } from "../../contexts/charactersContext";

const Keyboard = () => {
  const { addCharacter, enterWord, removeLastCharacter } = useCharacters();
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  return (
    <KeyboardContainer>
      {keys[0].map((char, index) => (
        <DefaultKeyboardKey key={index} onClick={() => addCharacter(char)}>
          {char}
        </DefaultKeyboardKey>
      ))}

      <div />
      {keys[1].map((char, index) => (
        <DefaultKeyboardKey key={index} onClick={() => addCharacter(char)}>
          {char}
        </DefaultKeyboardKey>
      ))}
      <div />

      <LargeKeyboardKey onClick={() => enterWord()}>ENTER</LargeKeyboardKey>
      {keys[2].map((char, index) => (
        <DefaultKeyboardKey key={index} onClick={() => addCharacter(char)}>
          {char}
        </DefaultKeyboardKey>
      ))}
      <LargeKeyboardKey onClick={() => removeLastCharacter()}>
        <BackspaceIcon />
      </LargeKeyboardKey>
    </KeyboardContainer>
  );
};

export default Keyboard;
