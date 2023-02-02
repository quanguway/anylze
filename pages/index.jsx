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

  return router.query.hasOwnProperty('apiKey') ? (
    <div>
      <Head>
        <title>ChatGPT Explore - Uway Technology</title>
      </Head>
      <h1 className="text-3xl font-bold text-center my-10">ChatGPT</h1>
      <div className="w-full ">
        <Chat />
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="px-40 mt-20">
      <h1 className="font-bold text-2xl">Enter Key Api First</h1>
      <div className="my-3">
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">API token</label>
        <input name="apiKey" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="api token" required/>
      </div>
      <input type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
    </form>
  );
}
