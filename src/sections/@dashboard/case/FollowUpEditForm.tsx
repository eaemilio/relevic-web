import { FormProvider, useForm } from 'react-hook-form';
import { FollowUp } from 'src/@types/follow-up';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import { NetworkCase } from 'src/@types/case';

type Props = {
  isEdit: boolean;
  currentFollowUp?: FollowUp;
  currentCase: NetworkCase;
};

export default function FollowUpEditForm({ isEdit, currentFollowUp, currentCase }: Props) {
  const defaultValues = useMemo(
    (): Omit<FollowUp, 'id'> => ({
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
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: Omit<FollowUp, 'id'>) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} />
      <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
        <Typography variant="h5" noWrap>
          Seguimiento de Caso
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
          <RHFTextField name="date" label="Fecha" />
          <RHFTextField name="tribunal" label="Tribunal" />
          <RHFTextField name="lawyer" label="Abogado Actuante" />
          <RHFTextField multiline rows={3} name="decisions" label="Decisiones" />
          {/* <RHFTextField name="nextAudienceDate" label="Fecha Próxima audiencia" /> */}
          {/* <RHFCheckbox name="cancelled" label="Marcar como cancelada" sx={{ mt: 3 }} />
          <RHFTextField name="cancelledReason" label="Motivo de Cancelación de Audiencia" /> */}
        </Box>
      </Card>
    </FormProvider>
  );
}
