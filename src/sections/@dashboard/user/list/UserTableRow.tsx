import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  MenuItem,
  Tooltip,
} from '@mui/material';
// @types
import { CurrentUser, UserManager } from '../../../../@types/user';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

type Props = {
  row: CurrentUser;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onResetPassword: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onResetPassword,
}: Props) {
  const theme = useTheme();

  const { name, role, provider, email } = row;

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

      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {role && provider ? (
          role?.name
        ) : (
          <Label
            sx={{
              textTransform: 'capitalize',
              backgroundColor: theme.palette.primary.dark,
            }}
          >
            VÍCTIMA
          </Label>
        )}
      </TableCell>

      <Tooltip title={provider && role ? provider?.name : 'VÍCTIMA'} placement="top-start">
        <TableCell align="left">
          <Label
            sx={{
              textTransform: 'capitalize',
              backgroundColor: provider && role ? 'transparent' : theme.palette.primary.dark,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 300,
              justifyContent: 'flex-start',
            }}
          >
            {provider && role ? provider?.name : 'VÍCTIMA'}
          </Label>
        </TableCell>
      </Tooltip>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
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
              <MenuItem
                onClick={() => {
                  onResetPassword();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'material-symbols:lock-reset-rounded'} />
                Resetear Contraseña
              </MenuItem>
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
