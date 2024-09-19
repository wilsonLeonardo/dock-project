import { ILogger } from '@infrastructure/logger/ILogger';
import { Sequelize } from 'sequelize';

export default class Database {
  private sequelize: Sequelize;

  constructor(
    database: string,
    username: string,
    password: string,
    host: string,
    dialect: 'postgres' | 'mysql' | 'sqlite' | 'mssql',
    private logger: ILogger,
  ) {
    this.sequelize = new Sequelize(database, username, password, {
      host: host,
      dialect: dialect,
    });
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      this.logger.info('Connection has been established successfully.');
    } catch (error: any) {
      this.logger.error('Unable to connect to the database:', error);
    }
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }

  async syncModels(models: any[]): Promise<void> {
    try {
      models.forEach((model) => model.initialize(this.sequelize));
      await this.sequelize.sync();
      this.logger.info('Models synchronized with the database.');
    } catch (error: any) {
      this.logger.error('Error syncing models:', error);
    }
  }
}
