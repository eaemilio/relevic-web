import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { editAsync } from 'src/services/APIGateway';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

type FormValuesProps = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'La contraseña debe de tener al menos 8 caracteres')
      .required('Campo obligatorio'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Las contraseñas no coinciden'
    ),
  });

  const defaultValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!user?.id) {
        return;
      }
      await editAsync(`/auth/${user.id}/password`, {
        password: data.newPassword,
      });
      reset();
      enqueueSnackbar('Contraseña actualizada!');
    } catch (error) {
      enqueueSnackbar('Ocurrió un error, intentalo nuevamente.', { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="newPassword" type="password" label="Nueva Contraseña" />
          <RHFTextField
            name="confirmNewPassword"
            type="password"
            label="Confirmar Nueva Contraseña"
          />
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Guardar Cambios
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
