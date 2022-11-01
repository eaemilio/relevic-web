// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWelcome,
  AppNewInvoice,
  AppAreaInstalled,
  AppCurrentDownload,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';
import { _appInvoices } from 'src/_mock';
import useNetworkCaseChartData from 'src/hooks/useNetworkCaseChartData';
import useMyWork from 'src/hooks/useMyWork';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const caseChartData = useNetworkCaseChartData();
  const myWork = useMyWork();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={`Bienvenido de vuelta! \n ${user?.name}`}
              description="En el siguiente dashboard encontrarás la información necesario del módulo de sobrevivientes. ¿Necesitas Ayuda?"
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">Descargar los Manuales</Button>}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <AppCurrentDownload
              title="Resultados ESO"
              chartColors={[
                theme.palette.primary.lighter,
                theme.palette.primary.light,
                theme.palette.primary.main,
                theme.palette.primary.dark,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <AppAreaInstalled
              title="Casos Asignados"
              subheader="Durante el año"
              chartLabels={[
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dic',
              ]}
              chartData={[{ name: 'Nuevos Casos', data: caseChartData }]}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <AppNewInvoice
              title="Mis Tareas Pendientes"
              tableData={myWork}
              tableLabels={[
                { id: 'description', label: 'Tarea' },
                { id: 'antiquity', label: 'Antiguedad' },
                // { id: 'caseId', label: 'Número de Caso' },
                // { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
