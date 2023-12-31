import { Box } from '@mui/material';
import { ErrorProps } from 'next/error';
import Head from 'next/head';
import { FC } from 'react';

interface Props {
  title: string;
  children: false | React.JSX.Element | React.JSX.Element[];
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='calc(100vh - 200px)'
        >
          {children}
        </Box>
      </main>
    </>
  );
};
