import React from "react";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { colors } from "../constants";

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    size: 40,
  }),
  columnHelper.accessor("bb", {
    header: "Bfr\nbreakfast",
    size: 120,
  }),
  columnHelper.accessor("breakfast", {
    header: "Food",
    size: 300,
  }),
  columnHelper.accessor("ab", {
    header: "Aft\nbreakfast",
    size: 120,
  }),
  columnHelper.accessor("bl", {
    header: "Bfr\nlunch",
    size: 120,
  }),
  columnHelper.accessor("lunch", {
    header: "Food",
    size: 300,
  }),
  columnHelper.accessor("al", {
    header: "Aft\nlunch",
    size: 120,
  }),
  columnHelper.accessor("bd", {
    header: "Bfr\ndinner",
    size: 120,
  }),
  columnHelper.accessor("dinner", {
    header: "Food",
    size: 300,
  }),
  columnHelper.accessor("ad", {
    header: "Aft\ndinner",
    size: 120,
  }),
  columnHelper.accessor("morningInsulinUnits", {
    header: "Mrng\n(Fiasp)",
    size: 300,
  }),
  columnHelper.accessor("afternoonInsulinUnits", {
    header: "Aft\n(Fiasp)",
    size: 300,
  }),
  columnHelper.accessor("eveningInsulinUnits", {
    header: "Eve\n(Fiasp)",
    size: 300,
  }),
  columnHelper.accessor("nightInsulinUnits", {
    header: "Night\n(HumInsulin N)",
    size: 300,
  }),
];

const ReportTable = ({ data }) => {
  const handleExportRows = (rows) => {
    const doc = new jsPDF("l", "mm", "a4");
    const tableData = rows.map((row) => {
      const { __typename, ...filteredTableRowData } = row.original;
      return Object.values(filteredTableRowData);
    });
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: colors.darkGrey,
        textColor: colors.black,
        fontSize: 10,
        padding: 5,
        lineWidth: 0.1,
        lineColor: colors.white,
        minCellHeight: 14,
        valign: "middle",
        halign: "center",
      },
      //   columnStyles: {
      //     0: { cellWidth: "auto", minCellHeight: 20 },
      //     1: { cellWidth: "auto", minCellHeight: 20 },
      //     2: { cellWidth: "auto", minCellHeight: 20 },
      //     3: { cellWidth: "auto", minCellHeight: 20 },
      //     4: { cellWidth: "auto", minCellHeight: 20 },
      //     5: { cellWidth: "auto", minCellHeight: 20 },
      //     6: { cellWidth: "auto", minCellHeight: 20 },
      //     7: { cellWidth: "auto", minCellHeight: 20 },
      //     8: { cellWidth: "auto", minCellHeight: 20 },
      //   },
    });

    doc.save("gluco-noter-report.pdf");
  };

  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export to pdf
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ReportTable;
