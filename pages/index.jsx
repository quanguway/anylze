import Head from "next/head";
import { Text } from '@vercel/examples-ui';
import { Chat } from '../components/Chat';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({ href: '/', query: { apiKey: e.target.apiKey.value  } });
  }

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
