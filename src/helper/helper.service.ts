import { Injectable } from '@nestjs/common'

@Injectable()
export class HelperService {

  public dbHost: string
  public dbPort: number
  public dbUsername: string
  public dbPassword: string
  public dbName: string

  constructor() {
    let parse = require('pg-connection-string').parse
    let config = parse(process.env.DATABASE_URL)
    this.dbHost = config.host
    this.dbPort = config.port
    this.dbUsername = config.user
    this.dbPassword = config.password
    this.dbName = config.database
  }

  getDbHost(): string {
    return this.dbHost
  }

  getDbPort(): number {
    return this.dbPort
  }
  getDbUsername(): string {
    return this.dbUsername
  }
  getDbPassword(): string {
    return this.dbPassword
  }
  getDbName(): string {
    return this.dbName
  }
}
