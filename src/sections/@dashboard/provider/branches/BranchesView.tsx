import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { ProviderBranch } from 'src/@types/provider';
import useSWR from 'swr';
import BranchesList from './BranchesList';
import NewEditBranchesForm from './NewEditBranchesForm';

interface BranchProps {
  providerId?: number;
}

export default function BranchesView({ providerId }: BranchProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [currentBranch, setCurrentBranch] = useState<ProviderBranch>();

  const {
    data: branches = [
      // {
      //   id: 1,
      //   name: 'Test 1',
      //   address: '51AVE 2-95 Naciones Unidas 1',
      //   email: 'test1@branch.com',
      //   phone: 54678999,
      // },
      // {
      //   id: 2,
      //   name: 'Test 2',
      //   address: '51AVE 2-95 Naciones Unidas 1',
      //   email: 'test2@branch.com',
      //   phone: 52658999,
      // },
    ],
  } = useSWR(providerId ? `/provider/${providerId}/branch` : null);

  const onSelect = (branch: ProviderBranch) => {
    setCurrentBranch(branch);
    setIsCreating(false);
  };

  const onCancel = () => {
    setCurrentBranch(undefined);
    setIsCreating(false);
  };

  return (
    <>
      {(isCreating || !!currentBranch) && (
        <NewEditBranchesForm
          currentBranch={currentBranch}
          isEdit={!!currentBranch}
          onCancel={onCancel}
        />
      )}

      {!isCreating && !currentBranch && (
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          {branches.length ? (
            <BranchesList
              branches={branches}
              onCreate={() => setIsCreating(true)}
              onSelect={onSelect}
            />
          ) : (
            <Grid item xs={4} sx={{ mt: 2 }}>
              <Box
                sx={{ p: 3, flexDirection: 'column', display: 'flex', justifyContent: 'center' }}
              >
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                  No hay sedes registradas para este proveedor.
                </Typography>
                <Button variant="contained" sx={{ mt: 4 }} onClick={() => setIsCreating(true)}>
                  Agregar Nueva Sede
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
