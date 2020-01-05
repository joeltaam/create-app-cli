/* eslint-disable require-jsdoc */

import * as fs from 'fs-extra'
import * as path from 'path'

export class ObjectCreator {
  private workDir: string
  private projectName: string

  constructor(workDir: string, projectName: string) {
    this.workDir = workDir
    this.projectName = projectName

    if (fs.existsSync(projectName)) {
      fs.removeSync(path.resolve(workDir, projectName))
    }
    fs.mkdirSync(projectName)
    const rootDir = path.resolve(__dirname, '../', '../', '../', 'create-react-template')
    fs.copySync(rootDir, path.resolve(this.workDir, this.projectName))
  }
}
