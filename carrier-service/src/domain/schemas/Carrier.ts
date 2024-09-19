import { model, Schema } from 'dynamoose';

export interface ICarrier {
  CPF: string;
  Nome: String;
  createdAt?: Date;
  updatedAt?: Date;
}

const carrierSchema = new Schema(
  {
    CPF: {
      type: String,
      hashKey: true,
    },
    Nome: String,
  },
  { timestamps: true },
);

export const Carrier = model('Carrier', carrierSchema);
