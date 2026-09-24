import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import  moment  from 'moment';

import EmptyState from '../Cards/EmptyState'

const ExpenseList = ({ transactions = [], onDelete, onDownload }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-medium'>All Expenses</h5>

            {hasTransactions && (
              <button className='card-btn' onClick={onDownload}>
                  <LuDownload className='text-base' /> Download Excel
              </button>
            )}
        </div>

        {hasTransactions ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-4'>
              {transactions.map((expense) => (
                  <TransactionInfoCard
                      key={expense._id}
                      title={expense.category}
                      icon={expense.icon}
                      date={moment(expense.date).format("Do MMM YYYY")}
                      amount={expense.amount}
                      type="expense"
                      onDelete={() => onDelete(expense._id)}
                  />
              ))}
          </div>
        ) : (
          <EmptyState
            title="No Expenses Recorded"
            message="Click 'Add Expense' above to log your first expenditure."
          />
        )}
    </div>
  );
};

export default ExpenseList