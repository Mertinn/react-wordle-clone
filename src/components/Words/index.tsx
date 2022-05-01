import React, { useCallback, useEffect, useRef, useState } from "react";
import { Character, WordsContainer } from "./styles";

const Words = () => {
  const currentRowIndex = useRef(0);
  const [characters, setCharacters] = useState<(string | null)[][]>([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const addCharacter = useCallback(
    (character: string) => {
      const currentRow = characters[currentRowIndex.current];
      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === null) {
          const charactersCopy = [...characters];
          charactersCopy[currentRowIndex.current][i] = character;
          setCharacters(charactersCopy);
          break;
        }
      }
    },
    [characters]
  );

  const removeLastCharacter = () => {
    const currentRow = characters[currentRowIndex.current];
    for (let i = currentRow.length - 1; i >= 0; i--) {
      if (currentRow[i] !== null) {
        const charactersCopy = [...characters];
        charactersCopy[currentRowIndex.current][i] = null;
        setCharacters(charactersCopy);
        break;
      }
    }
  };

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.repeat) return;

      if (e.key.match(/^[a-z]$/)) addCharacter(e.key);

      if (e.key === "Backspace") removeLastCharacter();

      console.log(e);
    };
  }, [addCharacter]);

  return (
    <WordsContainer>
      {characters.map((row, rowIndex) =>
        row.map((element, elementIndex) => (
          <Character
            key={elementIndex + rowIndex * row.length}
            containsCharacter={!!(element || "")}
          >
            {element || ""}
          </Character>
        ))
      )}
    </WordsContainer>
  );
};

export default Words;
