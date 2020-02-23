/* eslint-disable require-jsdoc */
import Websocket from 'ws'
import fs from 'fs'
import path from 'path'
import { Express } from "express-serve-static-core"
import { EventEmitter } from './EventEmitter'
import MemoryFileSystem from 'memory-fs'

type EventName = 'connection' | 'reload'

const PORT = 1081

export class HMRCreator extends EventEmitter<{ connection: {} }> {
  private outputPath!: string
  private ws!: Websocket

  constructor(workDir: string) {
    super()
    this.outputPath = workDir
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

  public injectWebSocketScript(app: Express, fsy: MemoryFileSystem) {
    app.get('/', (req, res) => {
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
      const html = fsy.readFileSync(path.resolve(this.outputPath, 'index.html')).toString()
      if (url === '/') {
        const body = html.replace('</body>', `${injectScript}</body>`)
        res.end(body)
      }
    })
  }
}
