/**
 * * 命令行相关程序主逻辑
 */
import cac from "cac";
import path from "node:path"
import { renderTemplate } from './src/lib/renderTemplate'

const version = require('./package.json').version

const cli = cac('auno').version(version).help()

cli.command('create <project>', 'start create new project')
  .option('--template <template>', 'choose a template', { default: 'node' })
  .action((project, options) => {  // 第一个参数project - 项目名称，第二个参数options - 选项
    if (options.template === 'node') {
      if (project) {
        renderTemplate('ts-node', project)
      }
    }
  })

cli.parse()
