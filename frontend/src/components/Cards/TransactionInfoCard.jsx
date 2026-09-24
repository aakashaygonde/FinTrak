import React from "react";
import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuReceipt,
} from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";

  const isImageUrl = (val) =>
    typeof val === "string" &&
    (val.startsWith("http://") ||
      val.startsWith("https://") ||
      val.startsWith("/") ||
      val.startsWith("data:"));

  return (
    <div className="group flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50/90 border border-transparent hover:border-slate-200/70 transition-all duration-150">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 flex items-center justify-center text-lg text-slate-700 bg-slate-100 rounded-xl shrink-0 group-hover:bg-white group-hover:shadow-xs transition-colors">
          {icon ? (
            isImageUrl(icon) ? (
              <img src={icon} alt={title} className="w-5 h-5 object-contain" />
            ) : (
              <span className="text-lg leading-none">{icon}</span>
            )
          ) : (
            <LuReceipt size={18} className="text-slate-500" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate tracking-tight">
            {title}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {!hideDeleteBtn && (
          <button
            type="button"
            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer focus:opacity-100"
            onClick={onDelete}
            title="Delete transaction"
            aria-label="Delete transaction"
          >
            <LuTrash2 size={15} />
          </button>
        )}

        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold tabular-nums border ${
            isIncome
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
              : "bg-rose-50 text-rose-700 border-rose-200/60"
          }`}
        >
          <span>{isIncome ? "+" : "-"}₹{addThousandsSeparator(amount)}</span>
          {isIncome ? <LuTrendingUp size={13} /> : <LuTrendingDown size={13} />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
