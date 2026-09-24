import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import { triggerBlobDownload } from "../../utils/exportHelper";

function Income() {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.GET_ALL_INCOME
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income details", error);
      toast.error("Failed to load income data");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source || !source.trim()) {
      toast.error("Please enter an income source");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income source added successfully");
      fetchIncomeDetails();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to add income";
      toast.error(errorMsg);
      console.error("Error adding income:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income source deleted");
      fetchIncomeDetails();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to delete income";
      toast.error(errorMsg);
      console.error("Error deleting income:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle download income details (Excel or CSV)
  const handleDownloadIncome = async (format = "xlsx") => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const isCsv = format === "csv";
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          params: { format },
          responseType: "blob",
        }
      );

      const filename = isCsv ? "income_details.csv" : "income_details.xlsx";
      triggerBlobDownload(new Blob([response.data]), filename);
      toast.success(`Exported income as ${isCsv ? "CSV" : "Excel"}`);
    } catch (error) {
      console.error("Error downloading income details", error);
      toast.error("Failed to export income data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownloadExcel={() => handleDownloadIncome("xlsx")}
            onDownloadCSV={() => handleDownloadIncome("csv")}
            isExporting={isExporting}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => !isSubmitting && setOpenAddIncomeModal(false)}
          title="Add Income"
          description="Log a new revenue inflow with source and date"
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
            isSubmitting={isSubmitting}
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => !isDeleting && setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income Record"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record? Your balance and income metrics will be recalculated."
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
            isLoading={isDeleting}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
