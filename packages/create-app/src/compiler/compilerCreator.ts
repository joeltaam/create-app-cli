/* eslint-disable require-jsdoc */
import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import baseConfig from './config/webpack.config.base'
import devConfig from './config/webpack.config.dev'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { EventEmitter } from '../helper/eventEmitter'

export class CompilerCreator extends EventEmitter<{ compiler: {} }> {
  private workDir!: string
  private webpackCompiler!: webpack.Compiler

  constructor(workDir: string) {
    super()
    this.workDir = workDir
    const compiler = webpack(
      merge(
        {
          entry: path.resolve(this.workDir, 'src/index.tsx'),
        },
        baseConfig,
        this.getDevConfig(),
      ),
    )
    compiler.watch({}, (err, stats) => {
      if (!err) {
        console.log(
          stats.toString({
            chunks: false, // 使构建过程更静默无输出
            colors: true, // 在控制台展示颜色
          }),
        )
        this.emit('compiler', {})
      } else {
        console.error(err.message)
      }
    })

    this.webpackCompiler = compiler
  }

  public get compiler() {
    return this.webpackCompiler
  }

  private getDevConfig() {
    const base = devConfig
    const plugins = [
      new HTMLWebpackPlugin({
        template: path.resolve(this.workDir, 'template/index.html'),
      }),
    ]
    return merge(base as any, {
      plugins,
    })
  }
}
