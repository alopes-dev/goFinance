import AppError from '../errors/AppError';

import { getRepository } from "typeorm";
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id:string): Promise<void> {
    const transactionRepo = getRepository(Transaction)

    const transactionExist = await transactionRepo.findOne({where:{id}});

    if(!transactionExist) throw new AppError("transaction does not exist")

    await transactionRepo.remove(transactionExist)
  }
}

export default DeleteTransactionService;
