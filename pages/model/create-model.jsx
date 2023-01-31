import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { configAPI } from "../../config";

export default function Analysit() {
  const [fineTunes, setFineTunes] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.openai.com/v1/fine-tunes", configAPI)
      .then(response => {setFineTunes(response.data.data)});
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    let params = {
      'training_file': 'file-C4dQWpLBgHm2HE5fg3DE1nQB',
      'model' : event.target.model.value,
      'suffix' : event.target.name.value
    }

    const respone = await axios.post('https://api.openai.com/v1/fine-tunes', params, configAPI);
    setFineTunes([...fineTunes, respone.data]);
  }
  return (
    <div>
      <Head>
        <title>Analysit Bussiness</title>
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <div class="form-group mt-4">
            <label>Fine-tunning name</label>
            <input type="text" name="name" class="form-control" placeholder="Enter model name"/>
          </div>
          <div class="form-group mt-4">
            <label for="exampleInputPassword1">Select model</label>
            <select name="model" class="form-control">
              <option value={'davinci'}>davinci</option>
              <option value={'ada'}>ada</option>
              <option value={'babbage'}>babbage</option>
              <option value={'curie'}>curie</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary mt-4">Submit</button>
        </form>
        <h3 className="mt-4">List model</h3>
        { fineTunes ? fineTunes.map((value, index) => {
          return (
            <div>
              <Link key={index} href={`/model/${value.id}`}>{value.id}</Link>
            </div>
          )
        }) : (<></>) }
      </main>
    </div>
  );
}
