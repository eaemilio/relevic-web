import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSWR from 'swr';
import { EvaluationArea } from 'src/@types/evaluation-area';
import EvaluationAreaNewEditForm from 'src/sections/@dashboard/evaluation-area/EvaluationAreaNewEditForm';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import { ModuleType } from 'src/@types/module';

export default function EvaluationAreaCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: currentEvaluationArea } = useSWR<EvaluationArea>(id && `/evaluation-area/${id}`);

  return (
    <RoleBasedGuard hasContent moduleId={ModuleType.EVALUATION_AREA}>
      <Page title="Área de Evaluación">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={!isEdit ? 'Nueva Área de Evaluación' : 'Editar Área de Evaluación'}
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Áreas de evaluación', href: PATH_DASHBOARD.evaluationArea.list },
              { name: !isEdit ? 'Nueva área de evaluación' : 'Área de evaluación' },
            ]}
          />
          <EvaluationAreaNewEditForm
            isEdit={isEdit}
            currentEvaluationArea={currentEvaluationArea}
          />
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
