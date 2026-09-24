const User = require("../models/User");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");

// Add Expense Source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount: Number(amount),
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get Expense Source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete Expense Source (Secured with userId)
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId });
        if (!deleted) {
            return res.status(404).json({ message: "Expense not found or unauthorized" });
        }
        res.json({ message: "Expense Deleted Successfully" });
    } catch(err){
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Download Expense Excel (In-memory stream)
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=expense_details.xlsx');
        return res.send(buffer);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
