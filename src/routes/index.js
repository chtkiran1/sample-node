
const axios = require("axios");
const dotenv = require("dotenv");
const express = require('express');

// Load environment variables from .env file
dotenv.config();

// OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

const router = express.Router();

// Basic API endpoint
router.get('/api/hello', (req, res) => {
  console.log(apiKey, 'open AI')
  res.json({ message: 'Hello, World!' });
});

// Function to call the ChatGPT API
async function callChatGPT(prompt) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const result = response.data.choices[0].message.content;
    return result;
  } catch (error) {
    console.error(
      "Error calling ChatGPT API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// API to call chat GPT
router.post('/api/menu-data-recommendation', (req, res) => {
  try { 
    const prompt = req?.body?.prompt
    if(!prompt) {
      res.status(400).send({ message: "Invalid Prompt" })
    }
    const result =  callChatGPT(prompt)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: error})
  }
});


module.exports = router;
