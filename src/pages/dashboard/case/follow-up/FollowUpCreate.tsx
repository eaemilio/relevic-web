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
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CASE_BASE_URL, NetworkCase } from 'src/@types/case';
import { FollowUp, FollowUpBody } from 'src/@types/follow-up';
import { RHFTextField } from 'src/components/hook-form';
import { createAsync, editAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

type Props = {
  open: boolean;
  handleClose: () => void;
  currentFollowUp?: FollowUp;
  currentCase: NetworkCase;
};

export default function FollowUpCreate({ open, handleClose, currentFollowUp, currentCase }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const defaultValues = useMemo(
    (): FollowUpBody => ({
      date: currentFollowUp?.date ?? '',
      decisions: currentFollowUp?.decisions ?? '',
      lawyer: currentFollowUp?.lawyer ?? '',
      tribunal: currentFollowUp?.tribunal ?? '',
      nextAudienceDate: currentFollowUp?.nextAudienceDate ?? '',
      canceled: currentFollowUp?.canceled ?? false,
      cancelledReason: currentFollowUp?.cancelledReason ?? '',
      caseId: currentCase.id,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFollowUp]
  );

  const NewSchema = Yup.object().shape({
    date: Yup.string().required('Campo obligatorio'),
    decisions: Yup.string().required('Campo obligatorio'),
    lawyer: Yup.string().required('Campo obligatorio'),
    tribunal: Yup.string().required('Campo obligatorio'),
  });

  const methods = useForm<Omit<FollowUp, 'id'>>({
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

  const onSubmit = async (data: FollowUpBody) => {
    try {
      if (currentFollowUp) {
        const updated = await editAsync<FollowUpBody, FollowUp>(
          `/follow-up/${currentFollowUp.id}`,
          {
            ...data,
            date: dayjs(data.date).toISOString(),
            nextAudienceDate: data.nextAudienceDate
              ? dayjs(data.nextAudienceDate).toISOString()
              : undefined,
          }
        );
        mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
          ...currentCase,
          followUps: [...currentCase.followUps.filter((f) => f.id !== currentFollowUp.id), updated],
        });
        enqueueSnackbar('Formulario demográfico guardado.');
        handleClose();
      } else {
        const followUp = await createAsync<FollowUpBody, FollowUp>('/follow-up', {
          ...data,
          date: dayjs(data.date).toISOString(),
          nextAudienceDate: data.nextAudienceDate
            ? dayjs(data.nextAudienceDate).toISOString()
            : undefined,
        });
        mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
          ...currentCase,
          followUps: [...(currentCase.followUps ?? []), followUp],
        });
        enqueueSnackbar('Datos guardados.');
        handleClose();
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Ocurrió un error al guardar los datos, inténtalo de nuevo', {
        variant: 'error',
      });
    }
  };

  const watchDate = watch('date');

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Audiencia</DialogTitle>
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
                <RHFTextField name="tribunal" label="Tribunal" />
                <RHFTextField name="lawyer" label="Abogado Actuante" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Fecha"
                    inputFormat="DD/MM/YYYY HH:mm"
                    value={watchDate}
                    onChange={(e) => e && setValue('date', e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 3,
                }}
              >
                <RHFTextField multiline rows={3} name="decisions" label="Decisiones" />
              </Box>
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
