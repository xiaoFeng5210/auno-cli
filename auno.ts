import { renderTemplate } from './src/lib/renderTemplate'

/**
 * 命令行的相关逻辑可以通过这里进行测试
 */
async function main() {
  renderTemplate('ts-node', 'playground')
}

main()
