import cac from "cac";
import path from "node:path"

const version = require('./package.json').version

const cli = cac('auno-cli').version(version).help()

cli.option('--test <test>', 'show version')

const parsed = cli.parse()
console.log(parsed)
