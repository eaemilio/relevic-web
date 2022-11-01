import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Card, Grid, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { CurrentUser, UserBody, UserManager } from '../../../@types/user';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { generateRandomPassword } from 'src/utils/jwt';
import { createUser, editUser } from 'src/services/UserService';
import useSWR, { useSWRConfig } from 'swr';
import SWRService from 'src/services/SWRService';
import { Role } from 'src/@types/role';
import { PROVIDER_BASE_URL, ServiceProvider } from 'src/@types/provider';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  currentUser?: CurrentUser;
};

export default function UserNewEditForm({ isEdit, currentUser }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate } = useSWRConfig();
  const { enqueueSnackbar } = useSnackbar();
  const { data: roles = [] } = useSWR<Role[]>('/role');
  const { data: providers = [] } = useSWR<ServiceProvider[]>(PROVIDER_BASE_URL);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    roleId: Yup.number().required('Role Number is required'),
    providerId: Yup.number().required('Role Number is required'),
  });

  const defaultValues = useMemo(
    (): Omit<UserBody, 'password'> => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      roleId: currentUser?.role.id ?? 0,
      providerId: currentUser?.provider?.id ?? 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm<UserBody>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
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

  const onSubmit = async (data: UserBody) => {
    try {
      if (!isEdit) {
        const password = generateRandomPassword();
        if (user?.provider?.id === 1) {
          await createUser({ ...data, password });
        } else {
          await createUser({ ...data, providerId: user?.provider?.id, password });
        }
        navigator.clipboard.writeText(password);
      } else if (currentUser?.id) {
        await editUser(currentUser?.id, data);
      }
      mutate('/user');
      reset();
      enqueueSnackbar(!isEdit ? 'Usuario Creado' : 'Cambios guardados');
      !isEdit && enqueueSnackbar('Se ha copiado la contraseña al portapapeles');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
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
              <RHFSelect name="roleId" label="Rol" placeholder="Rol">
                <option key={0} value={0} />
                {roles.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
              {user?.provider?.id === 1 && (
                <RHFSelect name="providerId" label="Proveedor" placeholder="Proveedor">
                  <option key={0} value={0} />
                  {providers.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </RHFSelect>
              )}
            </Box>

            {user?.provider?.id !== 1 && (
              <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                <Alert severity="info">
                  Se creara el usuario para la organización: {user?.provider?.name}
                </Alert>
              </Stack>
            )}

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
