// import { response } from 'express';
// import data from '../../../backend/data.js';

import axios from 'axios';
import Rating from '../components/Rating';
import { getProducts } from '../api';

// In the text below we have an object called 'HomeScreen' which has a method claled `render`. When we call that render, we import the products data from data.js. We access that using { products } (ES6). We then map through this array and create HTML for each.  

const HomeScreen = {
  render: async () => {

    // showLoading();

    // const { products } = data; // get acess to products property of data using this syntax. We used this when our data file was static. 

    // Now we have an API and do the below to get our data, then turn it into JSON.

    const products = await getProducts();
    if (products.error) {
      return `<div class="error">${products.error}</div>`;
    }

    return `
    <ul class="products">
      ${products
        .map(
          (product) => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/1">
            ${product.name}
          </a>
        </div>
        <div class="product-rating">
        ${Rating.render({
          value: product.rating,
          text: `${product.numReviews} reviews`,
        })}
      </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
          $${product.price}
        </div>
        </div>
      </li>
      `
        )
        .join('\n')}
    `;
  },
};

export default HomeScreen;
