import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSWR from 'swr';
import RoleNewEditForm from 'src/sections/@dashboard/Role/RoleNewEditForm';
import { RoleManager } from 'src/@types/role';

// ----------------------------------------------------------------------

export default function RoleCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: currentRole } = useSWR<RoleManager>(id && `/role/${id}`);

  return (
    <Page title="Nuevo Rol">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Crear un Nuevo Rol' : 'Editar Rol'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Roles', href: PATH_DASHBOARD.role.list },
            { name: !isEdit ? 'Nuevo Rol' : 'Rol' },
          ]}
        />
        <RoleNewEditForm isEdit={isEdit} currentRole={currentRole} />
      </Container>
    </Page>
  );
}
