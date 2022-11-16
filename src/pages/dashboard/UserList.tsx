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
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// @types
import { CurrentUser } from '../../@types/user';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import useSWR from 'swr';
import { useSnackbar } from 'notistack';
import { editAsync, removeAsync } from 'src/services/APIGateway';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import { ModuleType } from 'src/@types/module';
import { useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { generateRandomPassword } from 'src/utils/jwt';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['todos', 'activo', 'desactivado'];

const ROLE_OPTIONS = ['todos', 'admin', 'director', 'agente'];

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', align: 'left' },
  { id: 'email', label: 'Correo Electrónico', align: 'left' },
  { id: 'role', label: 'Rol', align: 'left' },
  { id: 'provider', label: 'Organización', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
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
  const { user } = useAuth();

  const { data: tableData = [], mutate } = useSWR<CurrentUser[]>(
    user?.provider?.id === 1
      ? '/user'
      : user?.provider
      ? `/user/provider/${user?.provider?.id}`
      : null
  );

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('todos');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('todos');

  const { enqueueSnackbar } = useSnackbar();

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = async (id: number) => {
    try {
      await removeAsync(`/user/${id}`);
      mutate([...tableData.filter((td) => td.id !== id)]);
      setSelected([]);
    } catch {
      enqueueSnackbar('Ocurrió un error, inténtalo de nuevo', {
        variant: 'error',
      });
    }
  };

  const handleDeleteRows = (selected: number[]) => {
    setSelected([]);
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.user.edit(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleResetPassword = async (id: number) => {
    try {
      const password = generateRandomPassword();
      await editAsync(`/auth/${id}/password`, { password });
      navigator.clipboard.writeText(password);
      enqueueSnackbar('Se ha copiado la contraseña al portapapeles');
    } catch (error) {
      enqueueSnackbar('Ocurrió un error, inténtalo de nuevo');
    }
  };

  return (
    <RoleBasedGuard hasContent moduleId={ModuleType.USER}>
      <Page title="Usuarios">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Lista de Usuarios"
            links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Usuarios' }]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.user.new}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                Nuevo Usuario
              </Button>
            }
          />

          <Card>
            {/* <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={filterStatus}
              onChange={onChangeFilterStatus}
              sx={{ px: 2, bgcolor: 'background.neutral' }}
            >
              {STATUS_OPTIONS.map((tab) => (
                <Tab disableRipple key={tab} label={tab} value={tab} />
              ))}
            </Tabs> */}

            <Divider />

            {/* <UserTableToolbar
              filterName={filterName}
              filterRole={filterRole}
              onFilterName={handleFilterName}
              onFilterRole={handleFilterRole}
              optionsRole={ROLE_OPTIONS}
            /> */}

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
                        <UserTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          onResetPassword={() => handleResetPassword(row.id)}
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
  filterRole,
}: {
  tableData: CurrentUser[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterRole: string;
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
        (item.name ?? '').toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'todos') {
    let status = 'banned';
    if (filterStatus === 'activo') {
      status = 'active';
    }
    tableData = tableData.filter((item) => item.status === status);
  }

  if (filterRole !== 'todos') {
    // tableData = tableData.filter((item) => item.roleId === filterRole);
  }

  return tableData;
}
