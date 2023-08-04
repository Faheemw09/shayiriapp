const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(cors())
const port = 3005; 


const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);


app.use(express.json());

app.post('/api/generate-shayari', async (req, res) => {
    console.log(req.body)
  const { keyword } = req.body;

  try {

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Write a Shayari on ${keyword}`,
        max_tokens: 2000,
        temperature: 0,

      });
      

  console.log(response.data.choices)
     const shayari = response.data.choices[0].text;
 res.json({ shayari });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error:error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
