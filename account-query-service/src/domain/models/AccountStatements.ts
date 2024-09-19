import { Model, DataTypes, Sequelize } from 'sequelize';
import Account from './AccountView';

export interface IAccountStatement {
  id?: number;
  holderCpf: string;
  transactionDate: Date;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  createdAt?: Date;
  Account?: Account;
}

class AccountStatement extends Model<IAccountStatement> implements IAccountStatement {
  public id!: number;
  public holderCpf!: string;
  public transactionDate!: Date;
  public transactionType!: 'DEPOSIT' | 'WITHDRAWAL';
  public amount!: number;
  public balanceAfter!: number;
  public createdAt?: Date;
  public Account?: Account;

  static initialize(sequelize: Sequelize) {
    AccountStatement.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        holderCpf: {
          type: DataTypes.STRING(11),
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'holder_cpf',
          },
          onDelete: 'CASCADE',
          field: 'holder_cpf',
        },
        transactionDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'transaction_date',
        },
        transactionType: {
          type: DataTypes.ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER'),
          allowNull: false,
          field: 'transaction_type',
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: 'created_at',
        },
      },
      {
        sequelize,
        tableName: 'account_statements',
        timestamps: false,
      },
    );
    AccountStatement.belongsTo(Account, { foreignKey: 'holderCpf', targetKey: 'holderCpf' });
  }
}

export default AccountStatement;
