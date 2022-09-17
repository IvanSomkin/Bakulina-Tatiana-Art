import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  
  public dbHost: string;
  public dbPort: number;
  public dbUser: string;
  public dbPassword: string;
  public dbName: string;

  constructor() {
    var parse = require('pg-connection-string').parse
    var config = parse(process.env.DATABASE_URL)
    this.dbHost = config.host
    this.dbPort = config.port
    this.dbUser = config.user
    this.dbPassword = config.password
    this.dbName = config.database
  }

  getDbHost(): string {
    return this.dbHost;
  }

  getDbPort(): number {
    return this.dbPort;
  }
  getDbUsername(): string {
    return this.dbUser;
  }
  getDbPassword(): string {
    return this.dbPassword;
  }
  getDbName(): string {
    return this.dbName;
  }
}
