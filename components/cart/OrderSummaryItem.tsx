import { FC } from 'react';
import { Grid, SxProps, Theme, Typography } from '@mui/material';

interface Props {
  title: string;
  amount: string | number;

  sxTitle?: SxProps<Theme>;
  sxAmount?: SxProps<Theme>;
}

export const OrderSummaryItem: FC<Props> = ({
  title,
  amount,
  sxTitle,
  sxAmount,
}) => {
  return (
    <>
      <Grid item xs={6} sx={sxTitle}>
        <Typography sx={{ fontWeight: 'inherit' }} >{title}</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={sxAmount}>
        <Typography sx={{ fontWeight: 'inherit' }} >{amount}</Typography>
      </Grid>
    </>
  );
};
