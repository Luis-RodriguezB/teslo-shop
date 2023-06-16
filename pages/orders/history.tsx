import { ShopLayout } from '@/components/layouts';
import NextLink from 'next/link';
import { Typography, Grid, Link } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { OrderState } from '@/components/ui';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'fullName',
    headerName: 'Nombre',
    width: 245,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 245,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? <OrderState isPaid /> : <OrderState />;
    },
  },
  {
    field: 'datePurchase',
    headerName: 'Fecha de compra',
    width: 245,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'order',
    headerName: 'Orden',
    description: 'Ver ordenes',
    width: 245,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`}>
          <Link component='span' underline='hover'>
            ver orden
          </Link>
        </NextLink>
      );
    },
  },
];

const rows: GridRowsProp = [
  { id: 1, paid: false, fullName: 'Luis Rodriguez', datePurchase: new Date() },
  {
    id: 2,
    paid: true,
    fullName: 'Enrique Baltodano',
    datePurchase: new Date(),
  },
  { id: 3, paid: false, fullName: 'Luis Baltodano', datePurchase: new Date() },
  {
    id: 4,
    paid: true,
    fullName: 'Enrique Rodriguez',
    datePurchase: new Date(),
  },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title='Historial de orden'
      pageDescription='Historia de ordenes del cliente'
    >
      <Typography variant='h1' component='h1'>
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={10} marginX='auto' sx={{ height: 650, width: '75%' }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
