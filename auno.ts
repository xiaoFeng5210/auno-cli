import fs from 'node:fs'
import { createIndexFile, createTsconfig } from './src'

// main()
async function main() {
  const rootDir = getTemplateDir()

  if (fs.existsSync(getTemplateDir())) {
    // 删除文件夹
    fs.rmSync(rootDir, { recursive: true, force: true });
    console.warn('The directory already delete')
  }
  fs.mkdirSync(rootDir)
  await createIndexFile(rootDir)
  await createTsconfig(rootDir)
}

export async function createProject(rootDir: string) {
  console.log(`创建项目${rootDir}`)
}




function getTemplateDir() {
  return 'auno-cli'
}
