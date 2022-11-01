import Box from '@mui/material/Box';
import {
  DataGrid,
  GridActionsCellItem,
  GridAddIcon,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  MuiEvent,
} from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { randomId } from '@mui/x-data-grid-generator';
import Iconify from 'src/components/Iconify';
import { ATTENTION_PROTOCOL_COLUMNS } from 'src/@types/attention-protocol';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowsProp) => GridRowsProp) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        mainGoal: '',
        dueDate: '',
        goals: '',
        goalsDueDate: '',
        status: '',
        providedBy: '',
        comments: '',
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'mainGoal' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">Seguridad</Typography>
          <Typography variant="body2">La libertad del abuso y seguridad personal</Typography>
        </Box>
        <Button color="primary" startIcon={<GridAddIcon />} onClick={handleClick}>
          Agregar Registro
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}

type GridProps = {
  onGridChange: (
    key: 'security' | 'legalProtection' | 'mental' | 'financial' | 'social' | 'physical',
    value: string
  ) => void;
  values: string;
};

export default function SecurityProtocolGrid({ onGridChange, values }: GridProps) {
  const [rows, setRows] = useState<GridRowsProp>(JSON.parse(values));
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColumns = [
    ...ATTENTION_PROTOCOL_COLUMNS,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Iconify icon={'icon-park-twotone:save'} width={24} height={24} />}
              label="Guardar"
              onClick={handleSaveClick(id)}
              key={id}
            />,
            <GridActionsCellItem
              icon={<Iconify icon={'icon-park-twotone:close-one'} width={24} height={24} />}
              label="Cancelar"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key={id}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Iconify icon={'icon-park-twotone:edit'} width={24} height={24} />}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            key={id}
          />,
          <GridActionsCellItem
            icon={<Iconify icon={'icon-park-twotone:delete'} width={24} height={24} />}
            label="Eliminar"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={id}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    onGridChange('security', JSON.stringify(rows));
  }, [rows, onGridChange]);

  return (
    <Box sx={{ height: 300, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter={true}
      />
    </Box>
  );
}
