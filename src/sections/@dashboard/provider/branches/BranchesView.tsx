import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { CurrentServiceProvider, ProviderBranch } from 'src/@types/provider';
import BranchesList from './BranchesList';
import NewEditBranchesForm from './NewEditBranchesForm';

interface BranchProps {
  currentProvider: CurrentServiceProvider;
}

export default function BranchesView({ currentProvider }: BranchProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [currentBranch, setCurrentBranch] = useState<ProviderBranch>();

  const { branches = [] } = currentProvider;

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
          currentProvider={currentProvider}
        />
      )}

      {!isCreating && !currentBranch && (
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          {branches.length ? (
            <BranchesList
              branches={branches}
              onCreate={() => setIsCreating(true)}
              onSelect={onSelect}
              currentProvider={currentProvider}
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
