import { Checkbox, MenuItem, TableCell, TableRow, useTheme } from '@mui/material';
import { useState } from 'react';
import { NetworkCase } from 'src/@types/case';
import { Roles } from 'src/@types/role';
import { CurrentUser } from 'src/@types/user';
import Iconify from 'src/components/Iconify';
import Label from 'src/components/Label';
import { TableMoreMenu } from 'src/components/table';
import useAuth from 'src/hooks/useAuth';

type Props = {
  row: NetworkCase;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function CaseTableRow({ row, onEditRow, onDeleteRow }: Props) {
  const { victim, provider, code, userInCharge, completed, inactive } = row;
  const { user } = useAuth();
  const theme = useTheme();
  const isAgent = (user as CurrentUser | null)?.role.id === Roles.AGENTE;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const backgroundColor = inactive
    ? theme.palette.error.main
    : completed
    ? theme.palette.background.neutral
    : theme.palette.primary.main;

  return (
    <TableRow hover>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {code}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {victim?.id}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {victim?.name}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {provider?.name}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {userInCharge?.name}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        <Label
          sx={{
            textTransform: 'capitalize',
            backgroundColor,
            color: theme.palette.getContrastText(backgroundColor),
          }}
        >
          {inactive ? 'Inactivo' : completed ? 'Cerrado' : 'Activo'}
        </Label>
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
