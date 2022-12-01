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
import useMyWork from 'src/hooks/useMyWork';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const myWork = useMyWork();

  const theme = useTheme();

  const { themeStretch } = useSettings();
  const download = () => {
    const anchor = document.createElement('a');
    anchor.href = '/assets/manual_web.pdf';
    anchor.download =
      'Manual Administrador y Usuario Aplicación Módulo Servicios Víctimas Versión Web.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    const anchor2 = document.createElement('a');
    anchor2.href = '/assets/manual_mobile.pdf';
    anchor2.download = 'Manual Usuario Aplicación Módulo Servicios Víctimas Versión Móvil.pdf';
    document.body.appendChild(anchor2);
    anchor2.click();
    document.body.removeChild(anchor2);
  };

  return (
    <Page title="Dashboard">
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
              action={
                <Button variant="contained" onClick={download}>
                  Descargar los Manuales
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <AppCurrentDownload
              title="Resultados ESO"
              chartColors={[
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.primary.main,
                theme.palette.primary.dark,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <AppAreaInstalled title="Casos Asignados" subheader="Durante el año" />
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
