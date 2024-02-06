// auno.ts
import fs4 from "node:fs";

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

// auno.ts
import path from "node:path";
async function main() {
  renderTemplate("ts-node");
}
main();
async function renderTemplate(templateRoot, target) {
  const cwd = process.cwd();
  const dirPathPrefix = path.resolve(cwd, "src/template");
  const dirPath = path.join(dirPathPrefix, templateRoot);
  fs4.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    readRoot(files);
  });
}
function readRoot(files) {
  for (let f of files) {
    if (f.name !== "node_modules") {
      if (f.isDirectory()) {
        recursionDir(f.name, f.path);
      } else {
        const filePath = path.join(f.path, f.name);
        console.log(filePath);
      }
    }
  }
}
function recursionDir(dirName, dirPath) {
  const currentDirPath = path.join(dirPath, dirName);
  const child = fs4.readdirSync(currentDirPath, { withFileTypes: true });
  if (Array.isArray(child) && child.length > 0) {
    for (let c of child) {
      if (c.isDirectory()) {
        recursionDir(c.name, currentDirPath);
      } else {
        const filePath = path.join(currentDirPath, c.name);
        console.log(filePath);
      }
    }
  }
}
async function createNodeProject(dir) {
  const rootDir = dir ? dir : getTemplateDir();
  if (fs4.existsSync(rootDir)) {
    fs4.rmSync(rootDir, { recursive: true, force: true });
  }
  fs4.mkdirSync(rootDir);
  fs4.mkdirSync(`${rootDir}/src`);
  fs4.mkdirSync(`${rootDir}/assets`);
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
  createNodeProject,
  renderTemplate
};
//# sourceMappingURL=auno.js.map