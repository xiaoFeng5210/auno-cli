import cac from "cac";
import path from "node:path"
import { createNodeProject } from './auno'

const version = require('./package.json').version

const cli = cac('auno').version(version).help()

cli.command('create <project>', 'start create new project')
  .option('--template <template>', 'choose a template', { default: 'node' })
  .action((project, options) => {
    if (options.template === 'node') {
      if (project) {
        createNodeProject(project)
      }
    }
  })

cli.parse()
