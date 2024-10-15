const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");
const firstPrompt = `Imagine you are part of the innovation team at a CPG company. Your goal is to create new innovative products consumers will love. The demographic you are targeting are \`Gen Z\` and \`Millenials\`.

Incorporate the following fruits into a trending \`Juice blends\`.

Fruit: \`Blood Orange\`

The fruit cup should have the following attributes
Taste: \`Sweet\`
Aroma: \`Citrusy\`
Texture: \`Juicy\`

Here are some examples of our current fruit cups for inspiration:

Dole:

1] Product: Dole 100% Juice Blend, Orange Strawberry Banana Flavored, 59 Fl Oz Carton

Product Details:"Dole No Sugar Added Orange Strawberry Banana Fruit Juice, Flavored Blend of Apple, Orange, Pineapple, Banana, and Strawberry Juices from Concentrate with Other Natural Flavors and Ingredients Every Glass of Dole 100% Juice Contains: No added sugar or sweeteners. No artificial flavors. Not a Low Calorie Food. Just one 8 fluid ounce glass of Dole 100% juice provides: Two servings of fruit, Excellent source of vitamin C. No high fructose corn syrup.
Proud to be 100% juice
Dole 100% fruit juice contains only sugars from the real fruit
No high fructose corn syrup
No added sugar or sweeteners
No artificial flavors
info:

Image

https://i5.walmartimages.com/seo/Dole-Orange-Strawberry-Banana-59z_dbb24fe4-bd1d-4575-8c6c-e51713df36b9.8020fd1fab79a42ae2f8a1bd0b527b5c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF

2] Product: Dole 100% Juice Orange Strawberry Banana Chilled - 59 Fl. Oz.

Product Details: Dole No Sugar Added Orange Strawberry Banana Fruit Juice, Flavored Blend of Apple, Orange, Pineapple, Banana and Strawberry Juices from Concentrate with Other Natural Flavors and Ingredients Every Glass of Dole 100% Juice Contains: No added sugar or sweeteners. No artificial flavors. Not a Low Calorie Food. Just one 8 fluid ounce glass of Dole 100% juice provides: Two servings of fruit, Excellent source of vitamin C. No high fructose corn syrup.

Image

https://images.albertsons-media.com/is/image/ABS/960275568-ECOM?$ng-ecom-pdp-desktop$&defaultImage=Not_Available


3] Product: Dole 100% Juice Flavored Blend Of Juices Orange Peach Mango 59 Fl Oz

Product Details: Flavored Blend of Apple, Orange, Pineapple, Grape, Peach and Mango Juices from Concentrate with Other Natural Flavors and Ingredients
Dole 100% Fruit Juice contains only sugars from the real fruit. :)

This intense combination made with the juice of oranges, peaches and mangos will take you for a walk on the wild side of adventurous fruit flavor.

No Sugar Added*
*Not a Low Calorie Food
See Nutrition Facts to further information on sugar and calorie content

Two servings of fruit**
**Per 8 fl. oz. serving. Under USDA's Dietary Guidelines, 4 fl 0z. of 100% juice = 1 serving of fruit. The guidelines recommend that you get a majority of your dally fruit servings from whole fruit.
100% juice
No added sugar or sweeteners
No high fructose corn syrup
No artificial flavors
An excellent source of Vitamin C

Image

https://i5.walmartimages.com/seo/Dole-Orange-Peach-Mango-59z_0aec7733-9461-47e4-81f5-a4be64082b6c.f765099dcfc73e62762c668adeb41a30.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF
`;

// Load environment variables from .env file
dotenv.config();

// OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

const router = express.Router();

// Basic API endpoint
router.get("/api/hello", (req, res) => {
  console.log(apiKey, "open AI");
  res.json({ message: "Hello, World!" });
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

// API to call chat GPT
router.post("/api/menu-data-recommendation", async (req, res) => {
  try {
    console.log(req?.body?.prompt, "Request received");
    const prompt = firstPrompt;
    if (!prompt) {
      res.status(400).send({ message: "Invalid Prompt" });
    }
    const result = await callChatGPT(prompt);
    console.log(result, "Result to client");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
