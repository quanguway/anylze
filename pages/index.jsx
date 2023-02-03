import Head from "next/head";
import { Text } from '@vercel/examples-ui';
import { Chat } from '../components/ChatTest';
import { useRouter } from "next/router";

export default function Home({ ip, ipTest }) {
  const router = useRouter();
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

export async function getServerSideProps({ req }) {
  console.log(req.headers);
  const ipTest = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  return {
    props: {
      ip,
      ipTest
    },
  };
}
