import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async all(): Promise<Transaction[]> {
    const transactionRepository = getRepository(Transaction);

    return transactionRepository.find();
  }

  public async getBalance(): Promise<Balance> {
    const transactions = await this.all();

    const income = transactions.reduce(
      (total, transaction) =>
        transaction.type === 'income' ? total + transaction.value : total,
      0,
    );

    const outcome = transactions.reduce(
      (total, transaction) =>
        transaction.type === 'outcome' ? total + transaction.value : total,
      0,
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
