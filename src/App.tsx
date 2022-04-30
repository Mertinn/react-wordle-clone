import React from "react";
import { MainContainer } from "./components/globalStyles";
import Keyboard from "./components/Keyboard";

function App() {
  return (
    <div className="App">
      <MainContainer>
        <Keyboard />
      </MainContainer>
    </div>
  );
}

export default App;
