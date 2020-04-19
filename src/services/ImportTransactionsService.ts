import path from 'path';
import csv from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute(importTransactionName: string): Promise<Request[]> {
    return new Promise((resolve, reject) => {
      const pathFile = path.join(uploadConfig.directory, importTransactionName);

      const transactions: Request[] = [];

      fs.createReadStream(pathFile)
        .pipe(csv())
        .on('data', ([title, type, value, category]) => {
          if (title !== 'title') {
            const transaction: Request = {
              title: title.trim(),
              value,
              type: type.trim(),
              category: category.trim(),
            };
            transactions.push(transaction);
          }
        })
        .on('end', async () => {
          resolve(transactions);
        })
        .on('error', reject);
    });
  }
}

export default ImportTransactionsService;
