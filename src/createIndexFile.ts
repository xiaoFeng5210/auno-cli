import fs from 'node:fs/promises'

export async function createIndexFile(dir: string) {
  const fileContetnt = `// Welcome to auno
main()

function main() {

}`
  await fs.writeFile(`${dir}/index.ts`, fileContetnt)

}
