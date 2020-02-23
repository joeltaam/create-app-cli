/* eslint-disable require-jsdoc */
import readline from 'readline'

export class Question {
  constructor(private query: string) {
    //
  }
  public async getAnswer(): Promise<string> {
    return new Promise<string>((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      rl.question(this.query, (answer) => {
        resolve(answer)
        rl.close()
      })
    })
  }
}
