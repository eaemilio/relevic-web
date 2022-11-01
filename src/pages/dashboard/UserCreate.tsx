import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';
import useSWR from 'swr';
import { CurrentUser, UserManager } from 'src/@types/user';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import { ModuleType } from 'src/@types/module';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();

  const isEdit = !!id;

  const { data: currentUser } = useSWR<CurrentUser>(id && `/user/${id}`);

  return (
    <RoleBasedGuard hasContent moduleId={ModuleType.USER}>
      <Page title="Nuevo Usuario">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={!isEdit ? 'Crear un Nuevo Usuario' : 'Editar Usuario'}
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Usuarios', href: PATH_DASHBOARD.user.list },
              { name: !isEdit ? 'Nuevo usuario' : capitalCase(currentUser?.name ?? '') },
            ]}
          />

          <UserNewEditForm isEdit={isEdit} currentUser={currentUser} />
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
