import axios from "axios";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "./index.module.css";
import * as XLSX from 'xlsx';


export default function Home() {
  const [dataXLXS, setDataXLXS] = useState(null);
  const [html, setHtml] = useState(null);

  const handleSubmit = (event) => {
  event.preventDefault();

  const file = event.target.file.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const firstSheet = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheet];
    const rows = XLSX.utils.sheet_to_json(worksheet);
    console.log(rows);
    setDataXLXS(rows);
  };
  reader.readAsBinaryString(file);
};


const analyzeData = async () => {
  try {
    const message =  refInput.current.value;
    console.log(message);
    const res = await axios.post('/api/anaylize', {data: dataXLXS, message});
    setHtml(await axios.post('/api/anaylize', {data: dataXLXS, message}));
    } catch(err) {
      console.log(err)
    }

  return res;
};
  const refInput = useRef(null);
  
  return (
    <div>
      <Head>
        <title>Analysit Bussiness</title>
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" />
          <button type="submit">Upload</button>
        </form>
        <input ref={refInput} type='text'/>
        <button onClick={analyzeData}>analyzeData</button>
        <div>{html}</div>
      </main>
    </div>
  );
}
