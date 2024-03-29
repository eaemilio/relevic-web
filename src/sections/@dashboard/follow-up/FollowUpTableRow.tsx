import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FollowUp } from 'src/@types/follow-up';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

type Props = {
  row: FollowUp;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function FollowUpTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { date, canceled, lawyer, tribunal } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(date).calendar(dayjs(), {
          sameDay: '[Hoy a las] h:mm A', // The same day ( Today at 2:30 AM )
          nextDay: '[Mañana a las] h:mm A',
          lastDay: '[Ayer a las] h:mm A',
          sameElse: 'DD/MM/YYYY h:mm A',
        })}
      </TableCell>

      <TableCell align="left">{lawyer}</TableCell>
      <TableCell align="left">{tribunal}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {canceled ? 'Cancelada' : ''}
      </TableCell>

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
