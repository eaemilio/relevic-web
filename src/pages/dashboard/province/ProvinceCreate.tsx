import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSWR from 'swr';
import { Province } from 'src/@types/province';
import ProvinceNewEditForm from 'src/sections/@dashboard/province/ProvinceNewEditForm';

export default function ProvinceCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: currentProvince } = useSWR<Province>(id && `/province/${id}`);

  return (
    <Page title="Nueva Provincia">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Nueva Provincia' : 'Editar Provincia'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Provincias', href: PATH_DASHBOARD.province.list },
            { name: !isEdit ? 'Nueva Provincia' : 'Provincia' },
          ]}
        />
        <ProvinceNewEditForm isEdit={isEdit} currentProvince={currentProvince} />
      </Container>
    </Page>
  );
}
