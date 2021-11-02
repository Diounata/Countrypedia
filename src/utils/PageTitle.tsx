import Head from 'next/head';

interface Props {
  text: string;
}

export default function Title({ text }: Props) {
  return (
    <Head>
      <title>{text}</title>
    </Head>
  );
}
