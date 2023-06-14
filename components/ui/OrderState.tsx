import { FC } from 'react';
import { Chip } from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

interface Props {
  isPaid?: boolean;
  showIcon?: boolean;
}

export const OrderState: FC<Props> = ({ isPaid = false, showIcon = false }) => {
  return (
    <>
      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Pagado'
          variant='outlined'
          color='success'
          icon={showIcon ? <CreditScoreOutlined /> : undefined}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Pendiente de pago'
          variant='outlined'
          color='error'
          icon={showIcon ? <CreditCardOffOutlined /> : undefined}
        />
      )}
    </>
  );
};
