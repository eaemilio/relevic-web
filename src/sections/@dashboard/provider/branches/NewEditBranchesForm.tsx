import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ProviderBranch } from 'src/@types/provider';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import LocationMap from 'src/sections/location-map/LocationMap';
import * as Yup from 'yup';

type Props = {
  isEdit?: boolean;
  currentBranch?: ProviderBranch;
};

function NewEditBranchesForm({ isEdit = false, currentBranch }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const NewBranchSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    email: Yup.string().required('Campo obligatorio'),
    address: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
    phone: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Omit<ProviderBranch, 'id'> => ({
      name: currentBranch?.name ?? '',
      email: currentBranch?.email ?? '',
      phone: currentBranch?.phone ?? '',
      description: currentBranch?.description ?? '',
      address: currentBranch?.address ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBranch]
  );

  const methods = useForm<ProviderBranch>({
    resolver: yupResolver(NewBranchSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentBranch) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentBranch]);

  const onSubmit = async (data: ProviderBranch) => {
    try {
      // ! FIXME: Replace with API
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Sede Creada' : 'Cambios Guardados');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
            <Typography variant="h5" noWrap>
              Agregar Nueva Sede
            </Typography>
            <Typography variant="caption" noWrap>
              Selecciona en el mapa la ubicación exacta y llena los datos de la sede
            </Typography>
            <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
              <LocationMap />
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  mt: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="name" label="Nombre de Sede" />
                <RHFTextField name="address" label="Dirección Exacta" />
                <RHFTextField name="email" label="Correo de la Sede" />
                <RHFTextField name="phone" label="Número de teléfono de Sede" />
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Crear Sede' : 'Guardar Cambios'}
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default NewEditBranchesForm;
