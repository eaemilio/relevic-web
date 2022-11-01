import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

export type MyWork = {
  description: string;
  antiquity: number;
  caseId: number;
  isFollowUp: boolean;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: MyWork[];
  tableLabels: any;
}

export default function AppNewInvoice({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row, index) => (
                <AppNewInvoiceRow key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: MyWork;
};

function AppNewInvoiceRow({ row }: AppNewInvoiceRowProps) {
  const theme = useTheme();

  const handleClick = (row: MyWork) => {
    // TODO: figure something out
  };

  return (
    <TableRow hover>
      <TableCell>{row.description}</TableCell>
      <TableCell>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.antiquity > 10 && 'warning') || (row.antiquity > 20 && 'error') || 'success'}
        >
          {row.antiquity} Días
        </Label>
      </TableCell>
      {/* <TableCell>#{row.caseId}</TableCell> */}

      {/* <TableCell align="right">
        <Button variant="contained" onClick={() => handleClick(row)}>
          Ver
        </Button>
      </TableCell> */}
    </TableRow>
  );
}
