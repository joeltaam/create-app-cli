/* eslint-disable require-jsdoc */
import path from 'path'
import { CompilerCreator } from '../compiler/compilerCreator'
import { HTTPServer, serverStatic } from '../helper/httpServer'
import { HMRCreator } from '../helper/hmr'

export class DevServer {
  private workDir: string
  private hmr!: HMRCreator
  private appServer!: HTTPServer

  constructor(workDir: string) {
    this.workDir = workDir
    this.initServer()
    const compiler = new CompilerCreator(workDir)
    this.initHMR().then(() => {
      compiler.on('compiler', () => {
        this.hmr.send('reload')
      })
    })
  }

  private initServer() {
    const app = new HTTPServer({
      port: 3000,
    })
    // NOTE: 自定义打包路径
    app.use(serverStatic(path.resolve(this.workDir, 'dist')))
    this.appServer = app
  }

  private async initHMR() {
    return new Promise((resolve) => {
      const hmr = new HMRCreator(this.workDir)
      hmr.injectWebSocketScript(this.appServer)
      hmr.on('connection', () => {
        resolve()
      })
      this.hmr = hmr
    })
  }
}
