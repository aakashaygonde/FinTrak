import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPop from "../EmojiPickerPop";
import { Button } from "../ui";

const AddIncomeForm = ({ onAddIncome, isSubmitting = false }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-2">
        <span className="text-xs text-slate-500 mb-2 font-medium">Select Source Icon</span>
        <EmojiPickerPop
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="e.g. Salary, Consulting, Investment, Dividend"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount (₹)"
        placeholder="e.g. 50000"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end pt-3 border-t border-slate-100">
        <Button
          type="button"
          variant="success"
          size="md"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onClick={() => onAddIncome(income)}
        >
          {isSubmitting ? "Adding..." : "Add Income"}
        </Button>
      </div>
    </div>
  );
};

export default AddIncomeForm;