import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
const ipc = window.require("electron").ipcRenderer;

function App() {
  const [helloState, setHelloState] = useState("Loading...");

  useEffect(function () {
    ipc.on("hello-reply", (_, result) => {
      setHelloState(result);
    });
    ipc.send("hello");

    return function cleanup() {
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
      </header>
    </div>
  );
}

export default App;
