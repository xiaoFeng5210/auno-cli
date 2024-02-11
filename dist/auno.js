// auno.ts
import fs5 from "node:fs";

// src/createIndexFile.ts
import fs from "node:fs/promises";
async function createIndexFile(dir) {
  const fileContetnt = `// Welcome to auno
main()

function main() {

}`;
  await fs.writeFile(`${dir}/index.ts`, fileContetnt);
}

// src/config/createTsconfig.ts
import fs2 from "node:fs/promises";
async function createTsconfig(rootDir) {
  const content = `{
    "compilerOptions": {
      "outDir": "dist",
      "target": "ESNext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
      "module": "esnext" /* Specify what module code is generated. */,
      "esModuleInterop": true,
      "moduleResolution": "Node",
    }
  }`;
  const res = await fs2.writeFile(`${rootDir}/tsconfig.json`, content);
  console.log(res);
}

// src/config/createPackage.ts
import fs3 from "node:fs/promises";
async function createPackageFile(rootDir) {
  const content = `
{
      "name": "${rootDir}",
      "version": "0.0.1",
      "description": "",
      "main": "dist/index.js",
      "type": "module",
      "scripts": {
        "start": "nodemon --delay 1000ms dist/index.js",
        "tsup-watch": "tsup --format esm --watch",
        "build": "tsup --format esm && tsup --dts --format esm",
        "dts": "tsup --dts --format esm",
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "@types/node": "^20.11.10",
        "nodemon": "^3.0.3",
        "tsup": "^8.0.1",
        "typescript": "^5.3.3"
      }
}`;
  const lintCode = JSON.stringify(content.trim(), null, 4);
  await fs3.writeFile(`${rootDir}/package.json`, content.trim());
}

// src/config/createTsup.ts
import { writeFileSync } from "fs";
function createTSup(rootDir) {
  const content = `
import { defineConfig } from 'tsup' // \u4F7F\u7528 defineConfig \u6709\u7C7B\u578B\u63D0\u793A\uFF01

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
})  
  `;
  writeFileSync(`${rootDir}/tsup.config.ts`, content.trim());
}

// src/utils/renderTemplate.ts
import fs4 from "node:fs";
import path from "node:path";
async function renderTemplate(templateRoot, target) {
  const cwd = process.cwd();
  const dirPathPrefix = path.resolve(cwd, "src/template");
  const dirPath = path.join(dirPathPrefix, templateRoot);
  fs4.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    readRootAndCopy(files, target);
  });
}
function readRootAndCopy(files, target) {
  if (fs4.existsSync(target)) {
    fs4.rmSync(target, { recursive: true, force: true });
  }
  fs4.mkdirSync(target);
  const targetRealPath = path.resolve(process.cwd(), target);
  for (let f of files) {
    if (f.name !== "node_modules") {
      if (f.isDirectory()) {
        fs4.mkdirSync(path.join(targetRealPath, f.name));
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
  const child = fs4.readdirSync(needCopyDirPath, { withFileTypes: true });
  if (Array.isArray(child) && child.length > 0) {
    loopFileAndCopyToDest(child, needCopyDirPath, destPath);
  }
}
function loopFileAndCopyToDest(child, needCopyDirPath, destPath) {
  for (let c of child) {
    if (c.isDirectory()) {
      fs4.mkdirSync(path.join(destPath, c.name));
      recursionDir(c.name, needCopyDirPath, destPath);
    } else {
      copyFileToDest(c.name, needCopyDirPath, destPath);
    }
  }
}
function copyFileToDest(copyName, copyPath, targetPath) {
  const filePath = path.join(copyPath, copyName);
  const destPath = path.join(targetPath, copyName);
  fs4.copyFileSync(filePath, destPath);
}

// auno.ts
async function main() {
  renderTemplate("ts-node", "test-render");
}
main();
async function createNodeProject(dir) {
  const rootDir = dir ? dir : getTemplateDir();
  if (fs5.existsSync(rootDir)) {
    fs5.rmSync(rootDir, { recursive: true, force: true });
  }
  fs5.mkdirSync(rootDir);
  fs5.mkdirSync(`${rootDir}/src`);
  fs5.mkdirSync(`${rootDir}/assets`);
  await createBase(rootDir);
}
async function createBase(dir) {
  await createIndexFile(dir);
  await createTsconfig(dir);
  await createPackageFile(dir);
  createTSup(dir);
}
function getTemplateDir() {
  return "auno-cli";
}
export {
  createNodeProject
};
//# sourceMappingURL=auno.js.map