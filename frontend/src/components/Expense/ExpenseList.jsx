import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import EmptyState from "../Cards/EmptyState";
import { Button } from "../ui";

const ExpenseList = ({ transactions = [], onDelete, onDownload }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-base font-semibold text-slate-900 tracking-tight">
            All Expenses {hasTransactions ? `(${transactions.length})` : ""}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed log of all recorded expenditures and outgoing transactions.
          </p>
        </div>

        {hasTransactions && (
          <Button
            variant="outline"
            size="sm"
            icon={LuDownload}
            onClick={onDownload}
          >
            Export Excel
          </Button>
        )}
      </div>

      {hasTransactions ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-4">
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

export default ExpenseList;