// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useLocales from '../../../hooks/useLocales';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useAuth();

  const { translate } = useLocales();

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
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hola, {user?.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          ¿Necesitas ayuda?
        </Typography>
      </div>

      <Button variant="contained" onClick={download}>
        Descarga los manuales
      </Button>
    </Stack>
  );
}
