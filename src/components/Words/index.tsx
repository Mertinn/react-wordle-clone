import React, { useEffect } from "react";
import { Character, WordsContainer, WordsRow } from "./styles";
import { useCharacters } from "../../contexts/charactersContext";

const Words = () => {
  const {
    addCharacter,
    removeLastCharacter,
    enterWord,
    characters,
    shakenRowIndex,
  } = useCharacters();
  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.repeat) return;

      if (e.key.match(/^[a-z]$/)) addCharacter(e.key);

      if (e.key === "Backspace") removeLastCharacter();

      if (e.key === "Enter") enterWord();

      // console.log(e);
    };
  }, [addCharacter, enterWord, removeLastCharacter]);

  return (
    <WordsContainer>
      {characters.map((row, rowIndex) => (
        <WordsRow key={rowIndex} shaken={shakenRowIndex === rowIndex}>
          {row.map((element, elementIndex) => (
            <Character key={elementIndex} status={element.status}>
              {element.character}
            </Character>
          ))}
        </WordsRow>
      ))}
    </WordsContainer>
  );
};

export default Words;
