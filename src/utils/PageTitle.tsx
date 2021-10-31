import Head from 'next/head';

interface Props {
  children: string;
  favicon?: string;
}

export default function Title({ children, favicon }: Props) {
  return (
    <Head>
      <title>{children}</title>

      {favicon && <link rel="shortcut icon" href={favicon} type="image/x-icon" />}
    </Head>
  );
}
