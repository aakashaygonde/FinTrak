import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import EmptyState from "../Cards/EmptyState";
import { Button } from "../ui";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-base font-semibold text-slate-900 tracking-tight">
            Income Sources {hasTransactions ? `(${transactions.length})` : ""}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed log of all recorded revenue streams and incoming transactions.
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

export default IncomeList;