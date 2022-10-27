import { Box, Button, Card, Grid, IconButton, MenuItem, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import {
  BRANCH_BASE_URL,
  CurrentServiceProvider,
  ProviderBranch,
  PROVIDER_BASE_URL,
} from 'src/@types/provider';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import axiosInstance from 'src/utils/axios';
import { useSWRConfig } from 'swr';

interface BranchesListProps {
  branches: ProviderBranch[];
  onCreate: () => void;
  onSelect: (branch: ProviderBranch) => void;
  currentProvider: CurrentServiceProvider;
}

export default function BranchesList({
  branches,
  onCreate,
  onSelect,
  currentProvider,
}: BranchesListProps) {
  const { mutate } = useSWRConfig();
  const { enqueueSnackbar } = useSnackbar();

  const deleteBranch = async (id: number): Promise<CurrentServiceProvider> => {
    try {
      await axiosInstance.delete(`${BRANCH_BASE_URL}/${id}`);
      enqueueSnackbar('Sede Eliminada');
      return {
        ...currentProvider,
        branches: currentProvider.branches.filter((b) => b.id !== id),
      };
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al eliminar la sede, inténtalo de nuevo', {
        variant: 'error',
      });
      return currentProvider;
    }
  };

  const onDeleteRow = (event: React.MouseEvent<HTMLElement>, branch: ProviderBranch) => {
    console.log(branch);
    event.stopPropagation();
    mutate(`${PROVIDER_BASE_URL}/${currentProvider.id}`, deleteBranch(branch.id));
  };

  return (
    <Grid item xs={12} md={12} sx={{ mt: 2 }}>
      <Button variant="contained" sx={{ mb: 4 }} onClick={onCreate}>
        Agregar Nueva Sede
      </Button>
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        {branches.map((branch) => (
          <Card sx={{ p: 3, cursor: 'pointer' }} key={branch.id} onClick={() => onSelect(branch)}>
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <IconButton onClick={(e) => onDeleteRow(e, branch)} sx={{ color: 'error.main' }}>
                <Iconify icon={'heroicons:trash-solid'} width={20} height={20} />
              </IconButton>
            </Box>
            <Typography variant="h6">{branch.name}</Typography>
            <Box
              sx={{
                display: 'grid',
                columnGap: 3,
                rowGap: 1,
                mt: 4,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Iconify icon={'heroicons:phone-solid'} width={20} height={20} />
                <Typography variant="body2">{branch.phoneNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Iconify icon={'heroicons:envelope-20-solid'} width={20} height={20} />
                <Typography variant="body2">{branch.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Iconify icon={'ic:round-place'} width={20} height={20} />
                <Typography variant="body2">{branch.address}</Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Grid>
  );
}
