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
  const generatedWord = useRef("homer");

  const addCharacter = useCallback(
    (character: string) => {
      const charactersCopy = [...characters];
      const currentRow = charactersCopy[currentRowIndex.current];
      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i].status !== "default") continue;

        currentRow[i].character = character;
        currentRow[i].status = "filled";
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

  const getCharacterOccurencesInWord = (character: string) => {
    return generatedWord.current.split(character).length - 1;
  };

  const getEnteredWord = () => {
    let enteredWord = "";
    const currentRow = characters[currentRowIndex.current];
    for (let i = 0; i < currentRow.length; i++) {
      enteredWord += currentRow[i].character;
    }
    return enteredWord;
  };

  const updateCharactersState = () => {
    const enteredWord = getEnteredWord();
    const charactersCopy = [...characters];
    const currentRow = charactersCopy[currentRowIndex.current];
    const checkedIndexes: number[] = [];
    for (let i = 0; i < enteredWord.length; i++) {
      const character = enteredWord.charAt(i);
      const currentElement = currentRow[i];
      for (let l = 0; l < generatedWord.current.length; l++) {
        if (checkedIndexes.includes(l)) continue;

        const generatedWordCharacter = generatedWord.current.charAt(l);
        if (l === i && character === generatedWordCharacter) {
          currentElement.status = "green";
          checkedIndexes.push(l);
          break;
        } else if (character === generatedWordCharacter) {
          currentElement.status = "yellow";
          checkedIndexes.push(l);
          break;
        } else {
          currentElement.status = "notGuessed";
        }
      }
    }
    setCharacters(charactersCopy);
  };

  const enterWord = () => {
    const enteredWord = getEnteredWord();
    if (enteredWord.length !== 5) {
      setShakenRowIndex(currentRowIndex.current);
      setTimeout(() => {
        setShakenRowIndex(null);
      }, parseInt(ShakeAnimationDuration));
      return;
    }

    updateCharactersState();
    currentRowIndex.current++;
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
