import { User } from "./user"

export interface Transaction{
    id:number,
    transactionId:string
    type:TransactionType
    status: 'approved' | 'liquidated' | 'pending';
    sender:User,
    receiver:User,
    createdAt:Date,
    amount:number

}


export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAWAL = 'withdrawal',
    TRANSFER = 'transfer',
  }

 