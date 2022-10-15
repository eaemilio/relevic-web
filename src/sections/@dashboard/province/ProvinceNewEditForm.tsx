import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Province } from 'src/@types/province';
import { RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  isEdit: boolean;
  currentProvince?: Province;
};

const BASE_URL = '/province';

export default function ProvinceNewEditForm({ isEdit, currentProvince }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Omit<Province, 'id'> => ({
      name: currentProvince?.name ?? '',
      description: currentProvince?.description ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProvince]
  );

  const methods = useForm<Province>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentProvince) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProvince]);

  const onSubmit = async (data: Province) => {
    try {
      if (isEdit && currentProvince) {
        mutate<Province[]>(
          BASE_URL,
          async (provinces = []) => {
            const updated = await editAsync<Province>(`${BASE_URL}/${currentProvince.id}`, data);
            const filtered = provinces.filter((province) => province.id !== currentProvince.id);
            return [...filtered, updated];
          },
          { revalidate: false }
        );
      } else if (!isEdit) {
        await createAsync<Province>(BASE_URL, data);
      }
      navigate(PATH_DASHBOARD.province.list);
      enqueueSnackbar(currentProvince ? 'Cambios guardados' : 'Provincia Creada');
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
                <RHFTextField name="name" label="Nombre de la Provincia" />
                <RHFTextField name="description" label="Descripción" />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Provincia' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
