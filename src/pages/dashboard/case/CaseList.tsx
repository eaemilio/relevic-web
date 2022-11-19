import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tabs,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CASE_BASE_URL, CASE_STATUS, CurrentCase, NetworkCase } from 'src/@types/case';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from 'src/components/table';
import useAuth from 'src/hooks/useAuth';
import useSettings from 'src/hooks/useSettings';
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable';
import useTabs from 'src/hooks/useTabs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import CaseTableRow from 'src/sections/@dashboard/case/list/CaseTableRow';
import CaseTableToolbar from 'src/sections/@dashboard/case/list/CaseTableToolbar';
import { editAsync } from 'src/services/APIGateway';
import useSWR from 'swr';

const TABLE_HEAD = [
  { id: 'id', label: 'Código de Caso', align: 'left' },
  { id: 'victim.id', label: 'Cédula de la Víctima', align: 'left' },
  { id: 'victim.name', label: 'Nombre de la Víctima', align: 'left' },
  { id: 'provider.id', label: 'Nombre de la Organización', align: 'left' },
  { id: 'userInCharge.id', label: 'Persona a Cargo', align: 'left' },
  { id: 'status', label: 'Estado', align: 'left' },
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
    setPage,
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
  const navigate = useNavigate();

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('Activos');
  const [filterCode, setFilterCode] = useState('');

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterCode,
    filterStatus,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterStatus) || (!dataFiltered.length && !!filterCode);

  const handleDeleteRow = async (caseSelected: CurrentCase) => {
    await editAsync<Partial<CurrentCase>, CurrentCase>(`${BASE_URL}/${caseSelected.id}`, {
      inactive: true,
    });
    mutate([
      ...tableData.filter((t) => t.id !== caseSelected.id),
      {
        ...caseSelected,
        inactive: true,
      },
    ]);
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.general.cases.edit(id));
  };

  const handleFilterCode = (c: string) => {
    setFilterCode(c);
    setPage(0);
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
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {CASE_STATUS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <CaseTableToolbar filterCode={filterCode} onFilterCode={handleFilterCode} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', pt: 1 }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  onSort={onSort}
                />

                <TableBody>
                  {(dataFiltered ?? [])
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <CaseTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row)}
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
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

function applySortFilter({
  tableData,
  comparator,
  filterCode,
  filterStatus,
}: {
  tableData: CurrentCase[];
  comparator: (a: any, b: any) => number;
  filterCode: string;
  filterStatus: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterCode) {
    tableData = tableData.filter(
      (item) => (item.code ?? '').toLowerCase().indexOf(filterCode.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'Todos') {
    if (filterStatus === 'Activos') {
      tableData = tableData.filter((item) => item.inactive === false && item.completed === false);
    }
    if (filterStatus === 'Inactivos') {
      tableData = tableData.filter((item) => item.inactive === true);
    }
    if (filterStatus === 'Cerrados') {
      tableData = tableData.filter((item) => item.inactive === false && item.completed === true);
    }
  }

  return tableData;
}
