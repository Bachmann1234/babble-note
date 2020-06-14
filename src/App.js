import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
const ipc = window.require("electron").ipcRenderer;

function App() {
  const [helloState, setHelloState] = useState("Click The Button");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    ipc.on("hello-reply", (_, result) => {
      setButtonDisabled(false);
      setHelloState(result);
    });
    return () => {
      ipc.removeAllListeners("hello-reply");
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {helloState}
        </a>
        <br />
        <button
          onClick={() => {
            setButtonDisabled(true);
            setHelloState("Loading Hello!");
            ipc.send("hello");
          }}
          disabled={buttonDisabled}
        >
          Click Me
        </button>
      </header>
    </div>
  );
}

export default App;
