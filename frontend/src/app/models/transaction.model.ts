import {Deserializable} from './deserializable.model';

export class Transaction implements Deserializable {
  txId: string;
  comment: string;
  fee: number;
  kernel: string;
  receiver: string;
  sender: string;
  status: number;
  value: number;
  height: number;
  confirmations: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
