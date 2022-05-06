import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import {
  CharacterStatusType,
  ShakeAnimationDuration,
} from "../components/Words/styles";
import WordDictionary from "../assets/dictionary.json";
import { useNotifications } from "./notificationsContext";

interface ICharacter {
  status: CharacterStatusType;
  character: string;
}

interface IContext {
  addCharacter: (character: string) => void;
  removeLastCharacter: () => void;
  enterWord: () => void;
  characters: ICharacter[][];
  shakenRowIndex: number | null;
}

const CharactersContext = createContext(null as unknown as IContext);

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<ICharacter[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ status: "default", character: "" }))
    )
  );
  const currentRowIndex = useRef(0);
  const [shakenRowIndex, setShakenRowIndex] = useState<null | number>(null);
  const [generatedWord, setGeneratedWord] = useState(
    "badge"
    // WordDictionary[Math.floor(Math.random() * WordDictionary.length)]
  );
  const { addNotification } = useNotifications();

  const resetShakenRowAfterAnimation = () => {
    setTimeout(() => {
      setShakenRowIndex(null);
    }, parseInt(ShakeAnimationDuration));
  };

  const addCharacter = (character: string) => {
    const charactersCopy = [...characters];
    const currentRow = charactersCopy[currentRowIndex.current];
    for (let i = 0; i < currentRow.length; i++) {
      if (currentRow[i].status !== "default") continue;

      currentRow[i].character = character;
      currentRow[i].status = "filled";
      setCharacters(charactersCopy);
      break;
    }
  };

  const getEnteredWord = () => {
    let enteredWord = "";
    const currentRow = characters[currentRowIndex.current];
    for (let i = 0; i < currentRow.length; i++) {
      enteredWord += currentRow[i].character;
    }
    return enteredWord;
  };

  const checkIfWin = () => {
    return getEnteredWord() === generatedWord;
  };

  const removeLastCharacter = () => {
    const charactersCopy = [...characters];
    const currentRow = charactersCopy[currentRowIndex.current];
    for (let i = currentRow.length - 1; i >= 0; i--) {
      if (currentRow[i].status === "default") continue;

      currentRow[i].character = "";
      currentRow[i].status = "default";
      setCharacters(charactersCopy);
      break;
    }
  };

  const updateCharactersState = () => {
    const enteredWord = getEnteredWord();
    const charactersCopy = [...characters];
    const currentRow = charactersCopy[currentRowIndex.current];
    const checkedIndexes: number[] = [];
    for (let i = 0; i < enteredWord.length; i++) {
      const character = enteredWord.charAt(i);
      const currentElement = currentRow[i];
      let currentlyChecking = "green";
      for (let l = 0; l < generatedWord.length; l++) {
        if (checkedIndexes.includes(l)) continue;

        const generatedWordCharacter = generatedWord.charAt(l);
        if (
          l === i &&
          character === generatedWordCharacter &&
          currentlyChecking === "green"
        ) {
          currentElement.status = "green";
          checkedIndexes.push(l);
          break;
        } else if (
          character === generatedWordCharacter &&
          currentlyChecking === "yellow"
        ) {
          currentElement.status = "yellow";
          checkedIndexes.push(l);
          break;
        }
        currentElement.status = "notGuessed";
        if (l === generatedWord.length - 1 && currentlyChecking === "green") {
          currentlyChecking = "yellow";
          l = 0;
        }
      }
    }
    setCharacters(charactersCopy);
  };

  const enterWord = () => {
    const enteredWord = getEnteredWord();

    // Word doesnt have enough characters
    if (enteredWord.length !== 5) {
      addNotification("Not enough letters");
      setShakenRowIndex(currentRowIndex.current);
      resetShakenRowAfterAnimation();
      return;
    }

    // Word is not in the list
    if (!WordDictionary.includes(enteredWord)) {
      setShakenRowIndex(currentRowIndex.current);
      resetShakenRowAfterAnimation();
      addNotification("Not in word list");
      // return;
    }

    // Word is guessed correctly
    if (checkIfWin()) {
    }

    updateCharactersState();
    currentRowIndex.current++;
  };

  return (
    <CharactersContext.Provider
      value={{
        addCharacter,
        removeLastCharacter,
        enterWord,
        characters,
        shakenRowIndex,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacters = () => useContext(CharactersContext);
