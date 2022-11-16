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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Victim, VICTIM_BASE_URL } from 'src/@types/victim';
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
import VictimTableRow from 'src/sections/@dashboard/victim/list/VictimTableRow';
import { removeAsync } from 'src/services/APIGateway';
import useSWR from 'swr';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'name', label: 'Nombre', align: 'left' },
  { id: 'birthday', label: 'Fecha de Nacimiento', align: 'left' },
  { id: 'citizenship', label: 'Ciudadanía', align: 'left' },
  { id: 'ethnicity', label: 'Etnicidad', align: 'left' },
  { id: 'nationality', label: 'Nacionalidad', align: 'left' },
  { id: '' },
];

export default function EvaluationAreaList() {
  const { themeStretch } = useSettings();
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
  const { data: tableData = [], mutate } = useSWR<Victim[]>(VICTIM_BASE_URL);
  const isNotFound = !tableData.length;
  const navigate = useNavigate();

  const handleDeleteRow = async (id: number) => {
    await removeAsync(`${VICTIM_BASE_URL}/${id}`);
    mutate(tableData.filter((d) => d.id !== id));
    setSelected([]);
  };

  const handleDeleteRows = (selected: (number | string)[]) => {
    // TODO: Handle rows delete
    setSelected([]);
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.general.victims.edit(id));
  };

  return (
    // <RoleBasedGuard hasContent moduleId={ModuleType.EVALUATION_AREA}> FIXME
    <Page title="Víctimas">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Listado de Víctimas"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Víctimas' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.general.victims.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Nueva Víctima
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
                      <VictimTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
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
    // </RoleBasedGuard>
  );
}
