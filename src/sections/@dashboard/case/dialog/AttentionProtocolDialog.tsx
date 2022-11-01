import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  AttentionProtocol,
  AttentionProtocolBody,
  ATTENTION_PROTOCOL_BASE_URL,
} from 'src/@types/attention-protocol';
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import { YES_NO_OPTIONS } from 'src/@types/victim';
import { RHFCheckbox, RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import { editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import FinancialGrid from '../grid/attention-protocol/FinancialGrid';
import LegalProtectionGrid from '../grid/attention-protocol/LegalProtectionGrid';
import MentalGrid from '../grid/attention-protocol/MentalGrid';
import PhysicalGrid from '../grid/attention-protocol/PhysicalGrid';
import SecurityProtocolGrid from '../grid/attention-protocol/SecurityGrid';
import SocialGrid from '../grid/attention-protocol/SocialGrid';

type Props = {
  open: boolean;
  handleClose: () => void;
  currentAttentionProtocol: AttentionProtocol;
  currentCase: NetworkCase;
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function AttentionProtocolDialog({
  open,
  handleClose,
  currentAttentionProtocol,
  currentCase,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    confidentiality: Yup.boolean(),
    consent: Yup.boolean(),
    treatment: Yup.boolean(),
  });

  const defaultValues = useMemo(
    (): AttentionProtocolBody => ({
      caseId: currentCase.id,
      data: currentAttentionProtocol.data,
      confidentiality: currentAttentionProtocol.confidentiality ?? false,
      consent: currentAttentionProtocol.consent ?? false,
      treatment: currentAttentionProtocol.treatment ?? false,
      security: currentAttentionProtocol.security,
      legalProtection: currentAttentionProtocol.legalProtection,
      mental: currentAttentionProtocol.mental,
      financial: currentAttentionProtocol.financial,
      social: currentAttentionProtocol.social,
      physical: currentAttentionProtocol.physical,
      strengths: currentAttentionProtocol.strengths,
      comments: currentAttentionProtocol.comments,
      userInChargeId: currentAttentionProtocol.userInCharge?.id,
      completed: currentAttentionProtocol.completed ?? false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentAttentionProtocol]
  );

  const methods = useForm<AttentionProtocolBody>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: AttentionProtocolBody) => {
    try {
      const attentionProtocol = await editAsync<AttentionProtocolBody, AttentionProtocol>(
        `${ATTENTION_PROTOCOL_BASE_URL}/${currentAttentionProtocol.id}`,
        data
      );
      mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
        ...currentCase,
        attentionProtocol: {
          ...currentAttentionProtocol,
          ...attentionProtocol,
        },
      });
      enqueueSnackbar('Protocolo de atención guardado.');
      handleClose();
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al guardar los datos, inténtalo de nuevo', {
        variant: 'error',
      });
    }
  };

  const handleGridChange = (
    key: 'security' | 'legalProtection' | 'mental' | 'financial' | 'social' | 'physical',
    value: string
  ) => {
    setValue(key, value);
  };

  const onClose = () => {
    reset(defaultValues);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Protocolo de Atención</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                mt: 3,
              }}
            >
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
                <TextField disabled label="Número de Caso" value={currentCase.id} />
                <TextField
                  disabled
                  label="Fecha de Nacimiento"
                  value={currentCase.victim.birthday}
                />
                <TextField
                  disabled
                  label="Trabajador de Caso"
                  value={currentCase.attentionProtocol.userInCharge.name}
                />
                <RHFCheckbox
                  name="treatment"
                  label="¿Está siguiendo la participante un plan de tratamiento?"
                />
                <RHFCheckbox name="consent" label="Obtener Consentimiento Informado" />
                <RHFCheckbox name="confidentiality" label="Discutir Confidencialidad" />
              </Box>
              <RHFTextField name="comments" label="Comentarios" multiline rows={3} />
              <SecurityProtocolGrid
                values={currentAttentionProtocol.security}
                onGridChange={handleGridChange}
              />
              <LegalProtectionGrid
                values={currentAttentionProtocol.legalProtection}
                onGridChange={handleGridChange}
              />
              <MentalGrid
                values={currentAttentionProtocol.mental}
                onGridChange={handleGridChange}
              />
              <FinancialGrid
                values={currentAttentionProtocol.financial}
                onGridChange={handleGridChange}
              />
              <SocialGrid
                values={currentAttentionProtocol.social}
                onGridChange={handleGridChange}
              />
              <PhysicalGrid
                values={currentAttentionProtocol.physical}
                onGridChange={handleGridChange}
              />
              <RHFCheckbox name="completed" label="Marcar como completado" sx={{ mt: 3 }} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Guardar Cambios
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

export default AttentionProtocolDialog;
