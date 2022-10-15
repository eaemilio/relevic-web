import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSWR from 'swr';
import { ServiceType } from 'src/@types/service-type';
import ServiceTypeNewEditForm from 'src/sections/@dashboard/service-type/ServiceTypeNewEditForm';

export default function ServiceTypeCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: currentService } = useSWR<ServiceType>(id && `/service-type/${id}`);

  return (
    <Page title="Nuevo Tipo de Servicio">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Nuevo Tipo de Servicio' : 'Editar Tipo de Servicio'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Tipos de Servicio', href: PATH_DASHBOARD.serviceType.list },
            { name: !isEdit ? 'Nuevo Tipo de Servicio' : 'Tipo de Servicio' },
          ]}
        />
        <ServiceTypeNewEditForm isEdit={isEdit} currentService={currentService} />
      </Container>
    </Page>
  );
}
