import { TableContainer, Table, TableHead, TableBody, TableCell, Paper } from '@mui/material';

const MuiTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead></TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
};
