import Head from 'next/head';

interface Props {
    faviconUrl: string;
}

export default function Title({ faviconUrl }: Props) {
  return (
    <Head>
      <link rel="shortcut icon" href={faviconUrl} type="image/x-icon" />
    </Head>
  );
}
