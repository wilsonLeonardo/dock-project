import { Model, DataTypes, Sequelize } from 'sequelize';

export interface IAccount {
  holderCpf: string;
  balance: number;
  accountNumber: string;
  agency: string;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Account extends Model<IAccount> implements IAccount {
  public holderCpf!: string;
  public balance!: number;
  public accountNumber!: string;
  public agency!: string;
  public isBlocked!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Account.init(
      {
        holderCpf: {
          type: DataTypes.STRING,
          primaryKey: true,
          field: 'holder_cpf',
        },
        balance: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        accountNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'account_number',
        },
        agency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isBlocked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: 'is_blocked',
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: 'created_at',
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: 'updated_at',
        },
      },
      {
        sequelize,
        tableName: 'accounts',
        timestamps: false,
      },
    );
  }
}
