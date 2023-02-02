import Head from "next/head";
import { Text } from '@vercel/examples-ui';
import { Chat } from '../components/Chat';

export default function Home() {

  return (
    <div>
      <Head>
        <title>ChatGPT Explore - Uway Technology</title>
      </Head>
      <h1 className="text-3xl font-bold text-center my-10">ChatGPT</h1>
      <div className="w-full ">
        <Chat />
      </div>

    </div>
  );
}
