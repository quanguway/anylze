import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import { configAPI } from '../../config';
import * as XLSX from 'xlsx';

export default function StoreIntroduce({data}) {

  const [dataSLXS, setDataXLXS] = useState(null);
  const [HTMLTextTable, setHTMLTextTable] = useState(null);
  const [HTMLTextAns, setHTMLTextAns] = useState(null);

	const handleSubmitFile = (event) => {
    event.preventDefault();

    const file = event.target.file.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const rows = XLSX.utils.sheet_to_json(worksheet);
      setDataXLXS(rows);
    };
    reader.readAsBinaryString(file);
    const params = {
      "model": "text-davinci-003",
      "prompt": `render html table from ${JSON.stringify(dataSLXS)}`,
      "max_tokens": 100,
      "temperature": 1
    }
    axios.post('https://api.openai.com/v1/completions', params, configAPI).then((res) => {
      console.log(res.data.choices[0])
      setHTMLTextTable(res.data.choices[0].text);
    })
    
  }

  const handleSubmitChat =(event) => {
    event.preventDefault();
    const params2 = {
      "model": "text-davinci-003",
      "prompt": `${event.target.message.value} json above i render all`,
      "max_tokens": 100,
      "temperature": 1
    }
    axios.post('https://api.openai.com/v1/completions', params2, configAPI).then((res) => {
      console.log(res.data.choices[0]);
      setHTMLTextAns(res.data.choices[0].text);
    })
  }
  return (
    <>
      <Head>
        <title>Tera Car</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={handleSubmitFile}>
          <div class="form-group">
            <label>Choose execel file to analyze</label>
            <input class="form-control mt-2" type="file" name="file"/>
          </div>
          <input class="btn btn-primary mt-2" type="submit"/>
        </form>

        <div className='mt-1' dangerouslySetInnerHTML={{ __html: HTMLTextTable }}/>

        {HTMLTextTable ? (
          <>
            <form onSubmit={handleSubmitChat} className='mt-3'>
              <div class="form-group">
                <label>Message</label>
                <input class="form-control" type="text" name="message" placeholder='Enter message'/>
              </div>
              <input type="submit" class="btn btn-primary mt-2" value={'chat'}/>
            </form>
            <div className='mt-1' dangerouslySetInnerHTML={{ __html: HTMLTextAns}}/>
          </>
          ) : (<></>)}
        
      </main>
    </>);
}

export const getStaticPaths = async () => {
  const response = await axios.get("https://api.openai.com/v1/fine-tunes", configAPI);
  const pathsWithParams = response.data.data.map((item) => ({ params: { id: item.id }}));
  return {
    paths: pathsWithParams,
    fallback: true
  };
};

export const getStaticProps = async ({params}) => {
	console.log(params.id);
  const response = await fetch(`https://api.openai.com/v1/fine-tunes/${params.id}`, configAPI)

  return {
    props: {
      data: response.data | null
    }
  };
};