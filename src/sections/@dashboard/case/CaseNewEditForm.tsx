import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Grid,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { EMPTY_ATTENTION_PROTOCOL } from 'src/@types/attention-protocol';
import { CurrentCase, NetworkCase, NetworkCaseBody } from 'src/@types/case';
import { EMPTY_DEMOGRAPHIC_FORM } from 'src/@types/demographic-form';
import { PROVIDER_BASE_URL, ServiceProvider } from 'src/@types/provider';
import { EMPTY_SURVIVOR_EVALUATION, SurvivorEvaluationPhase } from 'src/@types/survivor-evaluation';
import { UserManager, USER_BASE_URL } from 'src/@types/user';
import { EMPTY_VICTIM, MARITAL_STATUES, MOCK_VICTIM, Victim } from 'src/@types/victim';
import { RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { _userList } from 'src/_mock';
import useSWR, { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import EvaluationCaseTable from './list/EvaluationCaseTable';

type Props = {
  isEdit: boolean;
  currentCase?: CurrentCase;
};

const BASE_URL = '/case';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function CaseNewEditForm({ isEdit, currentCase }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    // description: Yup.string().required('Campo obligatorio'),
    providerId: Yup.number().min(1, 'Selecciona un Proveedor').required('Campo obligatorio'),
    // userInChargeId: Yup.string().min(1, 'Selecciona un usuario').required('Campo obligatorio'),
    // 'victim.name': Yup.string().required('Campo obligatorio'),
    // 'victim.age': Yup.string().required('Campo obligatorio'),
    // 'victim.verifiedAge': Yup.string().required('Campo obligatorio'),
    // 'victim.birthday': Yup.string().required('Campo obligatorio'),
    // 'victim.citizenship': Yup.string().required('Campo obligatorio'),
    // 'victim.ethnicity': Yup.string().required('Campo obligatorio'),
    // 'victim.nationality': Yup.string().required('Campo obligatorio'),
    // 'victim.maritalStatus': Yup.number().required('Campo obligatorio'),
    // 'victim.currentAddress': Yup.string().required('Campo obligatorio'),
    // 'victim.preferredLanguage': Yup.string().required('Campo obligatorio'),
    // 'victim.id': Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): NetworkCaseBody => ({
      description: currentCase?.description ?? '',
      providerId: currentCase?.providerId ?? 0,
      userInChargeId: currentCase?.providerId ?? 0,
      consent: currentCase?.consent ?? false,
      followUpUserInCharge: currentCase?.followUpUserInCharge ?? 0,
      victim: currentCase?.victim ?? EMPTY_VICTIM,
      demographicForm: currentCase?.demographicForm ?? EMPTY_DEMOGRAPHIC_FORM,
      initialSurvivorEvaluation:
        currentCase?.initialSurvivorEvaluation ??
        EMPTY_SURVIVOR_EVALUATION(SurvivorEvaluationPhase.START),
      finalSurvivorEvaluation:
        currentCase?.finalSurvivorEvaluation ??
        EMPTY_SURVIVOR_EVALUATION(SurvivorEvaluationPhase.END),
      postSurvivorEvaluation:
        currentCase?.postSurvivorEvaluation ??
        EMPTY_SURVIVOR_EVALUATION(SurvivorEvaluationPhase.POST),
      attentionProtocol: currentCase?.attentionProtocol ?? EMPTY_ATTENTION_PROTOCOL,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCase]
  );

  const methods = useForm<NetworkCase>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;
  const providerSelected = watch('providerId');
  const victimIdWatch = watch('victim.id');

  const { data: providers = [] } = useSWR<ServiceProvider[]>(PROVIDER_BASE_URL);
  const { data: providerContacts = [] } = useSWR<UserManager[]>(
    providerSelected ? `${USER_BASE_URL}/provider/${providerSelected}` : null
  ); // FIXME

  useEffect(() => {
    if (isEdit && currentCase) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCase]);

  const onSubmit = async (data: NetworkCase) => {
    try {
      if (isEdit && currentCase) {
        mutate<NetworkCase[]>(
          BASE_URL,
          async (cases = []): Promise<NetworkCase[]> => {
            const updated = await editAsync<NetworkCase>(
              `${BASE_URL}/${currentCase.id}`,
              data as NetworkCase
            );
            const filtered = cases.filter((c) => c.id !== currentCase.id);
            return [...filtered, updated];
          },
          { revalidate: false }
        );
      } else if (!isEdit) {
        console.log(data);
        await createAsync(BASE_URL, data);
      }
      navigate(PATH_DASHBOARD.general.cases.list);
      enqueueSnackbar(currentCase ? 'Cambios guardados' : 'Caso Creado');
    } catch (error) {
      console.error(error);
    }
  };

  const searchVictim = useCallback(async (): Promise<Victim | undefined> => {
    try {
      // return await getAsync<Victim>(`${VICTIM_BASE_URL}/${victimIdSelected}`);
      return MOCK_VICTIM.find((v) => v.id === +victimIdWatch);
    } catch (error) {
      return undefined;
    }
  }, [victimIdWatch]);

  useEffect(() => {
    if (`${victimIdWatch}`.trim() === '') {
      return;
    }
    const victimTimeout = setTimeout(async () => {
      const victim = await searchVictim();
      if (victim) {
        setValue('victim', victim, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
      }
    }, 500);
    return () => clearTimeout(victimTimeout);
  }, [victimIdWatch, searchVictim, setValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
              <Typography variant="h5" noWrap>
                Información del Caso
              </Typography>
              <Box sx={{ mb: 3, mt: 3 }}>
                <RHFTextField name="description" label="Descripción del Caso" />
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFSelect name="providerId" label="Nombre de organización a cargo del caso">
                  <option key={0} value={0} />
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect name="userInChargeId" label="Nombre de contacto principal del caso">
                  <option key={0} value={0} />
                  {(providerContacts ?? []).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </RHFSelect>
              </Box>
            </Card>
            <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
              <Typography variant="h5" noWrap>
                Información de la víctima
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
                <RHFTextField name="victim.id" label="Cédula" />
                <RHFTextField name="victim.name" label="Nombre (como se indica)" />
                <RHFTextField name="victim.otherName" label="Otros nombres usados" />
                <RHFTextField name="victim.age" label="Edad, indicado" type="number" />
                <RHFTextField name="victim.verifiedAge" label="Edad, verificada" type="number" />
                <RHFTextField name="victim.birthday" label="Fecha de nacimiento (si es conocida)" />
                <RHFTextField name="victim.citizenship" label="Ciudadanía" />
                <RHFTextField name="victim.ethnicity" label="Etnicidad" />
                <RHFTextField name="victim.nationality" label="País/Providencia de origen" />
                <RHFTextField name="victim.originAddress" label="Dirección (de origen)" />
                <RHFTextField name="victim.currentAddress" label="Dirección (actual)" />
                <RHFTextField name="victim.phoneNumber" label="Número(s) de teléfono" />
                <RHFTextField name="victim.preferredLanguage" label="Idioma Preferido" />
                <RHFTextField name="victim.children" label="Cantidad de Hijos" type="number" />
              </Box>
              <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
                <LabelStyle>Estado Civil</LabelStyle>
                <RHFRadioGroup
                  name="victim.maritalStatus"
                  options={MARITAL_STATUES}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
            </Card>
            <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
              <Typography variant="h5" noWrap>
                Proceso de Evaluación
              </Typography>
              <EvaluationCaseTable providerContacts={_userList} currentCase={currentCase} />
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Caso' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
