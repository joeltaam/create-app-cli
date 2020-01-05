/* eslint-disable require-jsdoc */
export class EventEmitter<T extends { [k: string]: any }> {
  private eventPool: { [e in keyof T]: (data: any) => void } = {} as any

  public emit<N extends keyof T>(eventName: N, data: T[N]) {
    const callback = this.eventPool[eventName]
    if (callback) {
      callback(data)
    }
  }

  public on<N extends keyof T>(eventName: N, callback: (data: T[N]) => void) {
    this.eventPool[eventName] = callback
    return this
  }
}
