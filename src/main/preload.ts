// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Message } from '../types/openai';

export type Channels = 'ipc-example';

const electronHandler = {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  sendToGPT: (messages: Message[], filePath: string | null) => ipcRenderer.invoke("sendToGPT", messages, filePath)
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
