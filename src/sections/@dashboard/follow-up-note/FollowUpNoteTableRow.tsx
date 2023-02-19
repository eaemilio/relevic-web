import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FollowUpNote } from 'src/@types/follow-up';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

type Props = {
  row: FollowUpNote;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function FollowUpNoteTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { id, description, dueDate } = row;

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

      <TableCell align="left">{description}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(dueDate).calendar(dayjs(), {
          sameDay: '[Hoy a las] h:mm A', // The same day ( Today at 2:30 AM )
          nextDay: '[Mañana a las] h:mm A',
          nextWednesday: '[Próximo Miércoles a las] h:mm A',
          sameElse: 'DD/MM/YYYY h:mm A',
        })}
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
