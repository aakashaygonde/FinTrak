import React from "react";
import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
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
    const getAmountStyles = () =>
        type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";

    const isImageUrl = (val) =>
      typeof val === "string" && (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("/") || val.startsWith("data:"));
    
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 transition">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full shrink-0">
        {icon ? (
          isImageUrl(icon) ? (
            <img src={icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <span className="text-xl leading-none">{icon}</span>
          )
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate pr-2">
          <p className="text-sm text-gray-700 font-medium truncate">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1"
              onClick={onDelete}
              title="Delete transaction"
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold ${getAmountStyles()}`}>
            <h6 className="text-xs">
              {type === "income" ? "+" : "-"} ₹{addThousandsSeparator(amount)}
            </h6>
            {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
