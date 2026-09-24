const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount: Number(amount),
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete Income Source (Secured with userId)
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const deleted = await Income.findOneAndDelete({ _id: req.params.id, userId });
        if (!deleted) {
            return res.status(404).json({ message: "Income not found or unauthorized" });
        }
        res.json({ message: "Income Deleted Successfully" });
    } catch(err){
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Download Income Excel (In-memory stream)
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=income_details.xlsx');
        return res.send(buffer);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
