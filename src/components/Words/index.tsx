import React from "react";
import { Character, WordsContainer } from "./styles";

const Words = () => {
  const rows = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  return (
    <WordsContainer>
      {rows.map((row) =>
        row.map((element) => <Character>{element || ""}</Character>)
      )}
    </WordsContainer>
  );
};

export default Words;
