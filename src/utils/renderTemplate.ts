import fs from 'node:fs'
import path, { dirname } from 'node:path';

export type TemplateRoot = 'ts-node' 

export async function renderTemplate(templateRoot: TemplateRoot, target?: string) {
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
        copyFileToDest(f.name, f.path, targetRealPath)
      }
    }
  }
}

function recursionDir(dirName: string, dirPath: string, parentPath: string) {
  const needCopyDirPath = path.join(dirPath, dirName);
  const destPath = path.join(parentPath, dirName)
  const child = fs.readdirSync(needCopyDirPath, { withFileTypes: true })
  if (Array.isArray(child) && child.length > 0) {
    loopFileAndCopyToDest(child, needCopyDirPath, destPath)
  }
}

function loopFileAndCopyToDest(child: fs.Dirent[], needCopyDirPath: string, destPath: string) {
  for (let c of child) {
    if (c.isDirectory()) {
      // 在目标文件夹创建同名文件夹
      fs.mkdirSync(path.join(destPath, c.name))
      recursionDir(c.name, needCopyDirPath, destPath)
    }
    else {
      copyFileToDest(c.name, needCopyDirPath, destPath)
    }
  }
}

function copyFileToDest(copyName: string, copyPath: string, targetPath: string) {
  const filePath = path.join(copyPath, copyName)
  const destPath = path.join(targetPath, copyName)
  fs.copyFileSync(filePath, destPath)
}
