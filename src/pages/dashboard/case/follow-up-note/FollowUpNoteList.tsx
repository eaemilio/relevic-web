import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { CASE_BASE_URL, CurrentCase, NetworkCase } from 'src/@types/case';
import { FollowUpNote, FOLLOW_UP_BASE_URL } from 'src/@types/follow-up';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/components/table';
import useSettings from 'src/hooks/useSettings';
import useTable, { emptyRows } from 'src/hooks/useTable';
import { PATH_DASHBOARD } from 'src/routes/paths';
import FollowUpTableRow from 'src/sections/@dashboard/follow-up-note/FollowUpNoteTableRow';
import { removeAsync } from 'src/services/APIGateway';
import useSWR from 'swr';
import FollowUpCreate from './FollowUpNoteCreate';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'description', label: 'Descripción', align: 'left' },
  { id: 'createdAt', label: 'Fecha', align: 'left' },
  { id: '' },
];

export default function FollowUpNoteList() {
  const { themeStretch } = useSettings();
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<FollowUpNote | undefined>();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const denseHeight = dense ? 52 : 72;
  const { id } = useParams();
  const { data: currentCase, mutate } = useSWR<NetworkCase>(id ? `${CASE_BASE_URL}/${id}` : null);
  const { followUpNotes: tableData = [] } = currentCase ?? {};
  const isNotFound = !tableData.length;

  const handleDeleteRow = (id: number) => {
    if (currentCase) {
      mutate(async () => removeAsync(`${FOLLOW_UP_BASE_URL}/${id}`), {
        optimisticData: {
          ...currentCase,
          followUpNotes: tableData.filter((d) => d.id !== id),
        },
        rollbackOnError: true,
      });
      setSelected([]);
    }
  };

  const handleDeleteRows = (selected: (number | string)[]) => {
    // TODO: Handle rows delete
    setSelected([]);
  };

  const handleEditRow = (note: FollowUpNote) => {
    setOpen(true);
    setSelectedNote(note);
  };

  return (
    <Page title="Notas de Seguimiento">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {currentCase && (
          <FollowUpCreate
            currentCase={currentCase}
            open={open}
            handleClose={() => {
              setOpen(false);
              setSelectedNote(undefined);
            }}
            currentNote={selectedNote}
          />
        )}
        <HeaderBreadcrumbs
          heading={`Notas de Seguimiento para Caso #${currentCase?.id}`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: `Caso #${currentCase?.id}`,
              href: currentCase
                ? PATH_DASHBOARD.general.cases.edit(currentCase.id)
                : PATH_DASHBOARD.general.cases.new,
            },
            { name: 'Notas de Seguimiento' },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
                setSelectedNote(undefined);
              }}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              disabled={currentCase?.inactive || currentCase?.completed}
            >
              Programar Nota de Seguimiento
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', pt: 1 }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
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
                        onDeleteRow={() => handleDeleteRow(row.id)}
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
