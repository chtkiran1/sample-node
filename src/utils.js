// utils.js
// ========
const { PRODUCT_IDEAS } = require("./constants");

module.exports = {
  generateIdeaPrompt: function (params) {
    const { productLine, ingredient, taste, aroma, texture } = params;
    const productExamples = PRODUCT_IDEAS[productLine];

    return `Imagine you are part of the innovation team at a CPG company. 
    Your goal is to create new innovative products consumers will love. 
    The demographic you are targeting are Gen Z and Millenials.
  
    Incorporate the following fruits into a trending ${productLine}
    
    Fruit: ${ingredient}
    
    The ${productLine} should have the following attributes
    Taste: ${taste}
    Aroma: ${aroma}
    Texture: ${texture}
    
    Here are some examples of our current ${productLine} for inspiration:
    
    ${productExamples}
    `;
  },
  generateImagePrompt: function () {
    return "";
  },
};
