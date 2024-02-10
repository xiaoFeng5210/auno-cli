import fs from 'node:fs'
import { createIndexFile, createTsconfig, createPackageFile, createTSup } from './src'
import { exec, execFile, spawn } from 'node:child_process';
import path, { dirname } from 'node:path';

async function main() {
  renderTemplate('ts-node', 'test-render')
}

main()

export async function renderTemplate(templateRoot: string, target?: string) {
  const cwd = process.cwd()
  const dirPathPrefix = path.resolve(cwd, 'src/template')
  const dirPath = path.join(dirPathPrefix, templateRoot)
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    readRootAndCopy(files, target)
  })
}

function readRootAndCopy(files: fs.Dirent[], target: string) {
  if (fs.existsSync(target)) {
    // 删除文件夹
    fs.rmSync(target, { recursive: true, force: true });
  }
  fs.mkdirSync(target)
  const targetRealPath = path.resolve(process.cwd(), target)
  // 列出根目录所有
  for (let f of files) {
    if (f.name !== 'node_modules') {
      if (f.isDirectory()) {
        fs.mkdirSync(path.join(targetRealPath, f.name))
        recursionDir(f.name, f.path, targetRealPath)
      }
      else {
        const filePath = path.join(f.path, f.name)
        const destPath = path.join(targetRealPath, f.name)
        fs.copyFileSync(filePath, destPath)
      }
    }
  }
}

function recursionDir(dirName: string, dirPath: string, targetRealPath: string) {
  const currentDirPath = path.join(dirPath, dirName);
  const child = fs.readdirSync(currentDirPath, { withFileTypes: true })
  if (Array.isArray(child) && child.length > 0) {
    for (let c of child) {
      if (c.isDirectory()) {
        // 在目标文件夹创建同名文件夹
        fs.mkdirSync(path.join(targetRealPath, c.name))
        recursionDir(c.name, currentDirPath, path.join(targetRealPath, c.name))
      }
      else {
        console.log(targetRealPath)
        const filePath = path.join(c.path, c.name)
        const destPath = path.join(targetRealPath, c.name)
        
        fs.copyFileSync(filePath, destPath)
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
