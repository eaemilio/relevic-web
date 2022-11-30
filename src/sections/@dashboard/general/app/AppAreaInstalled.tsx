import merge from 'lodash/merge';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import {
  Card,
  CardHeader,
  Box,
  TextField,
  CardProps,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
} from '@mui/material';
// components
import { BaseOptionChart } from '../../../../components/chart';
import useNetworkCaseChartData from 'src/hooks/useNetworkCaseChartData';
import dayjs from 'dayjs';
import useNetworkCaseData from 'src/hooks/useNetworkCaseData';
import CaseDocument from 'src/components/pdf/CaseDocument';
import { PDFViewer, usePDF } from '@react-pdf/renderer';
import { NetworkCase } from 'src/@types/case';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
}

export default function AppAreaInstalled({ title, subheader, ...other }: Props) {
  const caseChartData = useNetworkCaseChartData();
  const chartLabels = [
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
  ];
  const chartData = [{ name: 'Nuevos Casos', data: caseChartData }];

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: chartLabels,
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [filteredCases, setFilteredCases] = useState<NetworkCase[]>([]);
  const { cases } = useNetworkCaseData();
  const [instance, updateInstance] = usePDF({
    document: (
      <CaseDocument cases={filteredCases} month={dayjs().month(selectedMonth).format('MMMM')} />
    ),
  });

  useEffect(() => {
    setFilteredCases(cases.filter((c) => dayjs(c.createdAt).month() === selectedMonth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, cases]);

  useEffect(() => {
    updateInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCases]);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button variant="contained" onClick={() => setOpen(true)}>
            Descargar Reporte
          </Button>
        }
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Reporte de Casos</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 4, flexDirection: 'column', display: 'flex', gap: 3 }}>
            <TextField
              select
              label="Mes"
              fullWidth
              SelectProps={{ native: true }}
              sx={{ width: 300 }}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(+e.target.value)}
            >
              <option value={0}>Enero</option>
              <option value={1}>Febrero</option>
              <option value={2}>Marzo</option>
              <option value={3}>Abril</option>
              <option value={4}>Mayo</option>
              <option value={5}>Junio</option>
              <option value={6}>Julio</option>
              <option value={7}>Agosto</option>
              <option value={8}>Septiembre</option>
              <option value={9}>Octubre</option>
              <option value={10}>Noviembre</option>
              <option value={11}>Diciembre</option>
            </TextField>

            {instance.url && (
              <Link
                href={instance.url}
                download={`Casos del mes de ${dayjs()
                  .locale('es')
                  .month(selectedMonth)
                  .format('MMMM')}.pdf`}
              >
                Descargar Informe
              </Link>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
