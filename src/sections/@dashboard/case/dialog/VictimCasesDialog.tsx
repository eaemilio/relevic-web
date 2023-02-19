import {
  Typography,
  TableBody,
  TableContainer,
  TableRow,
  Table,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TableCell,
  useTheme,
  DialogContent,
} from '@mui/material';
import dayjs from 'dayjs';
import { NetworkCase } from 'src/@types/case';
import Label from 'src/components/Label';
import { TableHeadCustom } from 'src/components/table';
import useTable from 'src/hooks/useTable';

const TABLE_HEAD = [
  { id: 'id', label: 'Código de Caso', align: 'left' },
  { id: 'description', label: 'Descripción', align: 'left' },
  { id: 'date', label: 'Fecha de Apertura de Caso', align: 'left' },
  { id: 'status', label: 'Estado', align: 'left' },
];

type Props = {
  open: boolean;
  handleClose: (selected?: Partial<NetworkCase>) => void;
  cases: Partial<NetworkCase>[];
};

export default function VictimCasesDialog({ open, handleClose, cases }: Props) {
  const { order, orderBy, onSort } = useTable();
  const theme = useTheme();
  const backgroundColor = (networkCase: Partial<NetworkCase>): string =>
    networkCase.inactive
      ? theme.palette.error.main
      : networkCase.completed
      ? theme.palette.background.neutral
      : theme.palette.primary.main;
  return (
    <Dialog open={open} onClose={() => handleClose()} maxWidth="xl">
      <DialogTitle>Resultados de la búsqueda</DialogTitle>
      <DialogContent>
        <Typography variant="caption">Haga click en el caso para seleccionarlo.</Typography>
        <TableContainer sx={{ minWidth: 800, position: 'relative', pt: 1 }}>
          <Table size={'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={cases.length}
              onSort={onSort}
            />

            <TableBody>
              {cases.map((row, index) => (
                <TableRow
                  hover
                  key={row.code}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleClose(row)}
                >
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {row.code}
                  </TableCell>
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {row.description}
                  </TableCell>
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {dayjs(row.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    <Label
                      sx={{
                        textTransform: 'capitalize',
                        backgroundColor: backgroundColor(row),
                        color: theme.palette.getContrastText(backgroundColor(row)),
                      }}
                    >
                      {row.inactive ? 'Inactivo' : row.completed ? 'Cerrado' : 'Activo'}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
