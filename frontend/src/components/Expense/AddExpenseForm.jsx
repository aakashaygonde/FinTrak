import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPop";
import { Button } from "../ui";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-2">
        <span className="text-xs text-slate-500 mb-2 font-medium">Select Category Icon</span>
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Category"
        placeholder="e.g. Groceries, Rent, Utilities, Dining"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount (₹)"
        placeholder="e.g. 1500"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end pt-3 border-t border-slate-100">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpenseForm;