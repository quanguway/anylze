const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

import { Configuration, OpenAIApi } from "openai";

export default async function (req, res) {
	console.log('start api');
	try {
		const {data, message} = req.body;
		console.log(data);
		const openai = new OpenAIApi(configuration);

	  const response = await openai.createCompletion({
	    'model':'text-davinci-003',
	    'prompt': `${message} ${data ? JSON.stringify(data) : ''}`, 
	    'max_tokens': 100,
	  });

	  console.log(response.data.choices[0])

	  return res.json(response.data.choices[0]);
	} catch (err) {
		console.log('err rùi')
		console.log(err);
	}
}