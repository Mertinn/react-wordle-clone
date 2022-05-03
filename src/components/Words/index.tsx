import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Character,
  CharacterStatusType,
  ShakeAnimationDuration,
  WordsContainer,
  WordsRow,
} from "./styles";
import WordDictionary from "../../assets/dictionary.json";

interface ICharacter {
  status: CharacterStatusType;
  character: string;
}

const Words = () => {
  const currentRowIndex = useRef(0);
  const [characters, setCharacters] = useState<ICharacter[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ status: "default", character: "" }))
    )
  );
  const [shakenRowIndex, setShakenRowIndex] = useState<null | number>(null);

  const addCharacter = useCallback(
    (character: string) => {
      const charactersCopy = [...characters];
      const currentRow = charactersCopy[currentRowIndex.current];
      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i].status !== "default") continue;

        currentRow[i].character = character;
        currentRow[i].status = "filled";
        console.log(currentRow[i]);
        setCharacters(charactersCopy);
        break;
      }
    },
    [characters]
  );

  const removeLastCharacter = useCallback(() => {
    const charactersCopy = [...characters];
    const currentRow = charactersCopy[currentRowIndex.current];
    for (let i = currentRow.length - 1; i >= 0; i--) {
      if (currentRow[i].status === "default") continue;

      currentRow[i].character = "";
      currentRow[i].status = "default";
      setCharacters(charactersCopy);
      break;
    }
  }, [characters]);

  const enterWord = () => {
    const word = characters[currentRowIndex.current].join("");
    if (word.length !== 6) {
      setShakenRowIndex(currentRowIndex.current);
      setTimeout(() => {
        setShakenRowIndex(null);
      }, parseInt(ShakeAnimationDuration));
      return;
    }
  };

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.repeat) return;

      if (e.key.match(/^[a-z]$/)) addCharacter(e.key);

      if (e.key === "Backspace") removeLastCharacter();

      if (e.key === "Enter") enterWord();

      // console.log(e);
    };
  }, [addCharacter, removeLastCharacter]);

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
