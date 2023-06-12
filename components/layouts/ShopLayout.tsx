import { FC } from 'react';
import Head from 'next/head';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;

  children: React.JSX.Element | React.JSX.Element[];
}

export const ShopLayout: FC<Props> = ({
  title,
  pageDescription,
  imageFullUrl,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />

        {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main className='main-wrapper'>{children}</main>

      <footer>{/** TODO: custom footer */}</footer>
    </>
  );
};
