import { FC, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  inStock: number;
  currentQuantity: number;
  updatedQuantity: (quantitySelected: number) => void;
}

export const ItemCounter: FC<Props> = ({
  inStock,
  currentQuantity,
  updatedQuantity,
}) => {
  
  const handleQuantitySelected = (value: number) => {
    if (value === -1) {
      if (currentQuantity === 1) return;

      updatedQuantity(currentQuantity + value);
    } else {
      if (currentQuantity === inStock) return;

      updatedQuantity(currentQuantity + value);
    }
  };

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => handleQuantitySelected(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentQuantity}
      </Typography>
      <IconButton onClick={() => handleQuantitySelected(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
