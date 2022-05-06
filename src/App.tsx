import React from "react";
import { MainContainer, MainWordsContainer } from "./components/globalStyles";
import Keyboard from "./components/Keyboard";
import Notifications from "./components/Notifications";
import Words from "./components/Words";

function App() {
  return (
    <div className="App">
      <Notifications />
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
