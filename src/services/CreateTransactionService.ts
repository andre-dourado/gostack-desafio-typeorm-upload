import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);

    let transactionCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!transactionCategory) {
      const categoryRet = categoryRepository.create({
        title: category,
      });

      transactionCategory = await categoryRepository.save(categoryRet);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('Transaction without a valid balance');
    }

    const newTransactionRepository = getRepository(Transaction);

    const transaction = newTransactionRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await newTransactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
