import { ObjectCreator } from './commands/objectCreator'
import { DevServer } from './commands/devServer'

/* eslint-disable require-jsdoc */
export class CLI {
  private workDir: string

  constructor(workDir: string, ...cmd: string[]) {
    this.workDir = workDir
    const [command, args] = cmd
    this.handleCommand(command as CommandType, args)
  }

  private handleCommand(cmd: CommandType, args: string) {
    switch (cmd) {
      case 'create':
        new ObjectCreator(this.workDir, args)
        break
      case 'dev':
        new DevServer(this.workDir)
        break
      case 'build':
        console.log('build!!!!')
        break
      default:
        console.log('fuck!!!!')
    }
  }
}
