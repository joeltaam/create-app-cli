/* eslint-disable require-jsdoc */
import express from 'express'
import path from 'path'

import { CompilerCreator } from '../compiler/compilerCreator'
import { HMRCreator } from '../helper/hmr'


const app = express()


export class DevServer {
  private workDir: string
  private hmr!: HMRCreator
  private compiler!: CompilerCreator

  constructor(workDir: string) {
    this.workDir = workDir
    this.compiler = new CompilerCreator(workDir)
    this.initHMR()
    const fs = this.compiler.fileSystem

    app.get('*', (req, res) => {
      try {
        if (path.extname(req.path) === '.css') {
          res.set({
            'Content-Type': 'text/css'
          })
        }
        res.end(fs.readFileSync(this.compiler.ouputPath + req.path))
      } catch (e) {
        res.set({
          'Content-Type': 'text/plain;charset=UTF-8'
        });
        res.status(404).end('未发现响应文件内容')
      }
    })
    app.listen(3000)
  }

  private async initHMR() {
    const hmr = new HMRCreator(this.compiler.ouputPath)
    hmr.injectWebSocketScript(app, this.compiler.fileSystem)
    hmr.on('connection', () => {
      this.compiler.on('compiler', () => {
        this.hmr.send('reload')
      })
    })
    this.hmr = hmr
  }
}
