import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BRANCH_BASE_URL,
  CurrentServiceProvider,
  ProviderBranch,
  ProviderBranchBody,
  PROVIDER_BASE_URL,
} from 'src/@types/provider';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import LocationMap from 'src/sections/location-map/LocationMap';
import axiosInstance from 'src/utils/axios';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  isEdit?: boolean;
  currentBranch?: ProviderBranch;
  onCancel?: () => void;
  currentProvider: CurrentServiceProvider;
};

function NewEditBranchesForm({ isEdit = false, currentBranch, onCancel, currentProvider }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const NewBranchSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    address: Yup.string().required('Campo obligatorio'),
    personInCharge: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Omit<ProviderBranchBody, 'latitude' | 'longitude'> => ({
      name: currentBranch?.name ?? '',
      email: currentBranch?.email ?? '',
      phoneNumber: currentBranch?.phoneNumber ?? '',
      address: currentBranch?.address ?? '',
      personInCharge: currentBranch?.personInCharge ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBranch]
  );

  const methods = useForm<ProviderBranchBody>({
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

  const saveBranch = async (
    data: ProviderBranchBody,
    providerId: number
  ): Promise<CurrentServiceProvider> => {
    try {
      const { data: branch } = await axiosInstance.post(BRANCH_BASE_URL, {
        ...data,
        providerId,
        latitude,
        longitude,
      });
      reset();
      enqueueSnackbar('Sede Creada');
      onCancel?.();
      return {
        ...currentProvider,
        branches: [...currentProvider.branches, branch],
      };
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al guardar los datos, inténtalo de nuevo', {
        variant: 'error',
      });
      return currentProvider;
    }
  };

  const updateBranch = async (data: ProviderBranchBody) => {
    try {
      const { data: branch } = await axiosInstance.put(`${BRANCH_BASE_URL}/${currentBranch?.id}`, {
        ...data,
        latitude,
        longitude,
      });
      enqueueSnackbar('Cambios Guardados');
      onCancel?.();
      return {
        ...currentProvider,
        branches: [...currentProvider.branches.filter((b) => b.id !== currentBranch?.id), branch],
      };
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al guardar los datos, inténtalo de nuevo', {
        variant: 'error',
      });
      return currentProvider;
    }
  };

  const onSubmit = async (data: ProviderBranchBody) => {
    const providerId = currentProvider.id;
    mutate<CurrentServiceProvider>(
      `${PROVIDER_BASE_URL}/${providerId}`,
      isEdit ? updateBranch(data) : saveBranch(data, providerId),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    );
  };

  const locationChanged = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
            <Typography variant="h5" noWrap>
              {isEdit ? 'Editar Sede' : 'Agregar Nueva Sede'}
            </Typography>
            <Typography variant="caption" noWrap>
              Selecciona en el mapa la ubicación exacta y llena los datos de la sede
            </Typography>
            <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
              <LocationMap
                onLocationChanged={locationChanged}
                currentCoords={
                  currentBranch
                    ? { lat: +currentBranch.latitude, lng: +currentBranch.longitude }
                    : undefined
                }
              />
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
                <RHFTextField name="personInCharge" label="Nombre de Persona a Cargo" />
                <RHFTextField name="email" label="Correo de la Sede" />
                <RHFTextField name="phoneNumber" label="Número de teléfono de Sede" />
              </Box>
              <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                {onCancel && (
                  <Button variant="contained" color="error" onClick={onCancel}>
                    Cancelar
                  </Button>
                )}
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Crear Sede' : 'Guardar Cambios'}
                </LoadingButton>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default NewEditBranchesForm;
