var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "auno-cli",
      version: "0.0.1",
      description: "\u7F16\u5199\u4E00\u4E2A\u53EF\u4EE5\u6267\u884Cts\u6587\u4EF6\u7684node cli\u5DE5\u5177\uFF0C\u4F7F\u7528tsup\u6253\u5305\u3002\u65B9\u4FBF\u7528\u6237\u5FEB\u901F\u521B\u5EFA\u4E00\u4E2Ats node\u9879\u76EE",
      main: "dist/cli.js",
      type: "module",
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        watch: "tsup --format esm --watch",
        build: "tsup --format esm && tsup --dts",
        dts: "tsup --dts",
        lint: "eslint --ext .ts src"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/xiaoFeng5210/typescript-node-cli.git"
      },
      keywords: [],
      author: "",
      license: "ISC",
      bugs: {
        url: "https://github.com/xiaoFeng5210/typescript-node-cli/issues"
      },
      homepage: "https://github.com/xiaoFeng5210/typescript-node-cli#readme",
      devDependencies: {
        "@types/eslint": "^8.56.2",
        "@types/node": "^20.11.10",
        eslint: "^8.56.0",
        tsup: "^8.0.1",
        typescript: "^5.3.3"
      },
      dependencies: {
        cac: "^6.7.14"
      },
      bin: {
        "auno-cli": "bin/auno.js"
      }
    };
  }
});

// cli.ts
import cac from "cac";

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
        "dev": "tsup --format esm --watch",
        "build": "tsup --format esm && tsup --dts",
        "dts": "tsup --dts"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "@types/node": "^20.11.10",
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

// cli.ts
var version = require_package().version;
var cli = cac("auno").version(version).help();
cli.command("create <project>", "start create new project").option("--template <template>", "choose a template", { default: "node" }).action((project, options) => {
  if (options.template === "node") {
    if (project) {
      createNodeProject(project);
    }
  }
});
cli.parse();
//# sourceMappingURL=cli.js.map