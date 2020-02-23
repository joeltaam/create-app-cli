/* eslint-disable require-jsdoc */
import webpack from 'webpack'
import path from 'path'
import * as fse from 'fs-extra'
import merge from 'webpack-merge'
import MemoryFileSystem from 'memory-fs'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import Mfs from 'memory-fs'

import baseConfig from './config/webpack.config.base'
import devConfig from './config/webpack.config.dev'
import { EventEmitter } from '../helper/EventEmitter'


const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const fsy = new Mfs()

export class CompilerCreator extends EventEmitter<{ compiler: {} }> {

  public fileSystem!: MemoryFileSystem
  public ouputPath = ''

  private workDir!: string
  private webpackCompiler!: webpack.Compiler

  constructor(workDir: string) {
    super()
    this.workDir = workDir
    const compiler = webpack(
      smp.wrap(
        merge(
          {
            entry: path.resolve(this.workDir, 'src/index.tsx'),
          },
          baseConfig,
          this.getDevConfig(),
          this.getCustomConfig(),
        ),
      )
    )
    compiler.outputFileSystem = fsy
    this.fileSystem = fsy
    this.ouputPath = compiler.options.output!.path!
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

  private getCustomConfig() {
    const configPath = path.resolve(this.workDir, './config/webpack.config.dev.js')
    if (!fse.existsSync(configPath)) {
      return {}
    } else {
      const config = require(configPath)
      return config
    }
  }
}
