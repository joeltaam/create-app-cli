/* eslint-disable require-jsdoc */
import http from 'http'
import fs from 'fs'
import path from 'path'

interface HTTPServerProps {
  port: number
}

type reqType = http.IncomingMessage
type resType = http.ServerResponse

type middlewareFuncType = (req: reqType, res: resType, fn: () => void) => void

export class HTTPServer {
  private middleware: Array<middlewareFuncType> = []

  constructor({ port }: HTTPServerProps) {
    const app = http.createServer((req, res) => {
      this.runMiddleware(req, res)
    })
    app.listen(port)
  }

  public use(fn: (req: reqType, res: resType, next: () => void) => void) {
    this.middleware.push(fn)
  }

  private runMiddleware(req: reqType, res: resType) {
    let index = 0
    const iter = (idx: number) => {
      if (idx > this.middleware.length) {
        return
      }
      index = idx
      const middleware = this.middleware[idx]
      if (middleware) {
        middleware(req, res, iter.bind(null, index + 1))
      }
    }
    iter(index)
  }
}

export const serverStatic = (dir: string) => (req: reqType, res: resType, next: () => void) => {
  const files = fs.readdirSync(dir)
  const url = req.url || '/'
  const fileName = url.substr(1)
  const getBuffer = (name: string) => fs.readFileSync(path.resolve(dir, name))
  if (url === '/') {
    const indexBuffer = getBuffer('index.html')
    next()
    return res.end(indexBuffer)
  }
  if (!files.includes(fileName)) {
    res.writeHead(404)
    res.end()
  } else {
    const buffer = getBuffer(fileName)
    res.end(buffer)
  }
  next()
}
