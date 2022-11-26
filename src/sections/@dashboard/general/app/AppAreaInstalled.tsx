import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField, CardProps } from '@mui/material';
// components
import { BaseOptionChart } from '../../../../components/chart';
import useNetworkCaseChartData from 'src/hooks/useNetworkCaseChartData';

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

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
