import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ServiceType } from 'src/@types/service-type';
import { RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  isEdit: boolean;
  currentService?: ServiceType;
};

const BASE_URL = '/service-type';

export default function ServiceTypeNewEditForm({ isEdit, currentService }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Omit<ServiceType, 'id'> => ({
      name: currentService?.name ?? '',
      description: currentService?.description ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentService]
  );

  const methods = useForm<ServiceType>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentService) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentService]);

  const onSubmit = async (data: ServiceType) => {
    try {
      if (isEdit && currentService) {
        mutate<ServiceType[]>(
          BASE_URL,
          async (services = []) => {
            const updatedService = await editAsync<ServiceType>(
              `${BASE_URL}/${currentService.id}`,
              data
            );
            const filtered = services.filter((service) => service.id !== currentService.id);
            return [...filtered, updatedService];
          },
          { revalidate: false }
        );
      } else if (!isEdit) {
        await createAsync<ServiceType>(BASE_URL, data);
      }
      navigate(PATH_DASHBOARD.serviceType.list);
      enqueueSnackbar(currentService ? 'Cambios guardados' : 'Tipo de Servicio Creado');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
              <Typography variant="h5" noWrap>
                Información General
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  mt: 3,
                }}
              >
                <RHFTextField name="name" label="Nombre del tipo de servicio" />
                <RHFTextField name="description" label="Descripción" />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Tipo de Servicio' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
