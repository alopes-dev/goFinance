import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

export interface ItransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    category: categoryAlias,
    ...rest
  }: ItransationDTO): Promise<Transaction> {
    const categoryRepo = getRepository(Category);
    const transationRepo = getRepository(Transaction);

    if (
      rest.type === 'outcome' &&
      rest.value > (await new TransactionsRepository().getBalance()).total
    ) {
      throw new AppError('Balance Invalid');
    }

    let category = await categoryRepo.findOne({
      where: { title: categoryAlias },
    });

    if (!category) {
      category = categoryRepo.create({ title: categoryAlias });
      await categoryRepo.save(category);
    }

    const transation = transationRepo.create({
      ...rest,
      category,
    });

    await transationRepo.save(transation);

    return transation;
  }
}

export default CreateTransactionService;
