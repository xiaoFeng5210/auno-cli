import fs from 'node:fs'
import { createIndexFile, createTsconfig, createPackageFile } from './src'

async function main() {
  
}

export async function createNodeProject(dir: string) {
  const rootDir = dir ? dir : getTemplateDir()
  if (fs.existsSync(rootDir)) {
    // 删除文件夹
    fs.rmSync(rootDir, { recursive: true, force: true });
    console.warn('The directory already delete')
  }
  fs.mkdirSync(rootDir)
  await createIndexFile(rootDir)
  await createTsconfig(rootDir)
  await createPackageFile(rootDir)
}

function getTemplateDir() {
  return 'auno-cli'
}
