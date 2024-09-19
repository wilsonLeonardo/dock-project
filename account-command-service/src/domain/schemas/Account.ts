import { model, Schema } from 'dynamoose';

export interface IAccount {
  holderCpf: string;
  balance: number;
  accountNumber: string;
  agency: string;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const accountSchema = new Schema(
  {
    holderCpf: {
      type: String,
      hashKey: true,
    },
    balance: Number,
    accountNumber: String,
    agency: String,
    isBlocked: Boolean,
  },
  { timestamps: true },
);

export const Account = model('Account', accountSchema);
