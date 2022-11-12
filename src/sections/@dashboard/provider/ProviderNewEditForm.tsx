import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useHref } from 'react-router-dom';
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
import {
  CurrentServiceProvider,
  HELP_ITEMS,
  INTEREST_OPTIONS,
  PROVIDER_BASE_URL,
  ServiceProvider,
  ServiceProviderBody,
} from 'src/@types/provider';
import useTabs from 'src/hooks/useTabs';
import Iconify from 'src/components/Iconify';
import BranchesView from './branches/BranchesView';
import { EvaluationArea } from 'src/@types/evaluation-area';
import useSWR from 'swr';
import { Province } from 'src/@types/province';
import { ServiceType } from 'src/@types/service-type';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

type Props = {
  isEdit: boolean;
  currentProvider?: CurrentServiceProvider;
};

export default function ProviderNewEditForm({ isEdit, currentProvider }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { data: areas = [] } = useSWR<EvaluationArea[]>('/provider-areas');
  const { data: provinces = [] } = useSWR<Province[]>('/province');
  const { data: serviceTypes = [] } = useSWR<ServiceType[]>('/service-type');

  const NewServiceProviderSchema = Yup.object().shape({
    name: Yup.string().required('Campo obligatorio'),
  });

  const defaultValues = useMemo(
    (): Omit<ServiceProvider, 'id'> => ({
      name: currentProvider?.name ?? '',
      email: currentProvider?.email ?? '',
      phoneNumber: currentProvider?.phoneNumber ?? '',
      description: currentProvider?.description ?? '',
      address: currentProvider?.address ?? '',
      provinceId: currentProvider?.province.id ?? 0,
      serviceTypeId: currentProvider?.serviceType?.id ?? 0,
      providerAreaId: currentProvider?.providerAreas?.id ?? 0,
      networkInterest: currentProvider?.networkInterest ?? 0,
      networkNeeds: JSON.parse(currentProvider?.networkNeeds ?? '[]'),
      // isActive: currentProvider ? currentProvider.isActive : true, FIXME
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
  const { currentTab, onChangeTab, setCurrentTab } = useTabs('general');

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
      const { provinceId, serviceTypeId, providerAreaId, networkNeeds, networkInterest } = data;
      const body: ServiceProviderBody = {
        ...data,
        providerAreaId: +providerAreaId,
        serviceTypeId: +serviceTypeId,
        provinceId: +provinceId,
        networkNeeds: JSON.stringify(networkNeeds),
        networkInterest: +networkInterest,
      };

      if (!currentProvider) {
        const provider = await axiosInstance.post(PROVIDER_BASE_URL, body);
        navigate(`/dashboard/provider/${provider.data?.id}`);
      } else {
        await axiosInstance.put(`${PROVIDER_BASE_URL}/${currentProvider.id}`, body);
      }
      enqueueSnackbar(!isEdit ? 'Proveedor Creado' : 'Cambios guardados');
      setCurrentTab('sedes');
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
          disabled={!isEdit}
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
                    <RHFTextField name="phoneNumber" label="Teléfono" />
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
                    name="provinceId"
                    label="Provincia en que trabaja"
                    placeholder="Provincia en que trabaja"
                  >
                    <option value="" />
                    {provinces.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFSelect
                    name="serviceTypeId"
                    label="Tipo de Servicio que la persona puede proveer"
                    placeholder="Tipo de Servicio que la persona puede proveer"
                  >
                    <option value="" />
                    {serviceTypes.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFSelect
                    name="providerAreaId"
                    label="En cuáles áreas de la evaluación del sobreviviente puede aportar esta persona u organización"
                    placeholder="En cuáles áreas de la evaluación del sobreviviente puede aportar esta persona u organización"
                  >
                    <option value="" />
                    {areas.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
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
                      name="networkInterest"
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
                      name="networkNeeds"
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
                  {!isEdit ? 'Siguiente: Agregar Sedes' : 'Guardar Cambios'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      )}

      {currentTab === 'sedes' && currentProvider && (
        <BranchesView currentProvider={currentProvider} />
      )}
    </>
  );
}
