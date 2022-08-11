/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
import * as vscode from 'vscode';
// import * as path from 'path';

let juvixStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  // Create and show the status bar item
  juvixStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  context.subscriptions.push(juvixStatusBarItem);

  const { spawnSync } = require('child_process');
  const ls = spawnSync('juvix', ['--version']);
  let execJuvixVersion: string;
  if (ls.status !== 0) {
    vscode.window.showInformationMessage('Juvix binary not found');
    execJuvixVersion = ls.stderr.toString();
    juvixStatusBarItem.text = 'Juvix not found';
  } else {
    execJuvixVersion = ls.stdout.toString();
    const juvixBinaryVersion: string = execJuvixVersion.split('\n')[0];
    juvixStatusBarItem.text = '🛠️ ' + juvixBinaryVersion;
  }
  context.subscriptions.push(
    vscode.commands.registerCommand('juvix.getBinaryVersion', () => {
      vscode.window.showInformationMessage(execJuvixVersion, { modal: true });
    })
  );
  juvixStatusBarItem.show();
}
