import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import { Province, PROVINCE_BASE_URL } from 'src/@types/province';
import {
  FORM_OPTIONS,
  SurvivorEvaluation,
  SurvivorEvaluationBody,
  SurvivorEvaluationPhase,
  SURVIVOR_EVALUATION_BASE_URL,
  VIOLENCE_TYPES,
} from 'src/@types/survivor-evaluation';
import { RHFCheckbox, RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { editAsync } from 'src/services/APIGateway';
import useSWR, { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  handleClose: () => void;
  currentSurvivorEvaluation: SurvivorEvaluation;
  currentCase: NetworkCase;
  disabled?: boolean;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function SurvivorEvaluationDialog({
  open,
  handleClose,
  currentSurvivorEvaluation,
  currentCase,
  disabled = false,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const { data: provinces = [] } = useSWR<Province[]>(PROVINCE_BASE_URL);

  const NewSchema = Yup.object().shape({
    providerId: Yup.number(),
    security1: Yup.number(),
    security2: Yup.number(),
    security3: Yup.number(),
    legalProtection1: Yup.number(),
    legalProtection2: Yup.number(),
    legalProtection3: Yup.number(),
    mentalWelfare1: Yup.number(),
    mentalWelfare2: Yup.number(),
    mentalWelfare3: Yup.number(),
    mentalWelfare4: Yup.number(),
    financial1: Yup.number(),
    financial2: Yup.number(),
    financial3: Yup.number(),
    financial4: Yup.number(),
    social1: Yup.number(),
    social2: Yup.number(),
    social3: Yup.number(),
    social4: Yup.number(),
    physical1: Yup.number(),
    physical2: Yup.number(),
    physical3: Yup.number(),
    physical4: Yup.number(),
    physical5: Yup.number(),
    violenceType: Yup.number(),
  });

  const defaultValues = useMemo(
    (): SurvivorEvaluationBody => ({
      caseId: currentCase.id,
      violenceType: currentSurvivorEvaluation.violenceType ?? 0,
      provinceId: currentSurvivorEvaluation.provinceId ?? 1,
      // providerId: currentSurvivorEvaluation.providerId,
      place: currentSurvivorEvaluation.place,
      phase: currentSurvivorEvaluation.phase,
      security1: currentSurvivorEvaluation.security1 ?? 1,
      security2: currentSurvivorEvaluation.security2 ?? 1,
      security3: currentSurvivorEvaluation.security3 ?? 1,
      securityNotes: currentSurvivorEvaluation.securityNotes,
      legalProtection1: currentSurvivorEvaluation.legalProtection1 ?? 1,
      legalProtection2: currentSurvivorEvaluation.legalProtection2 ?? 1,
      legalProtection3: currentSurvivorEvaluation.legalProtection3 ?? 1,
      legalProtectionNotes: currentSurvivorEvaluation.legalProtectionNotes,
      mentalWelfare1: currentSurvivorEvaluation.mentalWelfare1 ?? 1,
      mentalWelfare2: currentSurvivorEvaluation.mentalWelfare2 ?? 1,
      mentalWelfare3: currentSurvivorEvaluation.mentalWelfare3 ?? 1,
      mentalWelfare4: currentSurvivorEvaluation.mentalWelfare4 ?? 1,
      mentalWelfareNotes: currentSurvivorEvaluation.mentalWelfareNotes,
      financial1: currentSurvivorEvaluation.financial1 ?? 1,
      financial2: currentSurvivorEvaluation.financial2 ?? 1,
      financial3: currentSurvivorEvaluation.financial3 ?? 1,
      financial4: currentSurvivorEvaluation.financial4 ?? 1,
      financialNotes: currentSurvivorEvaluation.financialNotes,
      social1: currentSurvivorEvaluation.social1 ?? 1,
      social2: currentSurvivorEvaluation.social2 ?? 1,
      social3: currentSurvivorEvaluation.social3 ?? 1,
      social4: currentSurvivorEvaluation.social4 ?? 1,
      socialNotes: currentSurvivorEvaluation.socialNotes,
      physical1: currentSurvivorEvaluation.physical1 ?? 1,
      physical2: currentSurvivorEvaluation.physical2 ?? 1,
      physical3: currentSurvivorEvaluation.physical3 ?? 1,
      physical4: currentSurvivorEvaluation.physical4 ?? 1,
      physical5: currentSurvivorEvaluation.physical5 ?? 1,
      physicalNotes: currentSurvivorEvaluation.physicalNotes,
      total: currentSurvivorEvaluation.total,
      survivorStatus: currentSurvivorEvaluation.survivorStatus,
      createdAt: currentSurvivorEvaluation.createdAt,
      completedAt: currentSurvivorEvaluation.completedAt,
      userInChargeId: currentSurvivorEvaluation.userInCharge?.id,
      completed: currentSurvivorEvaluation.completed ?? false,
      securityTotal: currentSurvivorEvaluation.securityTotal ?? 1,
      legalProtectionTotal: currentSurvivorEvaluation.legalProtectionTotal ?? 1,
      mentalWelfareTotal: currentSurvivorEvaluation.mentalWelfareTotal ?? 1,
      financial: currentSurvivorEvaluation.financial ?? 1,
      social: currentSurvivorEvaluation.social ?? 1,
      physical: currentSurvivorEvaluation.physical ?? 1,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSurvivorEvaluation]
  );

  const methods = useForm<SurvivorEvaluationBody>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: SurvivorEvaluationBody) => {
    try {
      const evaluation = await editAsync<SurvivorEvaluationBody, SurvivorEvaluation>(
        `${SURVIVOR_EVALUATION_BASE_URL}/${currentSurvivorEvaluation.id}`,
        {
          ...data,
          securityTotal: getSecurityScore(),
          legalProtectionTotal: getLegalScore(),
          mentalWelfareTotal: getMentalScore(),
          financial: getFinancialScore(),
          social: getSocialScore(),
          physical: getPhysicalScore(),
          total: getTotalScore(),
        }
      );
      mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
        ...currentCase,
        [getPhaseKey(currentSurvivorEvaluation.phase)]: evaluation,
      });
      enqueueSnackbar('ESO guardado.');
      handleClose();
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al guardar los datos, inténtalo de nuevo', {
        variant: 'error',
      });
    }
  };

  const getPhase = (p: SurvivorEvaluationPhase) => {
    switch (p) {
      case SurvivorEvaluationPhase.START:
        return 'Inicio del caso';
      case SurvivorEvaluationPhase.END:
        return 'Cierre del caso';
      case SurvivorEvaluationPhase.POST:
        return 'Un año después del cierre';
      default:
        return '';
    }
  };

  const getPhaseKey = (
    p: SurvivorEvaluationPhase
  ): 'initialSurvivorEvaluation' | 'finalSurvivorEvaluation' | 'postSurvivorEvaluation' => {
    switch (p) {
      case SurvivorEvaluationPhase.START:
        return 'initialSurvivorEvaluation';
      case SurvivorEvaluationPhase.END:
        return 'finalSurvivorEvaluation';
      case SurvivorEvaluationPhase.POST:
        return 'postSurvivorEvaluation';
      default:
        return 'initialSurvivorEvaluation';
    }
  };

  const getPhysicalScore = (): number =>
    +(
      (Number(watch('physical1')) +
        Number(watch('physical2')) +
        Number(watch('physical3')) +
        Number(watch('physical4')) +
        Number(watch('physical5'))) /
      5
    ).toFixed(2);

  const getSocialScore = (): number =>
    +(
      (Number(watch('social1')) +
        Number(watch('social2')) +
        Number(watch('social3')) +
        Number(watch('social4'))) /
      4
    ).toFixed(2);
  const getFinancialScore = (): number =>
    +(
      (Number(watch('financial1')) +
        Number(watch('financial2')) +
        Number(watch('financial3')) +
        Number(watch('financial4'))) /
      4
    ).toFixed(2);
  const getMentalScore = (): number =>
    +(
      (Number(watch('mentalWelfare1')) +
        Number(watch('mentalWelfare2')) +
        Number(watch('mentalWelfare3')) +
        Number(watch('mentalWelfare4'))) /
      4
    ).toFixed(2);
  const getLegalScore = (): number =>
    +(
      (Number(watch('legalProtection1')) +
        Number(watch('legalProtection2')) +
        Number(watch('legalProtection3'))) /
      3
    ).toFixed(2);
  const getSecurityScore = (): number =>
    Number(
      (
        (Number(watch('security1')) + Number(watch('security2')) + Number(watch('security3'))) /
        3
      ).toFixed(2)
    );

  const getTotalScore = (): number => {
    const total = +(
      (getSecurityScore() +
        getSocialScore() +
        getLegalScore() +
        getMentalScore() +
        getFinancialScore() +
        getPhysicalScore()) /
      6
    ).toFixed(2);
    return total;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>ESO - {getPhase(currentSurvivorEvaluation.phase)}</DialogTitle>
          <DialogContent>
            <DialogContentText>Llene los datos que se solicitan a continuación.</DialogContentText>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                mt: 3,
              }}
            >
              <Card sx={{ p: 3, flexDirection: 'column', display: 'flex', gap: 2 }}>
                <Typography variant="h5" noWrap sx={{ mb: 1 }}>
                  Datos Demográficos
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
                  <TextField
                    disabled
                    label="Nombre del sobreviviente"
                    value={currentCase.victim.name}
                  />
                  <RHFSelect name="provinceId" label="Provincia donde ocurrió la violencia">
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFTextField name="place" label="Lugar donde se está realizando la evaluación" />
                </Box>
                <Box>
                  <LabelStyle>Tipo de Violencia</LabelStyle>
                  <RHFRadioGroup
                    name="violenceType"
                    options={VIOLENCE_TYPES}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </Box>
              </Card>
              <Accordion>
                <AccordionSummary>
                  <Typography>DOMINIO DE SEGURIDAD {watch('security1')}</Typography>
                  <Typography variant="button" sx={{ ml: 2 }}>
                    ({getSecurityScore()}/4)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <LabelStyle>
                      1. EL SOBREVIVIENTE YA NO EXPERIMENTA ABUSO NI NEGLIGENCIA.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="security1"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      2. EL SOBREVIVIENTE YA NO EXPERIMENTA AMENAZAS DE PARTE DE PERSONAS
                      SOSPECHOSAS U OTROS QUE INTENTEN RE-VICTIMIZAR.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="security2"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      3. EL SOBREVIVIENTE ES CAPAZ DE IDENTIFICAR Y MANEJAR LAS SITUACIONES DE
                      RIESGO.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="security3"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <RHFTextField name="securityNotes" label="Notas" multiline rows={3} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary>
                  <Typography>DOMINIO DE PROTECCIÓN LEGAL</Typography>
                  <Typography variant="button" sx={{ ml: 2 }}>
                    ({getLegalScore()}/4)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <LabelStyle>
                      1. SOBREVIVIENTE CONOCE SUS DERECHOS Y LAS PROTECCIONES BAJO LA LEY Y PERCIBE
                      LAS VIOLACIONES COMO ABUSIVAS.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="legalProtection1"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      2. EL ESTADO LEGAL O NIVEL DE DOCUMENTACIÓN DEL SOBREVIVIENTE MINIMIZA LOS
                      RIESGOS DE VIOLACIONES FUTURAS A SUS DERECHOS HUMANOS.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="legalProtection2"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      3. SOBREVIVIENTE TIENE ACCESO AL SISTEMA DE JUSTICIA PARA BUSCAR PROTECCIÓN
                      Y/O REPARACIONES POR VIOLACIONES A LOS DERECHOS HUMANOS.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="legalProtection3"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <RHFTextField name="legalProtectionNotes" label="Notas" multiline rows={3} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary>
                  <Typography>DOMINIO DE BIENESTAR MENTAL</Typography>
                  <Typography variant="button" sx={{ ml: 2 }}>
                    ({getMentalScore()}/4)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <LabelStyle>1. SOBREVIVIENTE NO MANIFIESTA CONDUCTAS DE RIESGO.</LabelStyle>
                    <RHFRadioGroup
                      name="mentalWelfare1"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      2. SOBREVIVIENTE SE INVOLUCRA POSITIVAMENTE EN ACTIVIDADES DIARIAS.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="mentalWelfare2"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      3. SOBREVIVIENTE UTILIZA HABILIDADES DE AFRONTAMIENTO POSITIVAS.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="mentalWelfare3"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      4. SOBREVIVIENTE DEMUESTRA ACTITUDES Y COMPORTAMIENTOS DE EMPODERAMIENTO.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="mentalWelfare4"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <RHFTextField name="mentalWelfareNotes" label="Notas" multiline rows={3} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary>
                  <Typography>DOMINIO DE EMPODERAMIENTO ECONÓMICO Y EDUCACIÓN</Typography>
                  <Typography variant="button" sx={{ ml: 2 }}>
                    ({getFinancialScore()}/4)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <LabelStyle>
                      1. EL HOGAR DEL SOBREVIVIENTE MANTIENE UN INGRESO ECONÓMICO ADECUADO SIN
                      REALIZAR TRABAJO RELACIONADO CON LA EXPLOTACIÓN.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="financial1"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      2. SOBREVIVIENTE DEMUESTRA HABILIDADES DE GESTIÓN FINANCIERA.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="financial2"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      3. EL HOGAR DEL SOBREVIVIENTE TIENE ACCESO A UNA RED DE SEGURIDAD FINANCIERA
                      ADECUADA.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="financial3"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      4. SOBREVIVIENTE SE RELACIONA POSITIVAMENTE CON LA ESCUELA O EL TRABAJO.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="financial4"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <RHFTextField name="financialNotes" label="Notas" multiline rows={3} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary>
                  <Typography>DOMINIO DE APOYO SOCIAL</Typography>
                  <Typography variant="button" sx={{ ml: 2 }}>
                    ({getSocialScore()}/4)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <LabelStyle>
                      1. SOBREVIVIENTE SE SIENTE APOYADO EMOCIONALMENTE CON RELACIONES POSITIVAS.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="social1"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>2. EL HOGAR DEL SOBREVIVIENTE APOYA SU BIENESTAR.</LabelStyle>
                    <RHFRadioGroup
                      name="social2"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      3. SOBREVIVIENTE NO EXPERIMENTA DISCRIMINACIÓN NI PRESIÓN SOCIAL NEGATIVA.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="social3"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      4. SOBREVIVIENTE TIENE ACCESO A RECURSOS Y APOYO DE LA COMUNIDAD.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="social4"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <RHFTextField name="socialNotes" label="Notas" multiline rows={3} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary>
                  <Typography>DOMINIO DE BIENESTAR FISICO</Typography>
                  <Typography variant="button" sx={{ ml: 2 }}>
                    ({getPhysicalScore()}/4)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <LabelStyle>
                      1. SOBREVIVIENTE TIENE ACCESO A SERVICIOS MÉDICOS ESENCIALES.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="physical1"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>2. SOBREVIVIENTE CUIDA SUS NECESIDADES DE SALUD.</LabelStyle>
                    <RHFRadioGroup
                      name="physical2"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      3. SOBREVIVIENTE TIENE ACCESO A LAS NECESIDADES BÁSICAS ADECUADAS QUE IMPACTAN
                      LA SALUD.
                    </LabelStyle>
                    <RHFRadioGroup
                      name="physical3"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>4. SOBREVIVIENTE TIENE VIVIENDA ESTABLE.</LabelStyle>
                    <RHFRadioGroup
                      name="physical4"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>5. LA VIVIENDA ESTÁ SEGURA Y LIBRE DE PELIGROS.</LabelStyle>
                    <RHFRadioGroup
                      name="physical5"
                      options={FORM_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <RHFTextField name="physicalNotes" label="Notas" multiline rows={3} />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Typography variant="h4" sx={{ mt: 2 }}>
              TOTAL: {getTotalScore()}/4, LA VÍCTIMA {getTotalScore() < 3 && 'NO'} ESTÁ RESTAURADA
            </Typography>
            <RHFCheckbox name="completed" label="Marcar como completado" sx={{ mt: 3 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={disabled}
            >
              Guardar Cambios
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

export default SurvivorEvaluationDialog;
