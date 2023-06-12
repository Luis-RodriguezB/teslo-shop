import { Grid, Typography } from '@mui/material';
import { OrderSummaryItem } from './OrderSummaryItem';

export const OrderSummary = () => {
  return (
    <Grid container>
      <OrderSummaryItem title='No. Productos' amount={3} />

      <OrderSummaryItem title='SubTotal' amount={`$${155.36}`} />

      <OrderSummaryItem title='Impuestos (13%)' amount={`$${35.36}`} />

      <OrderSummaryItem
        title='Total:'
        amount={`$${190.36}`}
        sxTitle={{ mt: 2, fontWeight: 700 }}
        sxAmount={{ mt: 2, fontWeight: 700 }}
      />
    </Grid>
  );
};
