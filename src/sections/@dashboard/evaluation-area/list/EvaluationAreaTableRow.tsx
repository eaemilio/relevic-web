import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { EvaluationArea } from 'src/@types/evaluation-area';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';

type Props = {
  row: EvaluationArea;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function EvaluationAreaTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, id, description } = row;

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
        {description}
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
