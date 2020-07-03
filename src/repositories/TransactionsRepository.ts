import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(isIncome => {
     return isIncome.type === 'income'
      });
      const totalIncome = incomes.reduce((sum, incomeValue)=>{
        return sum + incomeValue.value
      }, 0)
      const outcomes = this.transactions.filter(isOutcome => {
        return isOutcome.type === 'outcome'
         });
         const totalOutcome = outcomes.reduce((sum, outcomeValue)=>{
           return sum + outcomeValue.value
         }, 0)

         const fullTotal = totalIncome - totalOutcome

        const balance = {
          income:totalIncome,
          outcome :totalOutcome,
          total:fullTotal
        };

    return balance
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
