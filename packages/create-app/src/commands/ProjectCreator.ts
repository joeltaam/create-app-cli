/* eslint-disable require-jsdoc */
import * as fse from 'fs-extra'
import * as path from 'path'
import { Question } from '../helper/Question'
import { Spinner } from 'clui'
import chalk from 'chalk'

export class ObjectCreator {
  private workDir: string
  private projectName: string

  constructor(workDir: string, projectName: string) {
    this.workDir = workDir
    this.projectName = projectName
    this.init()
  }
  private async init() {
    const pjName = path.resolve(this.workDir, this.projectName)
    if (fse.existsSync(pjName)) {
      const a = await new Question(`项目 ${chalk.green(pjName)} 已经存在，是否覆盖（y/n）？`).getAnswer()
      if (a.toLowerCase().indexOf('y') > -1 || a.toLowerCase().indexOf('yes') > -1) {
        fse.removeSync(path.resolve(this.workDir, pjName))
      } else {
        console.log(chalk.red('创建项目失败'))
        process.exit(0)
      }
    }
    const countdown = new Spinner(`正在创建项目 ${chalk.green(pjName)} ...   `, [
      '⣾',
      '⣽',
      '⣻',
      '⢿',
      '⡿',
      '⣟',
      '⣯',
      '⣷',
    ])
    countdown.start()
    fse.mkdirSync(pjName)
    const rootDir = path.resolve(__dirname, '../', '../', '../', 'create-react-template')
    setTimeout(() => {
      fse.copySync(rootDir, path.resolve(this.workDir, this.projectName))
      countdown.stop()
      console.log(`
      -----------------------------------------
      |                                       |
      |                                       |
      |              ${chalk.green('项目创建完成')}             |
      |                                       |
      |                                       |
      -----------------------------------------
      `)
    }, 100)
  }
}
