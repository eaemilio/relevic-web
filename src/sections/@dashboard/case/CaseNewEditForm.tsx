import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
  TextField,
  Divider,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  AttentionProtocol,
  AttentionProtocolBody,
  ATTENTION_PROTOCOL_BASE_URL,
  EMPTY_ATTENTION_PROTOCOL,
} from 'src/@types/attention-protocol';
import { NetworkCase, NetworkCaseBody } from 'src/@types/case';
import {
  DemographicForm,
  DemographicFormBody,
  DEMOGRAPHIC_FORM_BASE_URL,
  EMPTY_DEMOGRAPHIC_FORM,
} from 'src/@types/demographic-form';
import { PROVIDER_BASE_URL, ServiceProvider } from 'src/@types/provider';
import {
  EMPTY_SURVIVOR_EVALUATION,
  SurvivorEvaluation,
  SurvivorEvaluationBody,
  SurvivorEvaluationPhase,
  SURVIVOR_EVALUATION_BASE_URL,
} from 'src/@types/survivor-evaluation';
import { UserManager, USER_BASE_URL } from 'src/@types/user';
import {
  EMPTY_VICTIM,
  MARITAL_STATUES,
  Victim,
  VictimBody,
  VICTIM_BASE_URL,
} from 'src/@types/victim';
import { RHFCheckbox, RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
import useTabs from 'src/hooks/useTabs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync, getAsync } from 'src/services/APIGateway';
import useSWR from 'swr';
import * as Yup from 'yup';
import Comments from './Comments';
import AttentionProtocolDialog from './dialog/AttentionProtocolDialog';
import DemographicDialog from './dialog/DemographicDialog';
import SurvivorEvaluationDialog from './dialog/SurvivorEvaluationDialog';
import EvaluationCaseTable from './list/EvaluationCaseTable';
import FollowUpList from 'src/pages/dashboard/case/follow-up/FollowUpList';
import CaseService from 'src/services/CaseService';
import VictimCasesDialog from './dialog/VictimCasesDialog';
import useAuth from 'src/hooks/useAuth';

type Props = {
  isEdit: boolean;
  currentCase?: NetworkCase;
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
  const { currentTab, onChangeTab } = useTabs('general');
  const { user } = useAuth();

  const [demographicOpen, setDemographicOpen] = useState(false);
  const [initialSurvivorEvaluationOpen, setInitialSurvivorEvaluationOpen] = useState(false);
  const [finalSurvivorEvaluationOpen, setFinalSurvivorEvaluationOpen] = useState(false);
  const [postSurvivorEvaluationOpen, setPostSurvivorEvaluationOpen] = useState(false);
  const [attentionProtocolOpen, setAttentionProtocolOpen] = useState(false);

  const NewSchema = Yup.object().shape({
    providerId: Yup.number().min(1, 'Selecciona un Proveedor').required('Campo obligatorio'),
    userInChargeId: Yup.number().min(1, 'Selecciona un usuario').required('Campo obligatorio'),
    consentUserInChargeId: Yup.number()
      .min(1, 'Selecciona un usuario')
      .required('Campo obligatorio'),
    code: Yup.string().required('Campo obligatorio'),
    followUpUserInChargeId: Yup.number(),
    victim: Yup.object({
      name: Yup.string().required('Campo obligatorio'),
      age: Yup.number().min(1, 'Edad debe ser mayor a 0').required('Campo obligatorio'),
      verifiedAge: Yup.number().min(1, 'Edad debe ser mayor a 0'),
      citizenship: Yup.string().required('Campo obligatorio'),
      ethnicity: Yup.string().required('Campo obligatorio'),
      nationality: Yup.string().required('Campo obligatorio'),
      maritalStatus: Yup.number().min(1, 'Campo obligatorio'),
      currentAddress: Yup.string().required('Campo obligatorio'),
      email: Yup.string().required('Campo obligatorio'),
      id: Yup.number().min(1, 'Cédula no válida').required('Campo obligatorio'),
      children: Yup.number(),
    }),
    attentionProtocol: Yup.object({
      userInChargeId: Yup.number().min(1, 'Campo obligatorio'),
    }),
    demographicForm: Yup.object({
      userInChargeId: Yup.number().min(1, 'Campo obligatorio'),
    }),
    initialSurvivorEvaluation: Yup.object({
      userInChargeId: Yup.number().min(1, 'Campo obligatorio'),
    }),
    finalSurvivorEvaluation: Yup.object({
      userInChargeId: Yup.number().min(1, 'Campo obligatorio'),
    }),
    postSurvivorEvaluation: Yup.object({
      userInChargeId: Yup.number().min(1, 'Campo obligatorio'),
    }),
  });

  const defaultValues: NetworkCaseBody = useMemo(
    (): NetworkCaseBody => ({
      userCode: currentCase?.userCode ?? user?.userCode ?? '',
      description: currentCase?.description ?? '',
      providerId: currentCase?.provider.id ?? 0,
      userInChargeId: currentCase?.userInCharge.id ?? 0,
      jurisdiction: currentCase?.jurisdiction ?? '',
      defendant: currentCase?.defendant ?? '',
      defendantId: currentCase?.defendantId ?? '',
      proceduralStage: currentCase?.proceduralStage ?? '',
      legalScore: currentCase?.legalScore ?? '',
      consent: currentCase?.consent ?? false,
      completed: currentCase?.completed ?? false,
      followUpUserInChargeId: currentCase?.followUpUserInCharge.id ?? 0,
      victim: currentCase?.victim ?? EMPTY_VICTIM,
      code: currentCase?.code ?? '',
      consentUserInChargeId: currentCase?.consentUserInCharge?.id ?? 0,
      demographicForm: currentCase
        ? {
            ...currentCase.demographicForm,
            userInChargeId: currentCase.demographicForm.userInCharge?.id,
          }
        : EMPTY_DEMOGRAPHIC_FORM,
      initialSurvivorEvaluation: currentCase
        ? {
            ...currentCase.initialSurvivorEvaluation,
            userInChargeId: currentCase.initialSurvivorEvaluation.userInCharge?.id,
          }
        : EMPTY_SURVIVOR_EVALUATION(SurvivorEvaluationPhase.START),
      finalSurvivorEvaluation: currentCase
        ? {
            ...currentCase.finalSurvivorEvaluation,
            userInChargeId: currentCase.finalSurvivorEvaluation.userInCharge?.id,
          }
        : EMPTY_SURVIVOR_EVALUATION(SurvivorEvaluationPhase.END),
      postSurvivorEvaluation: currentCase
        ? {
            ...currentCase.postSurvivorEvaluation,
            userInChargeId: currentCase.postSurvivorEvaluation.userInCharge?.id,
          }
        : EMPTY_SURVIVOR_EVALUATION(SurvivorEvaluationPhase.POST),
      attentionProtocol: currentCase
        ? {
            ...currentCase.attentionProtocol,
            userInChargeId: currentCase.attentionProtocol.userInCharge?.id,
          }
        : EMPTY_ATTENTION_PROTOCOL,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCase]
  );

  const methods = useForm<NetworkCaseBody>({
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
  );

  useEffect(() => {
    if (isEdit && currentCase) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCase]);

  const onSubmit = async (data: NetworkCaseBody) => {
    try {
      if (isEdit && currentCase) {
        // Save Victim
        editAsync<VictimBody, Victim>(`${VICTIM_BASE_URL}/${data.victim.id}`, data.victim)
          .then(() => enqueueSnackbar('Datos de víctima guardados'))
          .catch(() => {
            setValue('victim', currentCase.victim);
            enqueueSnackbar('Error al guardar datos de la víctima', {
              variant: 'error',
              persist: true,
            });
          });

        // Save Forms
        editAsync<Partial<DemographicFormBody>, DemographicForm>(
          `${DEMOGRAPHIC_FORM_BASE_URL}/${currentCase.demographicForm.id}`,
          { userInChargeId: data.demographicForm.userInChargeId }
        )
          .then(() => enqueueSnackbar('Responsable de formulario demográfico asignado.'))
          .catch(() => {
            setValue(
              'demographicForm.userInChargeId',
              currentCase.demographicForm.userInCharge?.id
            );
            enqueueSnackbar('Error al guardar responsable de formulario demográfico.', {
              variant: 'error',
              persist: true,
            });
          });
        editAsync<Partial<AttentionProtocolBody>, AttentionProtocol>(
          `${ATTENTION_PROTOCOL_BASE_URL}/${currentCase.attentionProtocol?.id}`,
          { userInChargeId: data.attentionProtocol.userInChargeId }
        )
          .then(() => enqueueSnackbar('Responsable de protocolo de atención asignado.'))
          .catch(() => {
            setValue(
              'attentionProtocol.userInChargeId',
              currentCase.attentionProtocol.userInCharge?.id
            );
            enqueueSnackbar('Error al guardar responsable de protocolo de atención', {
              variant: 'error',
              persist: true,
            });
          });
        editAsync<Partial<SurvivorEvaluationBody>, SurvivorEvaluation>(
          `${SURVIVOR_EVALUATION_BASE_URL}/${currentCase.initialSurvivorEvaluation.id}`,
          { userInChargeId: data.initialSurvivorEvaluation.userInChargeId }
        )
          .then(() => enqueueSnackbar('Responsable de ESO inicial asignado.'))
          .catch(() => {
            setValue(
              'initialSurvivorEvaluation.userInChargeId',
              currentCase.initialSurvivorEvaluation?.userInCharge?.id
            );
            enqueueSnackbar('Error al guardar responsable de ESO inicial', {
              variant: 'error',
              persist: true,
            });
          });
        editAsync<Partial<SurvivorEvaluationBody>, SurvivorEvaluation>(
          `${SURVIVOR_EVALUATION_BASE_URL}/${currentCase.postSurvivorEvaluation.id}`,
          { userInChargeId: data.postSurvivorEvaluation.userInChargeId }
        )
          .then(() => enqueueSnackbar('Responsable de ESO post-caso asignado.'))
          .catch(() => {
            setValue(
              'postSurvivorEvaluation.userInChargeId',
              currentCase.postSurvivorEvaluation?.userInCharge?.id
            );
            enqueueSnackbar('Error al guardar responsable de ESO post-caso.', {
              variant: 'error',
              persist: true,
            });
          });
        editAsync<Partial<SurvivorEvaluationBody>, SurvivorEvaluation>(
          `${SURVIVOR_EVALUATION_BASE_URL}/${currentCase.finalSurvivorEvaluation.id}`,
          { userInChargeId: data.finalSurvivorEvaluation.userInChargeId }
        )
          .then(() => enqueueSnackbar('Responsable de ESO final asignado.'))
          .catch(() => {
            setValue(
              'finalSurvivorEvaluation.userInChargeId',
              currentCase.finalSurvivorEvaluation?.userInCharge?.id
            );
            enqueueSnackbar('Error al guardar responsable de ESO final.', {
              variant: 'error',
              persist: true,
            });
          });

        // Save Case
        editAsync(`${BASE_URL}/${currentCase.id}`, {
          ...data,
          initialSurvivorEvaluation: {
            userInChargeId: data.initialSurvivorEvaluation.userInChargeId,
          },
          finalSurvivorEvaluation: {
            userInChargeId: data.finalSurvivorEvaluation.userInChargeId,
          },
          postSurvivorEvaluation: {
            userInChargeId: data.postSurvivorEvaluation.userInChargeId,
          },
          attentionProtocol: {
            userInChargeId: data.attentionProtocol.userInChargeId,
          },
          demographicForm: {
            userInChargeId: data.demographicForm.userInChargeId,
          },
        })
          .then(() => enqueueSnackbar('Información del caso guardada'))
          .catch(() => {
            enqueueSnackbar('Error al guardar información del caso', {
              variant: 'error',
              persist: true,
            });
            reset();
          });
      } else if (!isEdit) {
        await createAsync(BASE_URL, data);
        navigate(PATH_DASHBOARD.general.cases.list);
        enqueueSnackbar('Caso Creado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchVictim = useCallback(async (): Promise<Victim | undefined> => {
    try {
      if (!victimIdWatch) {
        return;
      }
      return await getAsync<Victim>(`${VICTIM_BASE_URL}/${victimIdWatch}`);
    } catch (error) {
      return undefined;
    }
  }, [victimIdWatch]);

  useEffect(() => {
    if (`${victimIdWatch}`.trim() === '' || victimIdWatch === 0) {
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

  const [caseSearch, setCaseSearch] = useState('');
  const [caseVictimSearch, setCaseVictimSearch] = useState('');
  const [foundCases, setFoundCases] = useState<Partial<NetworkCase>[]>([]);

  const handleCasesDialogClose = (selectedCase?: Partial<NetworkCase>) => {
    setFoundCases([]);
    if (!selectedCase) {
      return;
    }
    handleCaseSelected(selectedCase);
  };

  const searchCaseByCode = async () => {
    if (!caseSearch.trim().length) {
      return;
    }

    const data = await CaseService.searchCaseByCode(caseSearch);

    if (!data) {
      enqueueSnackbar(`No se ha encontrado ningún caso con el código ${caseSearch}`, {
        variant: 'info',
      });
      return;
    }

    handleCaseSelected(data);
  };

  const handleCaseSelected = (data: Partial<NetworkCase>) => {
    if (!data.id) {
      setValue('code', data.code ?? '');
      setValue('jurisdiction', data.jurisdiction ?? '');
      setValue('defendant', data.defendant ?? '');
      setValue('defendantId', data.defendantId ?? '');
      setValue('proceduralStage', data.proceduralStage ?? '');
      setValue('legalScore', data.legalScore ?? '');
      if (data.victim) {
        setValue('victim', data.victim);
      }
      return;
    }
    window.location.href = `/dashboard/case/${data.id}`;
  };

  const searchCaseByVictim = async () => {
    if (!caseVictimSearch.trim().length) {
      return;
    }

    const data = await CaseService.searchCaseByVictim(caseSearch);

    if (!data.length) {
      enqueueSnackbar(
        `No se ha encontrado ningún caso para la víctima con cédula ${caseVictimSearch}`,
        {
          variant: 'info',
        }
      );
      return;
    }
    setFoundCases(data);
  };

  return (
    <>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        <Tab
          disableRipple
          key={0}
          label="General"
          icon={<Iconify icon={'ion:clipboard'} width={20} height={20} />}
          value={'general'}
        />
        <Tab
          disableRipple
          disabled={!isEdit}
          key={1}
          label="Comentarios"
          icon={<Iconify icon={'ion:chatbubble'} width={20} height={20} />}
          value={'comments'}
        />
        <Tab
          disableRipple
          disabled={!isEdit}
          key={2}
          label="Seguimiento de Caso"
          icon={<Iconify icon={'uil:history'} width={20} height={20} />}
          value={'tracing'}
        />
      </Tabs>
      {currentTab === 'general' && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {!isEdit && (
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  p: 3,
                  flexDirection: 'column',
                  display: 'flex',
                  gap: 2,
                  position: 'sticky',
                  top: 75,
                }}
              >
                <Typography variant="h5" noWrap>
                  Búsqueda de Caso MP
                </Typography>
                <TextField
                  fullWidth
                  value={caseSearch}
                  onChange={(e) => setCaseSearch(e.target.value)}
                  label="Buscar por Código de Caso"
                  placeholder="Ingresa código de caso"
                />
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  disabled={currentCase?.inactive || currentCase?.completed}
                  onClick={searchCaseByCode}
                >
                  Buscar por código de caso
                </LoadingButton>
                <Divider sx={{ my: 2 }} />
                <TextField
                  fullWidth
                  value={caseVictimSearch}
                  onChange={(e) => setCaseVictimSearch(e.target.value)}
                  label="Buscar por Cédula de Víctima"
                  placeholder="Ingresa la cédula de la víctima"
                />
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  disabled={currentCase?.inactive || currentCase?.completed}
                  onClick={searchCaseByVictim}
                >
                  Buscar por cédula de Víctima
                </LoadingButton>
                <VictimCasesDialog
                  cases={foundCases}
                  open={foundCases.length > 0}
                  handleClose={handleCasesDialogClose}
                />
              </Card>
            </Grid>
          )}
          <Grid item xs={12} md={isEdit ? 12 : 9}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
                    <Typography variant="h5" noWrap>
                      Información del Caso
                    </Typography>
                    <Box sx={{ mb: 3, mt: 3 }}>
                      <RHFTextField
                        name="description"
                        label="Descripción del Caso"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
                      }}
                    >
                      <RHFTextField
                        name="code"
                        label="Código de Caso"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFSelect
                        name="providerId"
                        disabled={currentCase?.inactive || currentCase?.completed}
                        label={`${
                          isEdit
                            ? 'Referir caso a otra organización:'
                            : 'Nombre de organización a cargo del caso'
                        }`}
                      >
                        <option key={0} value={0} />
                        {providers.map((provider) => (
                          <option key={provider.id} value={provider.id}>
                            {provider.name}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFSelect
                        name="userInChargeId"
                        label="Nombre de contacto principal del caso"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      >
                        <option key={0} value={0} />
                        {(providerContacts ?? []).map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </RHFSelect>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
                      }}
                    >
                      <RHFTextField
                        name="jurisdiction"
                        label="Jurisdicción"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="defendant"
                        label="Imputado"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="defendantId"
                        label="Cédula de Imputado"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="proceduralStage"
                        label="Etapa Procesal"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="legalScore"
                        label="Calificación Jurídica"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
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
                      <RHFTextField
                        name="victim.id"
                        label="Cédula"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.name"
                        label="Nombre (como se indica)"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.otherName"
                        label="Otros nombres usados"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.email"
                        label="Correo Electrónico"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.age"
                        label="Edad, indicado"
                        type="number"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.verifiedAge"
                        label="Edad, verificada"
                        type="number"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.birthday"
                        label="Fecha de nacimiento (si es conocida)"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.citizenship"
                        label="Ciudadanía"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.ethnicity"
                        label="Etnicidad"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.nationality"
                        label="País/Providencia de origen"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.originAddress"
                        label="Dirección (de origen)"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.currentAddress"
                        label="Dirección (actual)"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.phoneNumber"
                        label="Número(s) de teléfono"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.preferredLanguage"
                        label="Idioma Preferido"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <RHFTextField
                        name="victim.children"
                        label="Cantidad de Hijos"
                        type="number"
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
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
                    <Typography variant="body2" noWrap sx={{ mb: 3 }}>
                      Par ver el formulario, por favor hacer click en cualquier celda de evaluación.
                    </Typography>
                    <EvaluationCaseTable
                      providerContacts={providerContacts}
                      currentCase={currentCase}
                      onDemographicClick={() => setDemographicOpen(true)}
                      onInitialSurvivorEvaluationClick={() =>
                        setInitialSurvivorEvaluationOpen(true)
                      }
                      onFinalSurvivorEvaluationClick={() => setFinalSurvivorEvaluationOpen(true)}
                      onPostSurvivorEvaluationClick={() => setPostSurvivorEvaluationOpen(true)}
                      onAttentionProtocolClick={() => setAttentionProtocolOpen(true)}
                      disabled={currentCase?.inactive || currentCase?.completed}
                    />
                  </Card>
                  <Grid item xs={12} md={12}>
                    <Stack alignItems="flex-end" sx={{ mt: 2 }}>
                      <RHFCheckbox
                        name="completed"
                        label="Marcar caso como cerrado"
                        sx={{ mt: 3 }}
                        disabled={currentCase?.inactive || currentCase?.completed}
                      />
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        disabled={currentCase?.inactive || currentCase?.completed}
                      >
                        {currentCase?.id ? 'Guardar Cambios' : 'Crear Caso'}
                      </LoadingButton>
                    </Stack>
                  </Grid>
                </Box>
              </form>
            </FormProvider>
          </Grid>
        </Grid>
      )}
      {currentTab === 'comments' && currentCase && <Comments currentCase={currentCase} />}
      {currentTab === 'tracing' && currentCase && <FollowUpList />}
      {currentCase && (
        <>
          <DemographicDialog
            currentCase={currentCase}
            open={demographicOpen}
            handleClose={() => setDemographicOpen(false)}
            currentDemographicForm={currentCase.demographicForm}
            disabled={currentCase?.inactive || currentCase?.completed}
          />
          <SurvivorEvaluationDialog
            currentCase={currentCase}
            open={initialSurvivorEvaluationOpen}
            handleClose={() => setInitialSurvivorEvaluationOpen(false)}
            currentSurvivorEvaluation={currentCase.initialSurvivorEvaluation}
            disabled={currentCase?.inactive || currentCase?.completed}
          />
          <SurvivorEvaluationDialog
            currentCase={currentCase}
            open={finalSurvivorEvaluationOpen}
            handleClose={() => setFinalSurvivorEvaluationOpen(false)}
            currentSurvivorEvaluation={currentCase.finalSurvivorEvaluation}
            disabled={currentCase?.inactive || currentCase?.completed}
          />
          <SurvivorEvaluationDialog
            currentCase={currentCase}
            open={postSurvivorEvaluationOpen}
            handleClose={() => setPostSurvivorEvaluationOpen(false)}
            currentSurvivorEvaluation={currentCase.postSurvivorEvaluation}
            disabled={currentCase?.inactive || currentCase?.completed}
          />
          <AttentionProtocolDialog
            currentCase={currentCase}
            open={attentionProtocolOpen}
            handleClose={() => setAttentionProtocolOpen(false)}
            currentAttentionProtocol={currentCase.attentionProtocol}
            disabled={currentCase?.inactive || currentCase?.completed}
          />
        </>
      )}
    </>
  );
}
