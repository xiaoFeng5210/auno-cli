/**
 * 创建 tsconfig.json
 */
import fs from 'node:fs/promises'

export async function createTsconfig(rootDir: string) {
  const content = `{
    "compilerOptions": {
      "outDir": "dist",
      "target": "ESNext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
      "module": "esnext" /* Specify what module code is generated. */,
      "esModuleInterop": true,
      "moduleResolution": "Node",
    }
  }`
  const res = await fs.writeFile(`${rootDir}/tsconfig.json`, content)
  console.log(res)
}
