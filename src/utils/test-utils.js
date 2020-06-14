import React from "react";
import createIPCMock from "electron-mock-ipc";
import { render } from "@testing-library/react";

const customRender = (ui, options) => render(ui, { ...options });
const mocked = createIPCMock();
const ipcMain = mocked.ipcMain;
const ipcRenderer = mocked.ipcRenderer;

export * from "@testing-library/react";
export { customRender as render, ipcMain, ipcRenderer };
