
import { firstPrompt } from "../prompt";
import axios from "axios";
import dotenv from "dotenv";
import express from "express"

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
    console.log(result, 'Response from GPT')
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
router.post('/api/menu-data-recommendation', async (req, res) => {
  try { 
    console.log(req?.body?.prompt, 'Request received')
    const prompt = firstPrompt
    if(!prompt) {
      res.status(400).send({ message: "Invalid Prompt" })
    }
    const result =  await callChatGPT(prompt)
    console.log(result, 'Result to client')
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: error})
  }
});


module.exports = router;
