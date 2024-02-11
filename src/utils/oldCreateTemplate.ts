import fs from 'node:fs'
import { createIndexFile, createTsconfig, createPackageFile, createTSup } from '..'

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
