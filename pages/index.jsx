import Head from "next/head";
import { ChatTest } from '../components/ChatTest';
import { useRouter } from "next/router";


export default function Home({ localIp }) {
  console.log(localIp);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>ChatGPT Explore - Uway Technology</title>
      </Head>
        <h1 className="text-3xl font-bold text-center my-10">ChatGPT</h1>
        <div className="w-full ">
          <ChatTest localIP={localIp}/>
        </div>
    </div>
  ); 
}

export async function getServerSideProps({ req }) {
  // const ipTest = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  // console.log( 'ip network ' + ip )
  var os = require('os');
  var ifaces = os.networkInterfaces();
  var localIp = "";
  console.log('get ???')
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      localIp = iface.address;
    });
  });

  return {
    props: {
      localIp,
    },
  };
}
