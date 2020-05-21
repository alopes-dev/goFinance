import path from 'path';

import loadCSV from '../utils/csv';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(file: string): Promise<Transaction[]> {
    const csvFilePath = path.resolve(__dirname, '..', '..', 'tmp', file);

    const transactions: Array<Transaction> = [];

    const createTransactionService = new CreateTransactionService();

    await Promise.all(
      (await loadCSV(csvFilePath)).map(async lineTransaction => {
        transactions.push(
          await createTransactionService.execute(lineTransaction),
        );
      }),
    );

    return transactions;
  }
}

export default ImportTransactionsService;
