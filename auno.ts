import fs from 'node:fs'
import { createIndexFile, createTsconfig, createPackageFile, createTSup } from './src'
import { exec, execFile, spawn } from 'node:child_process';
import path, { dirname } from 'node:path';

async function main() {
  renderTemplate('ts-node')
}

main()

export async function renderTemplate(templateRoot: string, target?: string) {
  const cwd = process.cwd()
  const dirPathPrefix = path.resolve(cwd, 'src/template')
  const dirPath = path.join(dirPathPrefix, templateRoot)
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    readRoot(files)
  })
}

function readRoot(files: fs.Dirent[]) {
  // 列出根目录所有
  for (let f of files) {
    if (f.name !== 'node_modules') {
      if (f.isDirectory()) {
        recursionDir(f.name, f.path)
      }
      else {
        const filePath = path.join(f.path, f.name)
        console.log(filePath)
      }
    }
  }
}

function recursionDir(dirName: string, dirPath: string) {
  const currentDirPath = path.join(dirPath, dirName);
  const child = fs.readdirSync(currentDirPath, { withFileTypes: true })
  if (Array.isArray(child) && child.length > 0) {
    for (let c of child) {
      if (c.isDirectory()) {
        recursionDir(c.name, currentDirPath)
      }
      else {
        const filePath = path.join(currentDirPath, c.name)
        console.log(filePath)
      }
    }
  }
}

export async function createNodeProject(dir: string) {
  const rootDir = dir ? dir : getTemplateDir()
  if (fs.existsSync(rootDir)) {
    // 删除文件夹
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
  fs.mkdirSync(rootDir)
  fs.mkdirSync(`${rootDir}/src`)
  fs.mkdirSync(`${rootDir}/assets`)
  await createBase(rootDir)
}

async function createBase(dir: string) {
  await createIndexFile(dir)
  await createTsconfig(dir)
  await createPackageFile(dir)
  createTSup(dir)
}

function getTemplateDir() {
  return 'auno-cli'
}
