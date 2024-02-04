# auno-cli
![Static Badge](https://img.shields.io/badge/build-nodejs-green) ![Static Badge](https://img.shields.io/badge/dev-ts_node-blue)



## 项目介绍
快速创建一个ts node项目。使用tsup打包。方便用户快速创建一个ts node项目。用户打包可以生成js文件和ts声明文件d.ts。加入nodemon监听文件变化，自动更改后的执行文件。
> 未来加入不同的模版可以创建更多的项目。

## 使用方式
```bash
npx auno-cli create <projectName>
```
命令行工具直接执行此命令即可快速创建一个ts node项目

## 项目安装
```bash
cd projectName && npm install
```
## 自动编译
编写ts文件即可自动编译成js文件到dist目录下
```bash
npm run tsup-watch
or
yarn tsup-watch
```

## 项目便捷开发
每次更新生成后的dist/index.js文件，nodemon会自动监听文件变化，自动执行dist/index.js文件
```bash
npm run start
```

## 项目打包
执行命令即可打包到ts文件到dist目录下,dist目录下会有js文件和d.ts文件
```bash
npm run build
```


## 未来开发计划
- [ ] 脚手架加入测试模块

## 贡献
欢迎大家提出issue和pr，一起完善这个项目, 未来我想加入更多的--template选择，基于不同的模版更方便的创建不同的项目。

具体方式可以在issues里提出需求，然后提交你的pr来解决。或者直接提出需求，如果我认为合理，会开发出来，把工具做完善。

## 最后
如果你喜欢这个项目，欢迎给我点一个star
