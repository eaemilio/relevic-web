import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Roles } from 'src/@types/role';
import { CurrentUser } from 'src/@types/user';
import { Victim } from 'src/@types/victim';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import useAuth from 'src/hooks/useAuth';

type Props = {
  row: Victim;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function VictimTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { id, name, birthday, citizenship, ethnicity, nationality } = row;
  const { user } = useAuth();
  const isAgent = (user as CurrentUser | null)?.role.id === Roles.AGENTE;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {id}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {name}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(birthday).format('DD/MM/YYYY')}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {citizenship}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {ethnicity}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {nationality}
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {!isAgent && (
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Eliminar
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Editar
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
