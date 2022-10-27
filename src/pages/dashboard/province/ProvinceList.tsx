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
import { ModuleType } from 'src/@types/module';
import { Province } from 'src/@types/province';
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
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import useSettings from 'src/hooks/useSettings';
import useTable, { emptyRows } from 'src/hooks/useTable';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ProvinceTableRow from 'src/sections/@dashboard/province/list/ProvinceTableRow';
import { removeAsync } from 'src/services/APIGateway';
import { PROVINCE } from 'src/_mock/province';
import useSWR from 'swr';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'name', label: 'Provincia', align: 'left' },
  { id: 'description', label: 'Descripción', align: 'left' },
  { id: '' },
];

const BASE_URL = '/province';

export default function ProvinceList() {
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
  const { data: tableData = [], mutate } = useSWR<Province[]>(BASE_URL);
  const isNotFound = !tableData.length;
  const navigate = useNavigate();

  const handleDeleteRow = (id: number) => {
    mutate(async () => removeAsync(`${BASE_URL}/${id}`), {
      optimisticData: tableData.filter((d) => d.id !== id),
      rollbackOnError: true,
    });
    setSelected([]);
  };

  const handleDeleteRows = (selected: (number | string)[]) => {
    // TODO: Handle rows delete
    setSelected([]);
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.province.edit(id));
  };

  return (
    <RoleBasedGuard hasContent moduleId={ModuleType.PROVINCE}>
      <Page title="Provincias">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Listado"
            links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Provincias' }]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.province.new}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                Nueva Provincia
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
                        <ProvinceTableRow
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
    </RoleBasedGuard>
  );
}
