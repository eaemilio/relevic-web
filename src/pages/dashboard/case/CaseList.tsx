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
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import { Roles } from 'src/@types/role';
import { CurrentUser } from 'src/@types/user';
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
import useAuth from 'src/hooks/useAuth';
import useSettings from 'src/hooks/useSettings';
import useTable, { emptyRows } from 'src/hooks/useTable';
import { PATH_DASHBOARD } from 'src/routes/paths';
import CaseTableRow from 'src/sections/@dashboard/case/list/CaseTableRow';
import { removeAsync } from 'src/services/APIGateway';
import useSWR from 'swr';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'victim.id', label: 'Cédula de la Víctima', align: 'left' },
  { id: 'victim.name', label: 'Nombre de la Víctima', align: 'left' },
  { id: 'provider.id', label: 'Nombre de la Organización', align: 'left' },
  { id: 'userInCharge.id', label: 'Persona a Cargo', align: 'left' },
  { id: '' },
];

const BASE_URL = '/case';

export default function CaseList() {
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
  const { user } = useAuth();
  const providerId = user?.provider?.id;
  const isRootProvider = providerId === 1;
  const { data: tableData = [], mutate } = useSWR<NetworkCase[]>(
    isRootProvider ? BASE_URL : providerId ? `${CASE_BASE_URL}/provider/${providerId}` : null
  );
  const isNotFound = !tableData.length;
  const navigate = useNavigate();

  const handleDeleteRow = async (id: number) => {
    await removeAsync(`${BASE_URL}/${id}`);
    mutate(tableData.filter((d) => d.id !== id));
    setSelected([]);
  };

  const handleDeleteRows = (selected: (number | string)[]) => {
    // TODO: Handle rows delete
    setSelected([]);
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.general.cases.edit(id));
  };

  return (
    <Page title="Casos">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Listado de casos"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Casos' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.general.cases.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Nuevo Caso
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
                  {(tableData ?? [])
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <CaseTableRow
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
  );
}