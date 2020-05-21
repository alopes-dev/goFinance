import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = getRepository(Transaction)

    const blance = (await ( transactions).find()).reduce((acumulator,{type,value})=>{

      if(type === "income"){
        acumulator.income +=Number(value)
      }else{
        acumulator.outcome +=Number(value)
      }
      acumulator.total = Number(acumulator.income - acumulator.outcome);

      return acumulator
    },{
      income: 0,
      outcome: 0,
      total: 0
    })


    return blance
  }
}

export default TransactionsRepository;
