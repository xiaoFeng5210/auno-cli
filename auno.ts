import fs from 'node:fs'
import { createIndexFile, createTsconfig } from './src'

async function main() {
  
}

export async function createNodeProject(dir: string) {
  const rootDir = dir ? dir : getTemplateDir()
  if (fs.existsSync(getTemplateDir())) {
    // 删除文件夹
    fs.rmSync(rootDir, { recursive: true, force: true });
    console.warn('The directory already delete')
  }
  fs.mkdirSync(rootDir)
  await createIndexFile(rootDir)
  await createTsconfig(rootDir)
}

function getTemplateDir() {
  return 'auno-cli'
}
