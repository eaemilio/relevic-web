import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { ProviderBranch } from 'src/@types/provider';
import Iconify from 'src/components/Iconify';

interface BranchesListProps {
  branches: ProviderBranch[];
  onCreate: () => void;
  onSelect: (branch: ProviderBranch) => void;
}

export default function BranchesList({ branches, onCreate, onSelect }: BranchesListProps) {
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
                <Typography variant="body2">{branch.phone}</Typography>
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
