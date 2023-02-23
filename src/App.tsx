// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { SWRConfig } from 'swr';
import SWRService from './services/SWRService';

import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

declare global {
  namespace React {
    interface DOMAttributes<T> {
      onResize?: ReactEventHandler<T> | undefined;
      onResizeCapture?: ReactEventHandler<T> | undefined;
      nonce?: string | undefined;
    }
  }
}

dayjs.extend(updateLocale);

dayjs.updateLocale('es', {
  months: [
    'Junio',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
});

dayjs.locale('es');

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <SWRConfig value={{ fetcher: SWRService.getAll }}>
        <ThemeProvider>
          <ThemeSettings>
            <NotistackProvider>
              <ProgressBarStyle />
              <ChartStyle />
              <ScrollToTop />
              <Router />
            </NotistackProvider>
          </ThemeSettings>
        </ThemeProvider>
      </SWRConfig>
    </MotionLazyContainer>
  );
}
