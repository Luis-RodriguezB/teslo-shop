import { useContext } from 'react';
import { CartContext } from '@/context';
import { Grid } from '@mui/material';
import { OrderSummaryItem } from './OrderSummaryItem';
import { getNumberFormat } from '@/utils';

export const OrderSummary = () => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  return (
    <Grid container>
      <OrderSummaryItem title='No. Productos' amount={numberOfItems} />

      <OrderSummaryItem
        title='SubTotal'
        amount={getNumberFormat(subTotal, {
          format: 'en',
          style: 'currency',
          currency: 'USD',
        })}
      />

      <OrderSummaryItem
        title='Impuestos (13%)'
        amount={getNumberFormat(subTotal, {
          format: 'en',
          style: 'currency',
          currency: 'USD',
        })}
      />

      <OrderSummaryItem
        title='Total:'
        sxTitle={{ mt: 2, fontWeight: 700 }}
        sxAmount={{ mt: 2, fontWeight: 700 }}
        amount={getNumberFormat(total, {
          format: 'en',
          style: 'currency',
          currency: 'USD',
        })}
      />
    </Grid>
  );
};
