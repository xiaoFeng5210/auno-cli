// src/lib/renderTemplate.ts
import fs from "node:fs";
import path from "node:path";
async function renderTemplate(templateRoot, target) {
  const cwd = process.cwd();
  const dirPathPrefix = path.resolve(cwd, "src/template");
  const dirPath = path.join(dirPathPrefix, templateRoot);
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    readRootAndCopy(files, target);
  });
}
function readRootAndCopy(files, target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
  fs.mkdirSync(target);
  const targetRealPath = path.resolve(process.cwd(), target);
  for (let f of files) {
    if (f.name !== "node_modules") {
      if (f.isDirectory()) {
        fs.mkdirSync(path.join(targetRealPath, f.name));
        recursionDir(f.name, f.path, targetRealPath);
      } else {
        copyFileToDest(f.name, f.path, targetRealPath);
      }
    }
  }
}
function recursionDir(dirName, dirPath, parentPath) {
  const needCopyDirPath = path.join(dirPath, dirName);
  const destPath = path.join(parentPath, dirName);
  const child = fs.readdirSync(needCopyDirPath, { withFileTypes: true });
  if (Array.isArray(child) && child.length > 0) {
    loopFileAndCopyToDest(child, needCopyDirPath, destPath);
  }
}
function loopFileAndCopyToDest(child, needCopyDirPath, destPath) {
  for (let c of child) {
    if (c.isDirectory()) {
      fs.mkdirSync(path.join(destPath, c.name));
      recursionDir(c.name, needCopyDirPath, destPath);
    } else {
      copyFileToDest(c.name, needCopyDirPath, destPath);
    }
  }
}
function copyFileToDest(copyName, copyPath, targetPath) {
  const filePath = path.join(copyPath, copyName);
  const destPath = path.join(targetPath, copyName);
  fs.copyFileSync(filePath, destPath);
}

// auno.ts
async function main() {
  renderTemplate("ts-node", "playground");
}
main();
//# sourceMappingURL=auno.js.map