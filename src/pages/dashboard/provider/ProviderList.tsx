import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable';
import useSettings from 'src/hooks/useSettings';
import useTabs from 'src/hooks/useTabs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import ProviderTableToolbar from 'src/sections/@dashboard/provider/list/ProviderTableToolbar';
import Scrollbar from 'src/components/Scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/components/table';
import ProviderTableRow from 'src/sections/@dashboard/provider/list/ProviderTableRow';
import { ServiceProvider } from 'src/@types/provider';
import { PROVIDERS_MOCK } from 'src/_mock/provider';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import { ModuleType } from 'src/@types/module';
import useSWR from 'swr';

const TABLE_HEAD = [
  { id: 'id', label: 'Código', align: 'left' },
  { id: 'name', label: 'Proveedor', align: 'left' },
  { id: 'email', label: 'Correo Electrónico', align: 'left' },
  { id: 'phone', label: 'Teléfono', align: 'left' },
  { id: 'type', label: 'Tipo de Servicio', align: 'left' },
  { id: '' },
];

const BASE_URL = '/provider';

// ----------------------------------------------------------------------

export default function ProviderList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
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
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { data: tableData = [], mutate } = useSWR<ServiceProvider[]>(BASE_URL);
  const [filterName, setFilterName] = useState('');
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('todos');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: number) => {
    // TODO: Handle row delete
    setSelected([]);
  };

  const handleDeleteRows = (selected: (number | string)[]) => {
    // TODO: Handle rows delete
    setSelected([]);
  };

  const handleEditRow = (id: number) => {
    // ! FIXME: Redirect to providers edit page
    navigate(PATH_DASHBOARD.provider.edit(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterStatus);

  return (
    <RoleBasedGuard hasContent moduleId={ModuleType.PROVIDER}>
      <Page title="Usuarios">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Lista de Proveedores de Servicios"
            links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Proveedores' }]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.provider.new}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                Nuevo Proveedor
              </Button>
            }
          />

          <Card>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={filterStatus}
              onChange={onChangeFilterStatus}
              sx={{ px: 2, bgcolor: 'background.neutral' }}
            >
              {['todos', 'activo', 'desactivado'].map((tab) => (
                <Tab disableRipple key={tab} label={tab} value={tab} />
              ))}
            </Tabs>

            <Divider />

            <ProviderTableToolbar filterName={filterName} onFilterName={handleFilterName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
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
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <ProviderTableRow
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
                count={dataFiltered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />

              {/* <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            /> */}
            </Box>
          </Card>
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
}: {
  tableData: ServiceProvider[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'todos') {
    let isActive = false;
    if (filterStatus === 'activo') {
      isActive = true;
    }
    tableData = tableData.filter((item: Record<string, any>) => item.isActive === isActive);
  }

  return tableData;
}
