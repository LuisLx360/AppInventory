import React from "react";

const ExportCSV = ({ data, fileName, headers }) => {
  const downloadCSV = () => {
    if (!data.length || !headers.length) {
      console.error("No data or headers to export");
      return;
    }

    const csvString = [
      headers,
      ...data.map((item) =>
        headers.map((header) =>
          item[header] !== undefined ? item[header] : ""
        )
      ),
    ];

    console.log("CSV String Array:", csvString);

    const csvContent = csvString
      .filter((row) => Array.isArray(row))
      .map((row) => row.join(";"))
      .join("\n");

    console.log(csvContent);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadCSV} className="export-button">
      Export CSV
    </button>
  );
};

export default ExportCSV;
