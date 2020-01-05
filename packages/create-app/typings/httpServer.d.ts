interface HTTPServer {
  use: (cb: (req, res, next) => void) => void
}
