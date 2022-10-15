import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, styled, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Module } from 'src/@types/module';
import { Role, RoleManager } from 'src/@types/role';
import { RHFMultiCheckbox, RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { createAsync, editAsync } from 'src/services/APIGateway';
import useSWR, { useSWRConfig } from 'swr';
import * as Yup from 'yup';

type Props = {
  isEdit: boolean;
  currentRole?: RoleManager;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function RoleNewEditForm({ isEdit, currentRole }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { data: modules = [] } = useSWR<Module[]>('/module');

  const NewRoleSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    description: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Omit<Role, 'id'> => ({
      name: currentRole?.name ?? '',
      description: currentRole?.description ?? '',
      permissions: (currentRole?.permissions ?? []).map((m) => m.id),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentRole]
  );

  const methods = useForm<Role>({
    resolver: yupResolver(NewRoleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentRole) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentRole]);

  const onSubmit = async (data: Role) => {
    try {
      const { permissions } = data;
      if (isEdit && currentRole) {
        mutate<Role[]>(
          '/role',
          async (roles = []) => {
            const updatedRole = await editAsync<Role>(`/role/${currentRole.id}`, data);
            await editAsync(`/role/${currentRole.id}/permissions`, { modules: permissions });
            const filtered = roles.filter((role) => role.id !== currentRole.id);
            return [...filtered, updatedRole];
          },
          { revalidate: false }
        );
      } else if (!isEdit) {
        const createdRole = await createAsync<Role>('/role', data);
        await editAsync(`/role/${createdRole.id}/permissions`, { modules: permissions });
      }
      navigate(PATH_DASHBOARD.role.list);
      enqueueSnackbar(currentRole ? 'Cambios guardados' : 'Rol Creado');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
              <Typography variant="h5" noWrap>
                Información General
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  mt: 3,
                }}
              >
                <RHFTextField name="name" label="Nombre del Rol" />
                <RHFTextField name="description" label="Descripción" />
                <Box>
                  <LabelStyle>A qué módulos puede acceder este rol?</LabelStyle>
                  <RHFMultiCheckbox
                    name="permissions"
                    options={modules.map((m) => ({ value: m.id, label: m.name }))}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Rol' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
