// utils.js
// ========
const { PRODUCT_IDEAS, PRODUCTLINE_MAP } = require("./constants");

module.exports = {
  generateIdeaPrompt: function (params) {
    const { productLine, ingredient, taste, aroma, texture } = params;
    const productLineLabel = PRODUCTLINE_MAP[productLine];
    const productExamples = PRODUCT_IDEAS[productLine];

    return `Imagine you are part of the innovation team at a CPG company. 
    Your goal is to create new innovative products consumers will love. 
    The demographic you are targeting are Gen Z and Millenials.
  
    Incorporate the following fruits into a trending ${productLineLabel}
    
    Fruit: ${ingredient}
    
    The ${productLineLabel} should have the following attributes
    Taste: ${taste}
    Aroma: ${aroma}
    Texture: ${texture}
    
    Here are some examples of our current ${productLineLabel} for inspiration:
    
    ${productExamples}

    Please return a name and a brief description of this new product in less than a 500 characters without any images
    `;
  },
  generateImagePrompt: function (prompt) {
    return `Can you take the following idea and give me a product design with the same styling and also contains a cardboard sleeve packaging.
    Design a product packaging for the below mentioned product with the brand name Dole
    Ensure the design maintains a modern, fresh look while closely resembling existing product packaging of Dole.
   
    ${prompt}
    `;
  },
};
