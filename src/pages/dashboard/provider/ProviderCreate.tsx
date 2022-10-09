import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import ProviderNewEditForm from 'src/sections/@dashboard/provider/ProviderNewEditForm';

// ----------------------------------------------------------------------

export default function ProviderCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id } = useParams();

  const isEdit = pathname.includes('edit');

  console.log(`params id: ${id}`)

  return (
    <Page title="Nuevo Proveedor">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Crear un Nuevo Proveedor' : 'Editar Proveedor'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Proveedores', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'Nuevo Proveedor' : 'Proveedor' },
          ]}
        />

        <ProviderNewEditForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
