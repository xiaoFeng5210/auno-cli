import fs from 'node:fs'
import path, { dirname } from 'node:path';

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
  const needCopyDirPath = path.join(dirPath, dirName);
  const targetDirPath = path.join(targetRealPath, dirName)
  console.log(targetDirPath)
  const child = fs.readdirSync(needCopyDirPath, { withFileTypes: true })
  if (Array.isArray(child) && child.length > 0) {
    for (let c of child) {
      if (c.isDirectory()) {
        // 在目标文件夹创建同名文件夹
        fs.mkdirSync(path.join(targetRealPath, c.name))
        recursionDir(c.name, needCopyDirPath, targetDirPath)
      }
      else {
        const filePath = path.join(c.path, c.name)
        const destPath = path.join(targetDirPath, c.name)
        fs.copyFileSync(filePath, destPath)
      }
    }
  }
}
