import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";

// Komponenta prima props: data (JSON niz) i filename (opciono ime fajla)
const ExportExcelButton = ({ data, filename = "izvestaj.xlsx", children }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Podaci");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, filename);
  };

  return (
    <button onClick={exportToExcel}>{children || "Exportuj u Excel"}</button>
  );
};

ExportExcelButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string,
  children: PropTypes.node,
};

export default ExportExcelButton;
