const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

import { Configuration, OpenAIApi } from "openai";

export default async function (req, res) {
	console.log('start api');
	try {
		console.log(req.body);
		const {data, message} = req.body;
		const openai = new OpenAIApi(configuration);
		console.log('what is cat');
	  const response = await openai.createCompletion({
	    'model':'text-davinci-002',
	    'prompt': `${message}`,
	    'max_tokens': 100,
	  });
	  console.log('after completion =======================')
	  console.log(response.data);

	  return response.data.choices[0].text;
	} catch (err) {
		console.log('err rùi')
		console.log(err);
	}
}