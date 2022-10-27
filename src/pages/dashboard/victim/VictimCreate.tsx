import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSWR from 'swr';
import { Victim, VICTIM_BASE_URL } from 'src/@types/victim';
import VictimNewEditForm from 'src/sections/@dashboard/victim/VictimNewEditForm';

export default function EvaluationAreaCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: currentVictim } = useSWR<Victim>(id && `${VICTIM_BASE_URL}/${id}`);

  return (
    // <RoleBasedGuard hasContent moduleId={ModuleType.EVALUATION_AREA}> FIXME
    <Page title="Víctima">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Nueva Víctima' : 'Editar Víctima'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Víctimas', href: PATH_DASHBOARD.general.victims.list },
            { name: !isEdit ? 'Nueva Víctima' : 'Víctima' },
          ]}
        />
        <VictimNewEditForm isEdit={isEdit} currentVictim={currentVictim} />
      </Container>
    </Page>
    // </RoleBasedGuard>
  );
}
