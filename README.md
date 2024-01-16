# cnpmcore-demo

基于 cnpmcore 的私有 npm 仓库, 用于内部项目的依赖管理，可以定期更新 cnpmcore 依赖。

## Features

- 基于 cnpmcore, 支持 npm 的所有功能
- 支持私有 npm 仓库
- 基于 eggjs + tegg + typescript 开发, 支持自定义 api

## QuickStart

### Development

```bash
$ yarn
$ yarn dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `yarn clean` before `yarn dev`.

### Deploy

```bash
$ yarn tsc
$ yarn start
```

### Npm Scripts

- Use `yarn lint` to check code style
- Use `yarn test` to run unit test
- se `yarn clean` to clean compiled js at development mode once

### Requirement

- Node.js >= 18.x
- Typescript >= 5.x
