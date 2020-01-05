/* eslint-disable require-jsdoc */
import Websocket from 'ws'
import fs from 'fs'
import path from 'path'
import { EventEmitter } from './eventEmitter'

type EventName = 'connection' | 'reload'

const PORT = 1081

export class HMRCreator extends EventEmitter<{ connection: {} }> {
  private workDir!: string
  private ws!: Websocket

  constructor(workDir: string) {
    super()
    this.workDir = workDir
    // NOTE:自定义hmr端口
    const wss = new Websocket.Server({
      port: PORT,
    })
    wss.on('connection', (ws) => {
      this.ws = ws
      this.emit('connection', {})
    })
  }

  public send(eventName: EventName, cb?: () => void) {
    this.ws.send(eventName, cb)
  }

  public injectWebSocketScript(app: HTTPServer) {
    app.use((req, res, next) => {
      const url = req.url || '/'
      const injectScript = `<script>
      const socket = new WebSocket('ws://localhost:${PORT}')
      socket.addEventListener('open', (event) => {
        socket.send('[HMR] is Ready')
        console.log('[HMR] Start')
      })
      socket.addEventListener('message', function(event) {
        if (event.data === 'reload') {
          window.location.reload()
        }
      })
      </script>`

      const htmlBuffer = fs.readFileSync(path.resolve(this.workDir, 'dist/index.html'), {
        encoding: 'utf-8',
      })
      if (url === '/') {
        const body = htmlBuffer.replace('</body>', `${injectScript}</body>`)
        res.end(body)
      }
      next()
    })
  }
}
