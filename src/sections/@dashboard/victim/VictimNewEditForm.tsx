import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, styled, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { GENRE_OPTIONS, MARITAL_STATUES, Victim, VICTIM_BASE_URL } from 'src/@types/victim';
import { RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
    id: Yup.number().min(1, 'Cédula no válida').required('Campo obligatorio'),
    age: Yup.number().min(1, 'Edad debe ser mayor a 0').required('Campo obligatorio'),
    verifiedAge: Yup.number().min(1, 'Edad debe ser mayor a 0').required('Campo obligatorio'),
    // birthday: Yup.date().required('Campo obligatorio'),
    citizenship: Yup.string().required('Campo obligatorio'),
    ethnicity: Yup.string().required('Campo obligatorio'),
    nationality: Yup.string().required('Campo obligatorio'),
    maritalStatus: Yup.number().min(1, 'Campo obligatorio'),
    currentAddress: Yup.string().required('Campo obligatorio'),
    children: Yup.number(),
  });

  const defaultValues = useMemo(
    (): Victim => ({
      id: currentVictim?.id ?? 0,
      name: currentVictim?.name ?? '',
      otherName: currentVictim?.otherName ?? '',
      age: currentVictim?.age ?? 0,
      verifiedAge: currentVictim?.verifiedAge ?? 0,
      birthday: currentVictim?.birthday ?? new Date().toString(),
      citizenship: currentVictim?.citizenship ?? '',
      ethnicity: currentVictim?.ethnicity ?? '',
      nationality: currentVictim?.nationality ?? '',
      maritalStatus: currentVictim?.maritalStatus ?? 0,
      children: currentVictim?.children ?? 0,
      genre: currentVictim?.genre ?? 0,
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
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchBirthday = watch('birthday');

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
        await mutate<Victim[]>(
          VICTIM_BASE_URL,
          async (victims = []) => {
            const updated = await editAsync<Victim>(`${VICTIM_BASE_URL}/${currentVictim.id}`, {
              ...data,
              // birthday: undefined,
            });
            const filtered = victims.filter((victim) => victim.id !== currentVictim.id);
            return [...filtered, updated];
          },
          { revalidate: false, rollbackOnError: true }
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
                <RHFTextField name="citizenship" label="Ciudadanía" />
                <RHFTextField name="ethnicity" label="Etnicidad" />
                <RHFTextField name="nationality" label="País/Providencia de origen" />
                <RHFTextField name="phoneNumber" label="Número(s) de teléfono" />
                <RHFTextField name="preferredLanguage" label="Idioma Preferido" />
                <RHFTextField name="children" label="Cantidad de Hijos" type="number" />
              </Box>
              <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
                <RHFTextField name="originAddress" label="Dirección (de origen)" />
                <RHFTextField name="currentAddress" label="Dirección (actual)" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Fecha de nacimiento (si es conocida)"
                    inputFormat="DD/MM/YYYY"
                    value={watchBirthday}
                    onChange={(e) => e && setValue('birthday', e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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
                <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
                  <Box>
                    <LabelStyle>Género</LabelStyle>
                    <RHFRadioGroup
                      name="genre"
                      options={GENRE_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
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
