import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
// components
import { CustomFile } from '../../../components/upload';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { role } from 'src/_mock/role';
import { generateRandomPassword } from 'src/utils/jwt';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  currentUser?: UserManager;
};

export default function UserNewEditForm({ isEdit, currentUser }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      role: currentUser?.role || 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm<UserManager>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: UserManager) => {
    console.log(data);
    // try {
    //   // const password = generateRandomPassword();
    //   // console.log({ password });
    //   // ! FIXME: Replace with API
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar(!isEdit ? 'Usuario Creado' : 'Cambios guardados');
    //   navigate(PATH_DASHBOARD.user.list);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Nombre Completo" />
              <RHFTextField name="email" label="Correo Electrónico" />
              <RHFSelect name="role" label="Rol" placeholder="Rol">
                <option value="" />
                {role.map((option, index) => (
                  <option key={index} value={index}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Usuario' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
