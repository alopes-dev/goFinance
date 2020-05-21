import { Router } from 'express';
import { getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import upload from '../utils/multer';

const transactionsRouter = Router();

transactionsRouter.get('/', async (_, response) => {
  const transactionRepo = getRepository(Transaction);

  const transactions = await transactionRepo.find();
  const balance = await new TransactionsRepository().getBalance();

  return response.json({
    transactions,
    balance,
  });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const servive = new CreateTransactionService();

  const transation = await servive.execute({ title, value, type, category });

  return response.json(transation);
});

transactionsRouter.delete('/:id', async (request, response) => {
  await new DeleteTransactionService().execute(request.params.id);

  return response.status(204).json();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const imprtTransactionService = new ImportTransactionsService();

    const transactions = await imprtTransactionService.execute(
      request.file.filename,
    );

    return response.json(transactions);
  },
);

export default transactionsRouter;
