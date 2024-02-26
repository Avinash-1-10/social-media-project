import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

export default function UserStats() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={375}
      height={250}
      sx={{bgcolor:colors.grey[800], mt:2}}
    />
  );
}