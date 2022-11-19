import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import {
  COMMITMENT_TYPES,
  DemographicForm,
  DemographicFormBody,
  DEMOGRAPHIC_FORM_BASE_URL,
} from 'src/@types/demographic-form';
import { RHFCheckbox, RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import { editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  handleClose: () => void;
  currentDemographicForm: DemographicForm;
  currentCase: NetworkCase;
  disabled?: boolean;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function DemographicDialog({
  open,
  handleClose,
  currentDemographicForm,
  currentCase,
  disabled = false,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    description: Yup.string().required('Campo obligatorio'),
    commitment: Yup.number(),
    participation: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): DemographicFormBody => ({
      caseId: currentCase.id,
      participation: currentDemographicForm.participation,
      commitment: currentDemographicForm.commitment,
      comments: currentDemographicForm.comments,
      userInChargeId: currentDemographicForm.userInCharge?.id ?? 0,
      completed: currentDemographicForm.completed ?? false,
      description: currentDemographicForm.description,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDemographicForm]
  );

  const methods = useForm<DemographicFormBody>({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: DemographicFormBody) => {
    try {
      const demographicForm = await editAsync<DemographicFormBody, DemographicForm>(
        `${DEMOGRAPHIC_FORM_BASE_URL}/${currentDemographicForm.id}`,
        data
      );
      mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
        ...currentCase,
        demographicForm,
      });
      enqueueSnackbar('Formulario demográfico guardado.');
      handleClose();
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al guardar los datos, inténtalo de nuevo', {
        variant: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Formulario Demográfico</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Llene los datos que se solicitan a continuación, para editar los datos de la víctima,
              por favor editarlos en la sección de víctimas.
            </DialogContentText>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                mt: 3,
              }}
            >
              <Box>
                <LabelStyle>Participante se compromete en el caso legal:</LabelStyle>
                <RHFRadioGroup
                  name="commitment"
                  options={COMMITMENT_TYPES}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
              <RHFTextField
                name="participation"
                label="Participación Interinstitucional (ONGs, Oficiales gubernamentales, hogares, etc.)"
                multiline
              />
              <RHFTextField name="comments" label="Comentarios" multiline />
              <RHFTextField
                name="description"
                label="PROBLEMA PRESENTADO Por favor dé una breve descripción del motivo de la remisión del caso"
                multiline
                rows={6}
              />
            </Box>
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

export default DemographicDialog;
