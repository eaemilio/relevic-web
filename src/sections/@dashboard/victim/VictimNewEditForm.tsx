import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, styled, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { MARITAL_STATUES, Victim, VICTIM_BASE_URL } from 'src/@types/victim';
import { RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  isEdit: boolean;
  currentVictim?: Victim;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function VictimNewEditForm({ isEdit, currentVictim }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Victim => ({
      id: currentVictim?.id ?? 0,
      name: currentVictim?.name ?? '',
      otherName: currentVictim?.otherName ?? '',
      age: currentVictim?.age ?? 0,
      verifiedAge: currentVictim?.verifiedAge ?? 0,
      birthday: currentVictim?.birthday ?? '',
      citizenship: currentVictim?.citizenship ?? '',
      ethnicity: currentVictim?.ethnicity ?? '',
      nationality: currentVictim?.nationality ?? '',
      maritalStatus: currentVictim?.maritalStatus ?? 0,
      children: currentVictim?.children ?? 0,
      originAddress: currentVictim?.originAddress ?? '',
      currentAddress: currentVictim?.currentAddress ?? '',
      phoneNumber: currentVictim?.phoneNumber ?? '',
      preferredLanguage: currentVictim?.preferredLanguage ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVictim]
  );

  const methods = useForm<Victim>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentVictim) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVictim]);

  const onSubmit = async (data: Victim) => {
    try {
      if (isEdit && currentVictim) {
        mutate<Victim[]>(
          VICTIM_BASE_URL,
          async (victims = []) => {
            const updated = await editAsync<Victim>(`${VICTIM_BASE_URL}/${currentVictim.id}`, data);
            const filtered = victims.filter((victim) => victim.id !== currentVictim.id);
            return [...filtered, updated];
          },
          { revalidate: false }
        );
      } else if (!isEdit) {
        await createAsync<Victim>(VICTIM_BASE_URL, data);
      }
      navigate(PATH_DASHBOARD.general.victims.list);
      enqueueSnackbar(currentVictim ? 'Cambios guardados' : 'Víctima Creada');
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
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                  mt: 3,
                }}
              >
                <RHFTextField name="name" label="Nombre (como se indica)" />
                <RHFTextField name="otherName" label="Otros nombres usados" />
                <RHFTextField name="id" label="Cédula" />
                <RHFTextField name="age" label="Edad, indicado" type="number" />
                <RHFTextField name="verifiedAge" label="Edad, verificada" type="number" />
                <RHFTextField name="birthday" label="Fecha de nacimiento (si es conocida)" />
                <RHFTextField name="citizenship" label="Ciudadanía" />
                <RHFTextField name="ethnicity" label="Etnicidad" />
                <RHFTextField name="nationality" label="País/Providencia de origen" />
                <RHFTextField name="originAddress" label="Dirección (de origen)" />
                <RHFTextField name="currentAddress" label="Dirección (actual)" />
                <RHFTextField name="phoneNumber" label="Número(s) de teléfono" />
                <RHFTextField name="preferredLanguage" label="Idioma Preferido" />
                <RHFTextField name="children" label="Cantidad de Hijos" type="number" />
              </Box>
              <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
                <Box>
                  <LabelStyle>Estado Civil</LabelStyle>
                  <RHFRadioGroup
                    name="maritalStatus"
                    options={MARITAL_STATUES}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Víctima' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
