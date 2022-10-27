import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSWR from 'swr';
import CaseNewEditForm from 'src/sections/@dashboard/case/CaseNewEditForm';

export default function ProvinceCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: currentCase } = useSWR(id && `/case/${id}`);

  return (
    // <RoleBasedGuard hasContent moduleId={ModuleType.PROVINCE}> FIXME
    <Page title="Nuevo Caso">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Nuevo Caso' : 'Editar Caso'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Casos', href: PATH_DASHBOARD.general.cases.list },
            { name: !isEdit ? 'Nuevo Caso' : 'Caso' },
          ]}
        />
        <CaseNewEditForm isEdit={isEdit} currentCase={currentCase} />
      </Container>
    </Page>
    // </RoleBasedGuard>
  );
}
