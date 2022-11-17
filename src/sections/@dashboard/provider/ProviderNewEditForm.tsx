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
    provinceId: Yup.number(),
    networkInterest: Yup.number(),
  });

  const defaultValues: ServiceProviderBody = useMemo(
    (): ServiceProviderBody => ({
      name: currentProvider?.name ?? '',
      email: currentProvider?.email ?? '',
      phoneNumber: currentProvider?.phoneNumber ?? '',
      description: currentProvider?.description ?? '',
      address: currentProvider?.address ?? '',
      provinceId: currentProvider?.province.id ?? 0,
      serviceTypeIds: (currentProvider?.serviceTypes ?? []).map((m) => m.id),
      providerAreaIds: (currentProvider?.providerAreas ?? []).map((m) => m.id),
      networkInterest: currentProvider?.networkInterest ?? 0,
      networkNeeds: JSON.parse(currentProvider?.networkNeeds ?? '[]'),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProvider]
  );

  const methods = useForm<ServiceProviderBody>({
    resolver: yupResolver(NewServiceProviderSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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

  const onSubmit = async (data: ServiceProviderBody) => {
    try {
      const { networkNeeds } = data;
      const body: ServiceProviderBody = {
        ...data,
        networkNeeds: JSON.stringify(networkNeeds),
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
                  <Box>
                    <LabelStyle>Tipo de Servicios que la persona puede proveer</LabelStyle>
                    <RHFMultiCheckbox
                      name="serviceTypeIds"
                      options={serviceTypes.map((m) => ({ value: m.id, label: m.name }))}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelStyle>
                      En cuáles áreas de la evaluación del sobreviviente puede aportar esta persona
                      u organización
                    </LabelStyle>
                    <RHFMultiCheckbox
                      name="providerAreaIds"
                      options={areas.map((m) => ({ value: m.id, label: m.name }))}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </Box>
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
