import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

import EmptyState from '../Cards/EmptyState'

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-medium'>Income Sources</h5>

            {hasTransactions && (
              <button className='card-btn' onClick={onDownload}>
                  <LuDownload className='text-base' /> Download Excel
              </button>
            )}
        </div>

        {hasTransactions ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-4'>
            {transactions.map((income) => (
                <TransactionInfoCard
                  key={income._id}
                  title={income.source}
                  icon={income.icon}
                  date={moment(income.date).format("Do MMM YYYY")}
                  amount={income.amount}
                  type="income"
                  onDelete={() => onDelete(income._id)}
                />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Income Sources Yet"
            message="Click 'Add Income' above to start tracking your revenue streams."
          />
        )}
    </div>
  );
};

export default IncomeList