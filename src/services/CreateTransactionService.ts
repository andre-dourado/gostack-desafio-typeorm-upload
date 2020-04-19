import { getRepository } from 'typeorm';
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

    let checkCategoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExists) {
      const categoryRet = categoryRepository.create({
        title: category,
      });

      checkCategoryExists = await categoryRepository.save(categoryRet);
    }

    const transactionsRepository = new TransactionsRepository();

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new AppError('Transaction without a valid balance');
    }

    const newTransactionRepository = getRepository(Transaction);

    const transaction = newTransactionRepository.create({
      title,
      value,
      type,
      category_id: checkCategoryExists?.id,
    });

    await newTransactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
