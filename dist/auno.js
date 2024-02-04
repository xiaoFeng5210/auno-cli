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
        "build": "tsup --format esm && tsup --dts",
        "dts": "tsup --dts"
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
async function createNodeProject(dir) {
  const rootDir = dir ? dir : getTemplateDir();
  if (fs4.existsSync(rootDir)) {
    fs4.rmSync(rootDir, { recursive: true, force: true });
    console.log("The directory already delete");
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
  createNodeProject
};
//# sourceMappingURL=auno.js.map