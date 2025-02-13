'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import CompletionProvider from './completion-item-provider';
import { StylusDocumentSimbolsProvider } from './symbols-provider';
import { StylusColorProvider } from './color-provider';

const DOCUMENT_SELECTOR = {
  language: 'stylus',
  scheme: 'file'
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const editorConfig = vscode.workspace.getConfiguration('editor');
  console.log(editorConfig);
  const config = vscode.workspace.getConfiguration('languageStylus');
  const completionItemProvider = new CompletionProvider();
  const completionProviderDisposable = vscode.languages
    .registerCompletionItemProvider(DOCUMENT_SELECTOR, completionItemProvider, '\\.', '$', '-', '&', '@');
  context.subscriptions.push(completionProviderDisposable);

  // symbol
  const symbolsProvider = new StylusDocumentSimbolsProvider();
  const symbolsProviderDisposable = vscode.languages.registerDocumentSymbolProvider(DOCUMENT_SELECTOR, symbolsProvider);
  context.subscriptions.push(symbolsProviderDisposable);

  // color
  const colorProvider = new StylusColorProvider();
  const colorProviderDisposable = vscode.languages.registerColorProvider(DOCUMENT_SELECTOR, colorProvider);
  context.subscriptions.push(colorProviderDisposable);
}
