import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

import EmptyState from '../Cards/EmptyState';

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">Recent Expenses</h5>
        {transactions && transactions.length > 0 && (
          <button className="card-btn" onClick={onSeeMore}>
            See All <LuArrowRight className="text-base" />
          </button>
        )}
      </div>

      <div className="mt-4">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('DD MMM YYYY')}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <EmptyState
            title="No Recent Expenses"
            message="You have not recorded any expenses in the last 30 days."
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
