const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");
const firstPrompt = `Can you take this idea - 
Based on the attributes and inspiration provided, here is a concept for an innovative juice blend that incorporates
blood orange, targeting the Gen Z and Millennial demographic.

### Product Concept: Dole 100% Juice Blend - Blood Orange Sunshine

#### Product Details:
**Blend Composition:**
- Blood Orange
- Pineapple
- Passion Fruit
- Mango
- A hint of Ginger

**Flavor Profile:**
- **Taste:** Delightfully sweet and tangy blood orange prominently features a blend of tropical sweetness from ripe
pineapple and mango, with a zesty finish from passion fruit, making it a refreshing and vibrant juice option.
- **Aroma:** The aroma is bursting with citrus notes from blood orange, combined with a tropical fragrance that invites
you to take a sip.
- **Texture:** Juicy consistency that enlivens your palate with every sip, enhanced with a slight pulp for a more
fruit-like experience.

**Nutritional Benefits:**
- **No Added Sugar:** Made from 100% juice with natural sugars from the fruits only.
- **Excellent Source of Vitamin C:** Boosts the immune system and promotes healthy skin.
- **Antioxidant Rich:** Blood oranges are particularly high in anthocyanins, which provide additional health benefits.

**Sustainability Commitment:**
- **Eco-Friendly Packaging:** Recyclable carton made from sustainable sources.
- **No Artificial Ingredients:** Formula contains no artificial flavors or preservatives; just pure, real fruit juice.

**Targeting Gen Z and Millennials:**
- **Trendy and Visually Appealing:** Featuring vibrant packaging with artistic designs that highlight the bold colors of
the ingredients.
- **Instagrammable:** The drink’s color and presentation make it perfect for social media sharing, appealing to the
visual-driven nature of younger consumers.
- **Versatile Applications:** Can be enjoyed as a refreshing drink on its own, used as a mixer in cocktails, or blended
into smoothie bowls.

#### Marketing Ideas:
- **Social Media Campaign:** Create visually engaging content showcasing the juice blend in various settings (at brunch,
on-the-go, etc.) to encourage sharing among friends.
- **Influencer Partnerships:** Collaborate with wellness and lifestyle influencers to promote the product as a healthy,
trendy beverage choice.
- **Sampling Events:** Host tastings at popular cafes and events to allow consumers to experience the unique flavor
profile firsthand.

### Visual Mockup:
![Blood Orange Sunshine Juice Blend](https://via.placeholder.com/400x600.png?text=Blood+Orange+Sunshine+Juice+Blend)
*(Image is for illustrative purposes only)*

This innovative juice blend, Blood Orange Sunshine, leverages the unique flavor and visual appeal of blood oranges,
while incorporating other tropical flavors that resonate with the preferences of Gen Z and Millennials.

Use the attached examples and give me an image with the same styling and also contains a cardboard sleeve packaging.
Design a product packaging for above mentioned idea, closely matching the style of the images. The packaging should hold 6 cups. Ensure the design maintains a modern, fresh look while closely resembling existing Dole product packaging.
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
    model: "gpt-4o",
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
