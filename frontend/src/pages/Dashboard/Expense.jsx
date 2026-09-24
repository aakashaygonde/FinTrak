import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "./../../components/Modal";
import ExpenseList from "./../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import { triggerBlobDownload } from "../../utils/exportHelper";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category || !category.trim()) {
      toast.error("Please enter an expense category");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      setIsSubmitting(true);
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category: category.trim(),
        amount: Number(amount),
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to add expense";
      toast.error(errorMsg);
      console.error("Error adding expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense record deleted");
      fetchExpenseDetails();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to delete expense";
      toast.error(errorMsg);
      console.error("Error deleting expense:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle download Expense details (Excel or CSV)
  const handleDownloadExpense = async (format = "xlsx") => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const isCsv = format === "csv";
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          params: { format },
          responseType: "blob",
        }
      );

      const filename = isCsv ? "expense_details.csv" : "expense_details.xlsx";
      triggerBlobDownload(new Blob([response.data]), filename);
      toast.success(`Exported expenses as ${isCsv ? "CSV" : "Excel"}`);
    } catch (error) {
      console.error("Error downloading expense details", error);
      toast.error("Failed to export expense data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownloadExcel={() => handleDownloadExpense("xlsx")}
            onDownloadCSV={() => handleDownloadExpense("csv")}
            isExporting={isExporting}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => !isSubmitting && setOpenAddExpenseModal(false)}
          title="Add Expense"
          description="Log a new outflow with category and date"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            isSubmitting={isSubmitting}
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => !isDeleting && setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense Record"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record? This action will adjust your balance immediately."
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
            isLoading={isDeleting}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
