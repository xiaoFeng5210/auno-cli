# auno-cli
![Static Badge](https://img.shields.io/badge/build-nodejs-green) ![Static Badge](https://img.shields.io/badge/dev-ts_node-blue)



## 项目介绍
快速创建一个ts node项目。使用tsup打包。方便用户快速创建一个ts node项目。用户打包可以生成js文件和ts声明文件d.ts
未来加入不同的模版可以创建更多的项目。

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
项目启动后，编写ts文件即可自动编译成js文件到dist目录下
```bash
npm run dev
or
yarn dev
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
