import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAsync } from "react-async";
const ipc = window.require("electron").ipcRenderer;

//todo. this is incorrect.
// You should be leveraging lifecycle methods and using
// the subscriptions directly to update component state
// rather than wrapping up the ipc stuff in promises
const loadHello = async () => {
  return new Promise((resolve, _) => {
    ipc.once("hello-reply", function (_, result) {
      resolve(result);
    });
    ipc.send("hello");
  });
};

function App() {
  const { data, error, isPending } = useAsync({
    promiseFn: loadHello,
  });
  let result = "?";
  if (isPending) {
    result = "Loading...";
  } else if (error) {
    result = `Something went wrong: ${error.message}`;
  } else if (data) {
    result = data;
  }
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
          {result}
        </a>
      </header>
    </div>
  );
}

export default App;
