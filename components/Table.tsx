import React, { PureComponent } from "react";
import { styled } from "../stitches.config";

const StyledTable = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
  borderBottomLeftRadius: "6px",
  borderBottomRightRadius: "6px",
  fontSize: 14,
  lineHeight: "22px",
  marginTop: "0",
  fontWeight: 300,
  overflow: "hidden",
  wordBreak: "break-word",
});

StyledTable.displayName = "Table";

const StyledTableHead = styled("thead", { backgroundColor: "#35383c" });

StyledTableHead.displayName = "TableHead";

const StyledTableRow = styled("tr", {
  borderBottom: "1px solid transparent",
  color: "$textNormal",
});

StyledTableRow.displayName = "TableRow";

const StyledTableHeaderCell = styled("th", {
  borderBottom: "1px solid #040405",
  padding: 8,
  fontSize: 12,
  lineHeight: "15px",
  textTransform: "uppercase",
  color: "hsla(0,0%,100%,.8)",
  textAlign: "left",
  fontWeight: 600,
  backgroundColor: "#202225",
});

StyledTableHeaderCell.displayName = "TableHeaderCell";

const StyledTableBody = styled("tbody", {
  "& tr": {
    background: "#18191c",
    ":hover": {
      background: "#1f2124",
    },
  },
  "& tr:nth-child(even)": {
    background: "#121315",
    ":hover": {
      background: "#1f2124",
    },
  },
});

StyledTableBody.displayName = "TableBody";

const StyledTableDataCell = styled("td", {
  verticalAlign: "top",
  padding: 8,
  fontWeight: 300,
  maxWidth: 272,
  whiteSpace: "nowrap"
});

StyledTableDataCell.displayName = "TableDataCell";

class Table extends PureComponent {
  static Head = StyledTableHead;
  static Row = StyledTableRow;
  static HeaderCell = StyledTableHeaderCell;
  static Body = StyledTableBody;
  static DataCell = StyledTableDataCell;

  render() {
    return <StyledTable>{this.props.children}</StyledTable>;
  }
}

export default Table;
