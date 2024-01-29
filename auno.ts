import fs from 'node:fs'
import { createIndexFile } from './src'

const rootDir = getTemplateDir()

if (fs.existsSync(getTemplateDir())) {
  // 删除文件夹
  fs.rmSync(rootDir, { recursive: true, force: true });
  console.warn('The directory already delete')
}
fs.mkdirSync(rootDir)
await createIndexFile(rootDir)


function getTemplateDir() {
  return 'auno-cli'
}
