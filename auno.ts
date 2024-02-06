import fs from 'node:fs'
import { createIndexFile, createTsconfig, createPackageFile, createTSup } from './src'
import { exec, execFile, spawn } from 'node:child_process';

async function main() {
  exec('node -v', function(error, stdout, stderr) {
    if (error) {
      console.log(error)
      process.exit(1)
    }
    console.log(stdout)
  })
}

// main()

export async function createNodeProject(dir: string) {
  const rootDir = dir ? dir : getTemplateDir()
  if (fs.existsSync(rootDir)) {
    // 删除文件夹
    fs.rmSync(rootDir, { recursive: true, force: true });
    console.log('The directory already delete')
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
