const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");
const { generateIdeaPrompt, generateImagePrompt } = require("../utils.js")

// Load environment variables from .env file
dotenv.config();

// OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

const router = express.Router();

// Basic API endpoint
router.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Function to call the ChatGPT API
async function callChatGPT(prompt) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "Accept": "application/json"
  };

  const data = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are part of the innovation team at a CPG company. You are helpful with giving new product ideas",
      },
      { role: "user", content: prompt },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const result = response.data.choices[0].message.content;
    console.log(result, "Response from GPT");
    return result;
  } catch (error) {
    console.error(
      "Error calling ChatGPT API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to call the DallE API
async function callDalle(prompt) {
  const url = "https://api.openai.com/v1/images/generations";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "Accept": "application/json"
  };

  const data = {
    prompt,
    n: 1, // Number of images to generate
    size: "1024x1024", // Image resolution
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log("Generated Image URL response:", response);
    // Get the generated image URL
    const imageUrl = response.data.data[0].url;
    console.log("Generated Image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error(
      "Error calling ChatGPT API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// API to call chat GPT
router.post("/api/menu-data-recommendation", async (req, res) => {
  try {
    const prompt = generateIdeaPrompt(req?.body?.productDetails)
    console.log(prompt, "Recommendation prompt");
    if (!prompt) {
      res.status(400).send({ message: "Invalid Prompt" });
    }
    const result = await callChatGPT(prompt);
    console.log(result, "Result to client");
    res.status(200).send({ details: result });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// API to generate image
router.post("/api/menu-data-product-image", async (req, res) => {
  try {
    console.log(req?.body?.prompt, "Request received");
    const prompt = generateImagePrompt(req?.body?.prompt);
    if (!prompt) {
      res.status(400).send({ message: "Invalid Prompt" });
    }
    const result = await callDalle(prompt);
    console.log(result, "Result to client");
    res.status(200).send({url: result});
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
