import fs from 'node:fs'
import { createIndexFile, createTsconfig, createPackageFile, createTSup } from './src'
import { exec, execFile, spawn } from 'node:child_process';
import path, { dirname } from 'node:path';
import { renderTemplate } from './src/utils/renderTemplate'

// test
async function main() {
  renderTemplate('ts-node', 'test-render')
}

// main()
