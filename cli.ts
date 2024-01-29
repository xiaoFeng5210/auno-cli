import cac from "cac";
import path from "node:path"

const version = require('./package.json').version

const cli = cac('auno').version(version).help()

cli.command('create <project>', 'start create new project')
  .option('--template <template>', 'choose a template', {default: 'node'})
  .action((project, options) => {
    console.log(project, options)
  })

const parsed = cli.parse()
console.log(parsed)
