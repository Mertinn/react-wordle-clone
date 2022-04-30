import React from "react";
import { MainContainer, MainWordsContainer } from "./components/globalStyles";
import Keyboard from "./components/Keyboard";
import Words from "./components/Words";

function App() {
  return (
    <div className="App">
      <MainContainer>
        <MainWordsContainer>
          <Words />
        </MainWordsContainer>
        <Keyboard />
      </MainContainer>
    </div>
  );
}

export default App;
