import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { EvaluationArea } from 'src/@types/evaluation-area';
import { RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  isEdit: boolean;
  currentEvaluationArea?: EvaluationArea;
};

const BASE_URL = '/evaluation-area';

export default function EvaluationAreaNewEditForm({ isEdit, currentEvaluationArea }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Omit<EvaluationArea, 'id'> => ({
      name: currentEvaluationArea?.name ?? '',
      description: currentEvaluationArea?.description ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentEvaluationArea]
  );

  const methods = useForm<EvaluationArea>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentEvaluationArea) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentEvaluationArea]);

  const onSubmit = async (data: EvaluationArea) => {
    try {
      if (isEdit && currentEvaluationArea) {
        mutate<EvaluationArea[]>(
          BASE_URL,
          async (items = []) => {
            const updated = await editAsync<EvaluationArea>(
              `${BASE_URL}/${currentEvaluationArea.id}`,
              data
            );
            const filtered = items.filter((item) => item.id !== currentEvaluationArea.id);
            return [...filtered, updated];
          },
          { revalidate: false }
        );
      } else if (!isEdit) {
        await createAsync<EvaluationArea>(BASE_URL, data);
      }
      navigate(PATH_DASHBOARD.evaluationArea.list);
      enqueueSnackbar(currentEvaluationArea ? 'Cambios guardados' : 'Área de Evaluación Creada');
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
                <RHFTextField name="name" label="Nombre del área de evaluación" />
                <RHFTextField name="description" label="Descripción" />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear área de evaluación' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
