import toast from "react-hot-toast";

/**
 * Downloads a Blob directly to the client
 */
export const triggerBlobDownload = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Converts array of objects to CSV with UTF-8 BOM
 * Handles commas, quotes, special characters, and formatting.
 */
export const exportToCSV = (data, filename = "fintrack_export.csv") => {
  if (!data || !data.length) {
    toast.error("No data available to export");
    return;
  }

  try {
    const headers = Object.keys(data[0]);
    const rows = data.map((item) =>
      headers
        .map((header) => {
          let val = item[header] === null || item[header] === undefined ? "" : String(item[header]);
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          if (val.includes(",") || val.includes('"') || val.includes("\n") || val.includes("\r")) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(",")
    );

    // UTF-8 Byte Order Mark (\uFEFF) ensures Excel opens special characters (₹, accents) properly
    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    triggerBlobDownload(blob, filename.endsWith(".csv") ? filename : `${filename}.csv`);
    toast.success(`Exported ${data.length} records to CSV`);
  } catch (err) {
    console.error("Error generating CSV export", err);
    toast.error("Failed to generate CSV export");
  }
};

/**
 * Generates an Excel-compatible XML HTML spreadsheet with styled header row
 * Natively readable by Microsoft Excel, Numbers, and Google Sheets without extra libraries.
 */
export const exportToExcel = (data, filename = "fintrack_export.xls", title = "FinTrack Financial Data") => {
  if (!data || !data.length) {
    toast.error("No data available to export");
    return;
  }

  try {
    const headers = Object.keys(data[0]);

    let tableHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>${title}</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
      </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      <style>
        th { background-color: #4f46e5; color: #ffffff; font-weight: bold; padding: 10px; border: 1px solid #e2e8f0; }
        td { padding: 8px 12px; border: 1px solid #e2e8f0; font-family: sans-serif; font-size: 12px; }
        tr:nth-child(even) { background-color: #f8fafc; }
      </style>
    </head>
    <body>
      <table>
        <thead>
          <tr>
            ${headers.map((h) => `<th>${h}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) => `
            <tr>
              ${headers.map((h) => `<td>${row[h] !== null && row[h] !== undefined ? row[h] : ""}</td>`).join("")}
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </body>
    </html>`;

    const blob = new Blob(["\uFEFF" + tableHtml], {
      type: "application/vnd.ms-excel;charset=utf-8",
    });
    triggerBlobDownload(blob, filename.endsWith(".xls") ? filename : `${filename}.xls`);
    toast.success(`Exported ${data.length} records to Excel`);
  } catch (err) {
    console.error("Error generating Excel export", err);
    toast.error("Failed to generate Excel export");
  }
};
