import React from "react";
import { fireEvent } from "@testing-library/react";
import { render, ipcMain } from "test-utils";
import App from "./App";

test("Renders link text when button hit", async () => {
  ipcMain.once("hello", (event, _) => {
    event.sender.send("hello-reply", "Tested!");
  });
  const { getByText, findByText } = render(<App />);
  expect(getByText(/Click The Button/i)).toBeInTheDocument();
  fireEvent.click(getByText("Click Me"));
  const result = await findByText(/Tested!/);
  expect(result).toBeDefined();
});
