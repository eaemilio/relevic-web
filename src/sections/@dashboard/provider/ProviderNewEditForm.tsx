import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, styled, Tab, Typography, Tabs } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  FormProvider,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
import { HELP_ITEMS, INTEREST_OPTIONS, ServiceProvider } from 'src/@types/provider';
import useTabs from 'src/hooks/useTabs';
import Iconify from 'src/components/Iconify';
import NewEditBranchesForm from './branches/NewEditBranchesForm';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

type Props = {
  isEdit: boolean;
  currentProvider?: ServiceProvider;
};

export default function ProviderNewEditForm({ isEdit, currentProvider }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewServiceProviderSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
    email: Yup.string().required('Campo obligatorio').email(),
  });

  const defaultValues = useMemo(
    (): Omit<ServiceProvider, 'id'> => ({
      name: currentProvider?.name ?? '',
      email: currentProvider?.email ?? '',
      phone: currentProvider?.phone ?? '',
      description: currentProvider?.phone ?? '',
      address: currentProvider?.address ?? '',
      province: currentProvider?.province ?? '',
      type: currentProvider?.type ?? 0,
      areaId: currentProvider?.areaId ?? 0,
      interest: currentProvider?.interest ?? 0,
      items: currentProvider?.items ?? [],
      latitude: currentProvider?.latitude ?? '',
      longitude: currentProvider?.longitude ?? '',
      isActive: currentProvider ? currentProvider.isActive : true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProvider]
  );

  const methods = useForm<ServiceProvider>({
    resolver: yupResolver(NewServiceProviderSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const { currentTab, onChangeTab } = useTabs('general');

  useEffect(() => {
    if (isEdit && currentProvider) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProvider]);

  const onSubmit = async (data: ServiceProvider) => {
    try {
      // ! FIXME: Replace with API
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Proveedor Creado' : 'Cambios guardados');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        <Tab
          disableRipple
          key={0}
          label="General"
          icon={<Iconify icon={'ic:baseline-settings'} width={20} height={20} />}
          value={'general'}
        />
        <Tab
          disableRipple
          key={1}
          label="Sedes"
          icon={<Iconify icon={'ic:round-place'} width={20} height={20} />}
          value={'sedes'}
        />
      </Tabs>
      {currentTab === 'general' && (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
                <Typography variant="h5" noWrap>
                  Información General
                </Typography>
                <Typography variant="caption" noWrap>
                  Llenar el formulario con los detalles generales de un posible proveedor de
                  servicio
                </Typography>
                <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                  >
                    <RHFTextField name="name" label="Nombre de la organización o persona" />
                    <RHFTextField name="phone" label="Teléfono" />
                    <RHFTextField name="email" label="Correo Electrónico" />
                    <RHFTextField name="address" label="Dirección de la organización o persona" />
                    {/* <RHFTextField name="phoneNumber" label="Número de Teléfono" /> */}
                    {/* <RHFSelect name="role" label="Rol" placeholder="Rol">
                  <option value="" />
                  {role.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                    ))}
                  </RHFSelect> */}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <RHFTextField
                      name="description"
                      label="Título o descripción de persona/organización"
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
                <Typography variant="h5" noWrap>
                  Servicio
                </Typography>
                <Typography variant="caption" noWrap>
                  Llenar el formulario con los detalles del servicio de un posible proveedor
                </Typography>
                <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
                  <RHFSelect
                    name="province"
                    label="Provincia en que trabaja"
                    placeholder="Provincia en que trabaja"
                  >
                    <option value="" />
                    {['Provincia 1', 'Provincia 2'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFSelect
                    name="type"
                    label="Tipo de Servicio que la persona puede proveer"
                    placeholder="Tipo de Servicio que la persona puede proveer"
                  >
                    <option value="" />
                    {['Tipo 1', 'Tipo 2'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFSelect
                    name="areaId"
                    label="En cuáles áreas de la evaluación del sobreviviente puede aportar esta persona u organización"
                    placeholder="En cuáles áreas de la evaluación del sobreviviente puede aportar esta persona u organización"
                  >
                    <option value="" />
                    {['área 1', 'área 2'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </RHFSelect>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, flexDirection: 'column', display: 'flex' }}>
                <Typography variant="h5" noWrap>
                  Red de Proveedores
                </Typography>
                <Typography variant="caption" noWrap>
                  Acerca de la Red
                </Typography>
                <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2, mt: 3 }}>
                  <Box>
                    <LabelStyle>Está Interesado/a en formar parte de la red</LabelStyle>
                    <RHFRadioGroup
                      name="interest"
                      options={INTEREST_OPTIONS}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      Qué necesitará para formar parte de la red? Cómo puede ayudarle IJM?
                    </LabelStyle>
                    <RHFMultiCheckbox
                      name="items"
                      options={HELP_ITEMS}
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
                  {!isEdit ? 'Crear Proveedor' : 'Guardar Cambios'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      )}

      {currentTab === 'sedes' && <NewEditBranchesForm />}
    </>
  );
}
