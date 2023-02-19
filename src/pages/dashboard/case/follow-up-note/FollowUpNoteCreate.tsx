import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import { FollowUpNote, FollowUpNoteBody, FOLLOW_UP_BASE_URL } from 'src/@types/follow-up';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

type Props = {
  open: boolean;
  handleClose: () => void;
  currentNote?: FollowUpNote;
  currentCase: NetworkCase;
};

function FollowUpNoteCreate({ open, handleClose, currentNote, currentCase }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const NewSchema = Yup.object().shape({
    dueDate: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): FollowUpNoteBody => ({
      caseId: currentCase.id,
      description: currentNote?.description ?? '',
      victimThoughts: currentNote?.victimThoughts ?? '',
      observations: currentNote?.observations ?? '',
      topics: currentNote?.topics ?? '',
      comprehension: currentNote?.comprehension ?? '',
      needs: currentNote?.needs ?? '',
      survivorPlan: currentNote?.survivorPlan ?? '',
      evaluatorPlan: currentNote?.evaluatorPlan ?? '',
      userInChargeId: currentCase.followUpUserInCharge.id,
      dueDate: currentNote?.dueDate ?? new Date().toString(),
      completed: currentNote?.completed ?? false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentNote]
  );

  const methods = useForm<FollowUpNoteBody>({
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

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const onSubmit = async (data: FollowUpNoteBody) => {
    try {
      if (currentNote) {
        const note = await editAsync<FollowUpNoteBody, FollowUpNote>(
          `${FOLLOW_UP_BASE_URL}/${currentNote.id}`,
          {
            ...data,
            dueDate: dayjs(data.dueDate).toISOString(),
          }
        );
        mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
          ...currentCase,
          followUpNotes: [
            ...currentCase.followUpNotes.filter((f) => f.id !== currentNote.id),
            note,
          ],
        });
        enqueueSnackbar('Formulario demográfico guardado.');
        handleClose();
      } else {
        const note = await createAsync<FollowUpNoteBody, FollowUpNote>(FOLLOW_UP_BASE_URL, {
          ...data,
          dueDate: dayjs(data.dueDate).toISOString(),
        });
        mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
          ...currentCase,
          followUpNotes: [...currentCase.followUpNotes, note],
        });
        enqueueSnackbar('Formulario demográfico creado.');
        handleClose();
      }
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al guardar los datos, inténtalo de nuevo', {
        variant: 'error',
      });
    }
  };

  const watchDueDate = watch('dueDate');

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Nota de Seguimiento</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  value={currentCase?.victim?.name}
                />
                <TextField
                  disabled
                  label="Organización de la persona que tuvo contacto con sobreviviente"
                  value={currentCase?.provider?.name}
                />
                <TextField
                  disabled
                  label="Nombre de persona que tuvo contacto con sobreviviente"
                  value={currentCase.followUpUserInCharge?.name}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Fecha para Seguimiento (Se notificará a la víctima)"
                    inputFormat="DD/MM/YYYY HH:mm"
                    value={watchDueDate}
                    onChange={(e) => e && setValue('dueDate', e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Describir:{' '}
              </Typography>
              <RHFTextField
                name="description"
                label="Descripción general de la interacción. (Quién, cuándo, qué, dónde)"
                multiline
                rows={3}
              />
              {currentNote && (
                <>
                  <RHFTextField
                    name="victimThoughts"
                    label="¿Qué es lo que el/la sobreviviente le está diciendo? (Los pensamientos, sentimientos, observaciones, etc.)"
                    multiline
                    rows={3}
                  />
                  <RHFTextField
                    name="observations"
                    label="¿Qué observaciones tiene de el/la sobreviviente? (Sus pensamientos y observaciones sobre la Participante (sentimientos, apariencia, estado de ánimo, etc.)"
                    multiline
                    rows={3}
                  />
                  <RHFTextField
                    name="topics"
                    label="Temas revisados, cuestiones que surgieron."
                    multiline
                    rows={3}
                  />
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Evaluar:
                  </Typography>
                  <RHFTextField
                    name="comprehension"
                    label="¿Cuál es su comprensión de lo que está sucediendo con el/la sobreviviente (cómo las cosas
                  están/no están progresando)?"
                    multiline
                    rows={3}
                  />
                  <RHFTextField
                    name="needs"
                    label="¿Qué cree que es necesario para ayudar a el/la sobreviviente a progresar más?"
                    multiline
                    rows={3}
                  />
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Plan:
                  </Typography>
                  <RHFTextField
                    name="survivorPlan"
                    label="¿Qué sucederá a continuación? ¿Qué hará el/la sobreviviente a continuación? ¿tiene tareas escolares?"
                    multiline
                    rows={3}
                  />
                  <RHFTextField
                    name="evaluatorPlan"
                    label="¿Qué va a hacer usted a continuación? ¿Hay llamadas que usted necesita hacer, personas con la que debe comunicarse, citas que debe organizar, etc.? ¿Cuándo será la próxima vez que usted verá a el/la sobreviviente?"
                    multiline
                    rows={3}
                  />
                  <RHFCheckbox name="completed" label="Marcar como completado" sx={{ mt: 3 }} />
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Guardar Cambios
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

export default FollowUpNoteCreate;
