import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import ProviderNewEditForm from 'src/sections/@dashboard/provider/ProviderNewEditForm';
import { CurrentServiceProvider } from 'src/@types/provider';
import useSWR from 'swr';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import { ModuleType } from 'src/@types/module';

// ----------------------------------------------------------------------

export default function ProviderCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: currentProvider } = useSWR<CurrentServiceProvider>(id && `/provider/${id}`);

  return (
    <RoleBasedGuard hasContent moduleId={ModuleType.PROVIDER} onlyRootProvider>
      <Page title="Nuevo Proveedor">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={!isEdit ? 'Crear un Nuevo Proveedor' : 'Editar Proveedor'}
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Proveedores', href: PATH_DASHBOARD.provider.list },
              { name: !isEdit ? 'Nuevo Proveedor' : 'Proveedor' },
            ]}
          />

          <ProviderNewEditForm isEdit={isEdit} currentProvider={currentProvider} />
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
