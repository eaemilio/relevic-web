import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import { FollowUp } from 'src/@types/follow-up';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from 'src/components/table';
import useSettings from 'src/hooks/useSettings';
import useTable, { emptyRows } from 'src/hooks/useTable';
import { PATH_DASHBOARD } from 'src/routes/paths';
import FollowUpTableRow from 'src/sections/@dashboard/follow-up/FollowUpTableRow';
import { removeAsync } from 'src/services/APIGateway';
import useSWR from 'swr';
import FollowUpCreate from './FollowUpCreate';

const TABLE_HEAD = [
  { id: 'date', label: 'Fecha', align: 'left' },
  { id: 'lawyer', label: 'Abogado Actuante', align: 'left' },
  { id: 'tribunal', label: 'Tribunal', align: 'left' },
  { id: 'status', label: 'Estado', align: 'left' },
  { id: '' },
];

export default function FollowUpList() {
  const { themeStretch } = useSettings();
  const [open, setOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | undefined>();
  const {
    dense,
    page,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const denseHeight = dense ? 52 : 72;
  const { id } = useParams();
  const { data: currentCase, mutate } = useSWR<NetworkCase>(id ? `${CASE_BASE_URL}/${id}` : null);
  const { followUps: tableData = [] } = currentCase ?? {};
  const isNotFound = !tableData.length;
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRow = async (followUp: FollowUp) => {
    try {
      if (!currentCase) {
        return;
      }
      await removeAsync(`follow-up/${followUp.id}`);
      mutate({
        ...currentCase,
        followUps: tableData.filter((d) => d.id !== followUp.id),
      });
    } catch (error) {
      enqueueSnackbar(
        'Ocurrió un error al eliminar el seguimiento, vuelve a intentarlo. Si el error persiste, contacta a soporte.',
        {
          variant: 'error',
          persist: true,
        }
      );
    }
  };

  const handleEditRow = (followUp: FollowUp) => {
    setOpen(true);
    setSelectedFollowUp(followUp);
  };

  return (
    <Page title="Seguimientos">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 2 }}>
        {currentCase && (
          <FollowUpCreate
            currentCase={currentCase}
            open={open}
            handleClose={() => {
              setOpen(false);
              setSelectedFollowUp(undefined);
            }}
            currentFollowUp={selectedFollowUp}
          />
        )}
        <HeaderBreadcrumbs
          heading={`Audiencias`}
          links={[{ name: 'Audiencias', href: PATH_DASHBOARD.root }]}
          action={
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
                setSelectedFollowUp(undefined);
              }}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              disabled={currentCase?.inactive || currentCase?.completed}
            >
              Nueva Audiencia
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', pt: 1 }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  onSort={onSort}
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <FollowUpTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
