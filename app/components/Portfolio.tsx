import { useState, Fragment } from "react";

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import Link from "@components/Link";
import { Company } from "app/interfaces";

interface Column {
  id: "name" | "symbol" | "actions";
  label: string;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Company name", align: "center" },
  { id: "symbol", label: "Symbol", align: "center" },
  {
    id: "actions",
    label: "Actions",
    align: "center",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Portfolio {
  label: string;
  items: Array<Company>;
  onRemoveItem: Function;
}

const Portfolio = ({ label, items = [], onRemoveItem }: Portfolio) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Typography mb={1}>{label}</Typography>

      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledTableCell key={column.id} align={column.align}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ name, symbol }) => {
                return (
                  <StyledTableRow
                    key={uuidv4()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      <Link href={`/company/${symbol}`} underline="none">
                        {name}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center" width="150px">
                      {symbol}
                    </StyledTableCell>
                    <StyledTableCell align="center" width="50px">
                      <IconButton
                        aria-label="remove"
                        size="small"
                        color="error"
                        onClick={() => onRemoveItem(symbol)}
                      >
                        <IndeterminateCheckBoxIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default Portfolio;
