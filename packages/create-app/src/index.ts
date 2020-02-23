import fs from 'fs'
import * as fse from 'fs-extra'
import path from 'path'
import { ObjectCreator as ProjectCreator } from './commands/ProjectCreator'
import { DevServer } from './commands/DevServer'

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
        new ProjectCreator(this.workDir, args)
        break
      case 'dev':
        new DevServer(this.workDir)
        this.loadEnv()
        break
      case 'build':
        console.log('build!!!!')
        break
      default:
        console.log('default!!!!')
    }
  }

  private loadEnv() {
    const envPath = path.resolve(this.workDir, './.env')
    if (fse.existsSync(envPath)) {
      const env = fs.readFileSync(envPath).toString()
      env.split(/\n/).forEach((line) => {
        const [k, v] = line.split('=')
        process.env[k] = v
      })
    }
  }

}
